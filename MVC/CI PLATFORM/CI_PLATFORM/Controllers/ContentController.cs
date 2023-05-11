using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using CI_PLATFORM.Models;
using CI_Platform.Repository.Repository;
using CI_PLATFORM.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using Newtonsoft.Json.Linq;
using System.Text;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace CI_PLATFORM.Controllers
{

    public class ContentController : Controller
    {
        private IConfiguration _configuration;
        private readonly ICountryRepository _countryRepository;
        private readonly ICityRepository _city;
        private readonly IThemeRepository _theme;
        private readonly ISkillsRepository _skill;
        private readonly IMissionListingRepository _db2;
        private readonly IUserList _users;
        private readonly CiPlatformContext _db;
        private readonly IMissionDetail _im;
        private readonly SMTPConfigModel _smtpconfig;
        public ContentController(ICountryRepository countryRepository, IThemeRepository theme, ISkillsRepository skill, IMissionListingRepository db2, IUserList users, CiPlatformContext db, IMissionDetail im, IConfiguration configuration, IOptions<SMTPConfigModel> smtpconfig)
        {
            _countryRepository = countryRepository; ;
            _theme = theme;
            _skill = skill;
            _db2 = db2;
            _users = users;
            _db = db;
            _im = im;
            _configuration = configuration;
            _smtpconfig = smtpconfig.Value;

        }

        public async Task<IActionResult> Platform_Landing_Page()
        {
            var session_details = HttpContext.Session.GetString("Login");
            if (session_details == null)
            {
                return RedirectToAction("login", "Authentication");
            }

            List<MissionTheme> theme = _theme.GetThemeDetails();
            ViewBag.MissionTheme = theme;
            List<Skill> skill = _skill.GetSkillDetails();
            ViewBag.Skill = skill;




            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            ViewBag.UserDetails = profile;
            int userId = (int)profile.UserId;

            //11-05
            DateTime currentDateTime = DateTime.Now;
            var notifications = _db.NotificationDetails.Where(n => n.UpdatedAt >= currentDateTime.AddMinutes(-1440) && n.Status == "SEEN" && n.UserId == userId).OrderByDescending(n => n.UpdatedAt).Take(1).FirstOrDefault();
            ViewBag.OldNotification = notifications;
            //11-05


            List<PlatformLandingViewModel> missions = _db2.GetAllMission(userId);

            return View(missions);
        }

        //14-03
        public JsonResult[] Filter(int userId, string[] country, string[] city, string[] theme, string[] skill, string sort)
        {
            var session_details = HttpContext.Session.GetString("Login");


            var filter = _db2.GetFilterData(userId, country, city, theme, skill, sort);
            var filterlist = new JsonResult[filter.ToList().Count];

            int i = 0;

            foreach (PlatformLandingViewModel y in filter)
            {
                if (y.Missions == null)
                {
                    continue;
                }
                var mission = y.Missions;
                var missionObj = new JsonResult(new
                {
                    mission.MissionId,
                    mission.Title,
                    mission.City.Name,
                    mission.ShortDescription,
                    Theme = mission.Theme.Title,
                    mission.OrganizationName,
                    //mission.OrganizationDetail,
                    StartDate = mission.StartDate.Value.ToShortDateString(),
                    EndDate = mission.EndDate.Value.ToShortDateString(),
                    Deadline = (mission.StartDate - TimeSpan.FromDays(1)).Value.ToShortDateString(),
                    mission.SeatsVacancy,
                    mission.MissionType,
                    y.image.MediaPath,
                    y.AvgRating

                });
                filterlist[i] = missionObj;
                i++;

            }
            return filterlist;
        }
        //14-03

        [HttpGet]
        public JsonResult GetAllCountries()
        {
            var countries = _countryRepository.GetAllCountries();
            return Json(countries);
        }

        [HttpGet]
        public JsonResult GetCitiesByCountryId(int countryId)
        {
            var cities = _countryRepository.GetCitiesByCountryId(countryId);
            return Json(cities);
        }
        public IActionResult No_mission_found()
        {
            return View();
        }
        public IActionResult Volunteering_Mission_Page(int id)
        {
            var session_details = HttpContext.Session.GetString("Login");
            if (session_details == null)
            {
                return RedirectToAction("login", "Authentication");
            }
            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            int userId = (int)profile.UserId;
            ViewBag.UserDetails = profile;


            VolunteeringMissionPageViewModel missiondetails = _im.GetMissionDetaiil(id, userId);
            return View(missiondetails);
        }

        //for add to favourites
        [HttpGet]
        [Route("Content/AddToFavorites", Name = "favorites")]
        public IActionResult AddToFavorites(int missionId, int userId)
        {
            var existingFavorite = _db.FavouriteMissions.FirstOrDefault(m => m.MissionId == missionId && m.UserId == userId);

            if (existingFavorite == null)
            {
                if (ModelState.IsValid)
                {
                    FavouriteMission favourite = new FavouriteMission()
                    {
                        MissionId = missionId,
                        UserId = userId,
                        CreatedAt = DateTime.UtcNow,
                    };

                    _db.FavouriteMissions.Add(favourite);
                    _db.SaveChanges();
                    return Ok(new { success = true, message = "Favorite added successfully" });
                }

                else
                {
                    return View();
                }
            }
            else
            {
                _db.FavouriteMissions.Remove(existingFavorite);
                _db.SaveChanges();
                return Ok(new { success = true, message = "Favorite removed successfully" });
            }

        }
        [HttpGet]
        [Route("Content/AddToFavorites2", Name = "favorites2")]
        public IActionResult AddToFavorites2(int missionId, int userId)
        {
            var existingFavorite = _db.FavouriteMissions.FirstOrDefault(m => m.MissionId == missionId && m.UserId == userId);

            if (existingFavorite == null)
            {
                if (ModelState.IsValid)
                {
                    FavouriteMission favourite = new FavouriteMission()
                    {
                        MissionId = missionId,
                        UserId = userId,
                        CreatedAt = DateTime.UtcNow,
                    };

                    _db.FavouriteMissions.Add(favourite);
                    _db.SaveChanges();
                    return Ok(new { success = true, message = "Favorite added successfully" });
                }

                else
                {
                    return View();
                }
            }
            else
            {
                _db.FavouriteMissions.Remove(existingFavorite);
                _db.SaveChanges();
                return Ok(new { success = true, message = "Favorite removed successfully" });
            }

        }

        // Get the list of user IDs for the selected coworker
        public void RecommandToCoWorker(string Recommanded)
        {
            var parseObject = JObject.Parse(Recommanded);
            var uMissionId = parseObject.Value<long>("MId");
            var uId = parseObject.Value<long>("Uid");
            var SessionUId = parseObject.Value<long>("FromUid");
            var EmailAdd = parseObject.Value<string>("Uemail");
            var recObj = new MissionInvite()
            {
                MissionId = uMissionId,
                FromUserId = SessionUId,
                ToUserId = uId,
            };
            if (EmailAdd != null)
            {
                var MissionDetailLink = Url.Action("Volunteering_Mission_Page", "Content", new { id = uMissionId }, Request.Scheme);

                UserEmailOptions userEmailOptions = new UserEmailOptions()
                {
                    Subject = "Recommandation For Mission",
                    Body = "Community Investment platform welcomes you! </br> this mission is recommanded From </br>" + SessionUId + "</br>" + MissionDetailLink
                };
                _db.MissionInvites.Add(recObj);
                _db.SaveChanges();
                EmailSend(EmailAdd, userEmailOptions);

                var fromuserdata = _db.Users.Where(u => u.UserId == SessionUId).First();

                var isAnyDataForUser = _db.UserNotificationInfos.Any(uni => uni.UserId == uId && uni.NotificationSettingId == 1);

                //var getname = _db.Users.FirstOrDefault(u => u.UserId == SessionUId);
                //var RecomFrom = getname.FirstName + " " + getname.LastName;
                //ViewBag.RecomFromName = RecomFrom;
                if (isAnyDataForUser)
                {
                    NotificationDetail mynotificationlist = new NotificationDetail();
                    mynotificationlist.UserId = uId;
                    mynotificationlist.MissionId = uMissionId;
                    var missionTitle = _db.Missions.FirstOrDefault(m => m.MissionId == uMissionId).Title;
                    var user = _db.Users.FirstOrDefault(u => u.UserId == SessionUId);
                    string userName;
                    if (user != null)
                    {
                        userName = user.FirstName + " " + user.LastName;
                        // use the userName variable here
                    }
                    else
                    {
                        userName = "someone";
                        // handle the case when the user is not found
                    }
                    //var userName = _db.Users.FirstOrDefault(u=>u.UserId==SessionUId).FirstName +" "+ _db.Users.FirstOrDefault(u => u.UserId == SessionUId).LastName;
                    mynotificationlist.NotificationMessage = userName + " " + "Recommends this mission" + " " + missionTitle;
                    mynotificationlist.Status = "NOT SEEN";
                    mynotificationlist.ImagePath = fromuserdata.Avatar;
                    mynotificationlist.NotificationSettingId = 1;

                    _db.NotificationDetails.Add(mynotificationlist);
                    _db.SaveChanges();
                }


            }

        }

        //to send the email:
        public void EmailSend(string EmailAdd, UserEmailOptions userEmailOptions)
        {
            var email = new MimeMessage();

            //email.From.Add(new MailboxAddress(_smtpconfig.SenderDisplayName, _smtpconfig.SenderAddress));
            email.From.Add(new MailboxAddress("no-reply@bookstoreapp.com", "CI_PLATFORM"));
            email.To.Add(new MailboxAddress("", EmailAdd));

            email.Subject = userEmailOptions.Subject;
            var bBuilder = new BodyBuilder();

            bBuilder.HtmlBody = userEmailOptions.Body;
            email.Body = bBuilder.ToMessageBody();

            using (var smtp = new SmtpClient())
            {
                smtp.Connect("smtp.gmail.com", 465, true);

                //smtp.Authenticate(_smtpconfig.UserName, _smtpconfig.Password);
                smtp.Authenticate("niravdpatel632@gmail.com", "hflzawnzmsaqrkrj");

                smtp.Send(email);

                smtp.Disconnect(true);
            }
        }

        //for getting already exist rating
        [HttpGet]
        public JsonResult GetMissionRating(int missionId, int userId)
        {
            var rating = _db.MissionRatings
                .FirstOrDefault(r => r.MissionId == missionId && r.UserId == userId);
            return Json(rating);
        }

        //for storing updated rating
        [HttpPost]
        public IActionResult SaveMissionRating(int missionId, int userId, int rating)
        {
            var existingRating = _db.MissionRatings
                .FirstOrDefault(r => r.MissionId == missionId && r.UserId == userId);

            if (existingRating != null)
            {
                existingRating.Rating = rating;
            }
            else
            {
                var newRating = new MissionRating
                {
                    MissionId = missionId,
                    UserId = userId,
                    Rating = rating
                };

                _db.MissionRatings.Add(newRating);
            }

            // Save the changes to the database
            _db.SaveChanges();

            // Return an empty result to indicate success
            return new EmptyResult();
        }


        //for storing details in database schema
        [HttpPost]
        public IActionResult Create(int userId, int missionId, string text)
        {
            var comment = new Comment
            {
                UserId = userId,
                MissionId = missionId,
                CommentText = text
                //CreatedAt = DateTime.Now
            };

            _db.Comments.Add(comment);
            _db.SaveChanges();

            return Json(comment);
        }


        //for displaying comments 
        [HttpGet]
        public JsonResult[] DisplayComments(int missionId)
        {
            var comments = _db.Comments
                .Where(c => c.MissionId == missionId)
                .OrderByDescending(c => c.CreatedAt)
                //.Take(5)
                .Join(_db.Users, c => c.UserId, u => u.UserId, (c, u) => new { Comment = c, User = u })
                .ToList();

            var commentlist = new JsonResult[comments.Count];
            int i = 0;

            foreach (var comment in comments)
            {
                var commentObj = new JsonResult(new
                {
                    comment.Comment.MissionId,
                    comment.Comment.CommentText,
                    comment.Comment.CreatedAt,
                    comment.Comment.UserId,
                    comment.Comment.ApprovalStatus,
                    comment.User.FirstName,
                    comment.User.LastName,
                    comment.User.Avatar
                });
                commentlist[i] = commentObj;
                i++;
            }

            return commentlist;
        }


        //for displaying average rating for specific mission
        [HttpGet]
        public JsonResult GetAverageMissionRating(int missionId)
        {

            var avgRating = _db.MissionRatings
            .Where(r => r.MissionId == missionId)
            .GroupBy(r => r.MissionId)
            .Select(g => new
            {
                AvgRating = g.Average(r => r.Rating)
            })
            .FirstOrDefault();

            if (avgRating != null)
            {
                return Json(avgRating.AvgRating);
            }
            else
            {
                return Json(null);
            }
        }

        //for getting status from database
        [HttpGet]
        public IActionResult GetApplicationStatus(int missionId, int userId)
        {

            var application = _db.MissionApplications.FirstOrDefault(m => m.UserId == userId && m.MissionId == missionId);
            //return Json(new { applied = application != null });
            return Json(application);
        }

        //storing  and checking details in database for applying in specific mission
        [HttpPost]
        public IActionResult Apply(int missionId, int userId)
        {
            // Check if the user has already applied for the mission
            var application = _db.MissionApplications.SingleOrDefault(m => m.UserId == userId && m.MissionId == missionId);
            if (application != null)
            {
                return Json(new { success = false });
            }

            // Create a new application record
            var newApplication = new MissionApplication
            {
                UserId = userId,
                MissionId = missionId,
                AppliedAt = DateTime.Now,
                ApprovalStatus = "PENDING"

            };
            _db.MissionApplications.Add(newApplication);
            _db.SaveChanges();

            return Json(new { success = true });
        }


        public JsonResult[] ExploredData(string ExploreBasedOnVal)
        {
            var session_details = HttpContext.Session.GetString("Login");

            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            ViewBag.UserDetails = profile;
            int userId = (int)profile.UserId;

            List<PlatformLandingViewModel> missions = _db2.ExploreData(ExploreBasedOnVal, userId);
            var Explorelist = new JsonResult[missions.ToList().Count];
            //return Json(missions);
            int i = 0;
            foreach (PlatformLandingViewModel y in missions)
            {
                if (y.Missions == null)
                {
                    continue;
                }
                var mission = y.Missions;
                var missionObj = new JsonResult(new
                {
                    mission.MissionId,
                    mission.Title,
                    mission.City.Name,
                    mission.ShortDescription,
                    Theme = mission.Theme.Title,
                    mission.OrganizationName,
                    //mission.OrganizationDetail,
                    StartDate = mission.StartDate.Value.ToShortDateString(),
                    EndDate = mission.EndDate.Value.ToShortDateString(),
                    Deadline = (mission.StartDate - TimeSpan.FromDays(1)).Value.ToShortDateString(),
                    mission.SeatsVacancy,
                    mission.MissionType,
                    y.image.MediaPath,
                    y.AvgRating


                });
                Explorelist[i] = missionObj;
                i++;

            }
            return Explorelist;
        }

        public bool SaveNotificationSettingForUser(List<int> selectedIds)
        {
            var session_details = HttpContext.Session.GetString("Login");

            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            ViewBag.UserDetails = profile;
            int userId = (int)profile.UserId;

            bool result = _db2.SaveNotificationSetting(userId, selectedIds);
            return result;
        }

        public JsonResult GetNotificationSettingForUser(int UserId)
        {
            var getUserSettingDetails = _db.UserNotificationInfos.Where(uni => uni.UserId == UserId).ToList();
            return Json(getUserSettingDetails);
        }
        public JsonResult GetNotificationCount(int UserId)
        {
            var getNotificationCount = _db.NotificationDetails.Where(nd => nd.Status == "NOT SEEN" && nd.UserId == UserId).Count();

            return Json(getNotificationCount);
        }
        public bool ClearNotification(int UserId)
        {
            var clearnotification = _db2.ClearAllNotification(UserId);

            return clearnotification;
        }

        public IActionResult UpdateNotificationStatus(int notificationId)
        {
            var notification = _db.NotificationDetails.FirstOrDefault(nd => nd.NottificationDeatilId == notificationId);
            if (notification != null)
            {
                notification.Status = "SEEN";
                notification.UpdatedAt = DateTime.UtcNow;
                _db.NotificationDetails.Update(notification);
                _db.SaveChanges();
                return Json(new { success = true });
            }
            else
            {
                return Json(new { success = false, error = "Notification not found" });
            }
        }
    }
}
