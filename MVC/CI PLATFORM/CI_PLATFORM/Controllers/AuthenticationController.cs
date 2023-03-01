using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
//using CI_PLATFORM.Data;
using CI_PLATFORM.Models;
using CI_PLATFORM.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace CI_PLATFORM.Controllers
{
    //[Route("Authentication")]
    public class AuthenticationController : Controller
    {

        private readonly CiPlatformContext _db;
            
        public AuthenticationController(CiPlatformContext db)
        {
            _db = db;
        }
        [Route("Authentication/login", Name = "UserLogin2")]    
        public IActionResult login()
        {
            return View();
        }

        [HttpPost]
        [Route("Authentication/login", Name = "UserLogin1")]
        public IActionResult login(loginViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Check if a user with the provided email and password exists in the database
                var userExists = _db.Users.Any(u => u.Email == model.Email && u.Password == model.Password);
                if (userExists)
                {
                   // User exists
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    // User does not exist, adding a model error
                    ModelState.AddModelError("", "Invalid email or password");
                }
            }

            // ModelState is invalid, or user does not exist, return to the login view with errors
            return View(model);
        }

        [Route("Authentication/Forgot_Password")]
        public IActionResult Forgot_Password()
        {
            return View();
        }
        //------
        [HttpPost]
        [Route("Authentication/Forgot_Password")]
        public IActionResult Forgot_Password(ForgotViewModel model)
        {
            if (ModelState.IsValid)
            {
                var userExists = _db.Users.Any(u => u.Email == model.Email);

                if (userExists)
                {

                    Random random = new Random();

                    int capitalCharCode = random.Next(65, 91);
                    char randomCapitalChar = (char)capitalCharCode;


                    int randomint = random.Next();


                    int SmallcharCode = random.Next(97, 123);
                    char randomChar = (char)SmallcharCode;

                    String token = "";
                    token += randomCapitalChar.ToString();
                    token += randomint.ToString();
                    token += randomChar.ToString();


                    var PasswordResetLink = Url.Action("Reset_Password", "User", new { Email = model.Email, Token = token }, Request.Scheme);

                    var ResetPasswordInfo = new CI_Platform.Entities.Models.PasswordReset()
                    {
                        Email = model.Email,
                        Token = token
                    };
                    _db.PasswordResets.Add(ResetPasswordInfo);
                    _db.SaveChanges();


                    var fromEmail = new MailAddress("niravdpatel632@gmail.com");
                    var toEmail = new MailAddress(model.Email);
                    var fromEmailPassword = "hflzawnzmsaqrkrj";
                    string subject = "Reset Password";
                    string body = PasswordResetLink;

                    var smtp = new SmtpClient
                    {

                        Host = "smtp.gmail.com",
                        Port = 587,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
                    };

                    MailMessage message = new MailMessage(fromEmail, toEmail);
                    message.Subject = subject;
                    message.Body = body;
                    message.IsBodyHtml = true;
                    smtp.Send(message);

                    ViewBag.EmailSent = "Mail Is Sent Successfully, Check Your Inbox!";
                }
                else
                {

                    ModelState.AddModelError("", "User not exist.. please enter correct email address");
                }
            }
            return View(model);
        }
        //----

        public IActionResult Reset_Password(string email, string token)
        {
            return View(new ResetPwdModel
            {
                email = email,
                Token = token
            });
        }



        [HttpPost]

        public IActionResult resetpassword(ResetPwdModel model)
        {
            CiPlatformContext context = new CiPlatformContext();

            var ResetPasswordData = context.PasswordResets.Any(e => e.Email == model.email && e.Token == model.Token);


            if (ResetPasswordData)
            {
                var x = context.Users.FirstOrDefault(e => e.Email == model.email);


                x.Password = model.NewPassword;

                Console.WriteLine(x.Password);

                context.Users.Update(x);
                context.SaveChanges();
            }
            else
            {
                ModelState.AddModelError("Token", "Reset Passwordword Link is Invalid");
            }
            return View(model);
        }





        public IActionResult Registration()
        {
            return View();
        }
        [HttpPost]
        [Route("Authentication/Registration", Name = "UserRegistration1")]
        public IActionResult Registration(RegistrationViewModel model)
        {

            


            if (ModelState.IsValid)
            {
                
                var user = new CI_Platform.Entities.Models.User
                {
                   
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    Password = model.Password
                };

                _db.Users.Add(user);
                _db.SaveChanges();
                TempData["SuccessMessage"] = "Registration successful. Please login to continue.";
                return RedirectToAction("login");
            }

            return View(model);
        }
    }
}
