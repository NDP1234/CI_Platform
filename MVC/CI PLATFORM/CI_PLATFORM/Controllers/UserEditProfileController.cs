using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CI_PLATFORM.Controllers
{
    public class UserEditProfileController : Controller
    {
        private readonly IUserList _users;
        private readonly CiPlatformContext _db;
        private readonly IUserEditProfileRepository _UEPrepository;
        public UserEditProfileController(IUserList users, CiPlatformContext db, IUserEditProfileRepository UEPrepository)
        { 
            _users = users;
            _db = db;
            _UEPrepository = UEPrepository;


        }
        public IActionResult UserEditProfilePage()
        {
            var session_details = HttpContext.Session.GetString("Login");
            if (session_details == null)
            {
                return RedirectToAction("login", "Authentication");
            }
            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            ViewBag.UserDetails = profile;
            var viewmodel = _UEPrepository.getCountryAndCityList();
            return View(viewmodel);
        }
        [HttpPost]
        public IActionResult UserEditProfilePage(UserEditProfileViewModel mymodel)
        {
            var session_details = HttpContext.Session.GetString("Login");
            if (session_details == null)
            {
                return RedirectToAction("login", "Authentication");
            }
            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            ViewBag.UserDetails = profile;
            int userId = (int)profile.UserId;
             _UEPrepository.saveUserDetails(userId,  mymodel);
            TempData["Message"] = "data is saved successfully.";
            return RedirectToAction("UserEditProfilePage");
        }
        [HttpPost]
        public IActionResult GetCitiesForCountry(long countryId)
        {
            var session_details = HttpContext.Session.GetString("Login");
            
            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            var cities = _db.Cities.Where(c => c.CountryId == countryId ).ToList();
            var cityList = cities.Select(c => new { cityId = c.CityId, name = c.Name });
            return Json(cityList);
        }


        public IActionResult getuserprofile( int userId)
        {
            var udetails = _UEPrepository.GetUserInfo(userId);
            return Json(udetails);

        }

        public IActionResult ChangePassword( UserEditProfileViewModel changeModel)
        {
            var session_details = HttpContext.Session.GetString("Login");
            if (session_details == null)
            {
                return RedirectToAction("login", "Authentication");
            }
            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            int userId = (int)profile.UserId;
            var cpwd = _UEPrepository.UpdatePwd(userId, changeModel);
            
            if (cpwd)
            {
                TempData["Message"] = "Password changed successfully.";
                return RedirectToAction("UserEditProfilePage");
            }
            else
            {
                TempData["Message"] = "Failed to change password because new and confirm pwd is not same or old pwd not match with current pwd";
                return RedirectToAction("UserEditProfilePage");
            }
        }
    }
}
