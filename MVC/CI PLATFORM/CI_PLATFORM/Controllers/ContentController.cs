using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using CI_PLATFORM.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CI_PLATFORM.Controllers
{
    public class ContentController : Controller
    {
       

        private readonly ICountryRepository _country;
        private readonly ICityRepository _city;
        private readonly IThemeRepository _theme;
        private readonly ISkillsRepository _skill;
        private readonly IMissionListingRepository _db;
        private readonly IUserList _users;

        //private readonly IMissionListingRepository _missiondetails;
        public ContentController(ICountryRepository country, ICityRepository city, IThemeRepository theme, ISkillsRepository skill, IMissionListingRepository db, IUserList users) {
            _country = country;
            _city = city;
            _theme = theme;
            _skill = skill;
            _db = db;
            _users = users;
            //_missiondetails = missiondetails;
        }
        public IActionResult Platform_Landing_Page()
        {
            var session_details = HttpContext.Session.GetString("Login");
            if(session_details == null)
            {
                return RedirectToAction("login", "Authentication");
            }

            List<Country> country = _country.GetCountryDetails();
            ViewBag.Country = country;
            List<City> city = _city.GetCityDetails();
            ViewBag.City = city;
            List<MissionTheme> theme = _theme.GetThemeDetails();
            ViewBag.MissionTheme = theme;
            List<Skill> skill = _skill.GetSkillDetails();
            ViewBag.Skill = skill;
            //List<Mission> missiondetails = _missiondetails.GetMission();
            //ViewBag.Mission = missiondetails;

            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            ViewBag.UserDetails = profile;
            //return View(missions);
            //return View();
            List<PlatformLandingViewModel> missions = _db.GetAllMission();
            //ViewBag.Mission = missions;
            return View(missions);

            

        }



        public IActionResult No_mission_found()
        {
            return View();
        }
        public IActionResult Volunteering_Mission_Page()
        {
            return View();
        }
        public IActionResult Story_Listing_Page()
        {
            return View();
        }
    }
}
