using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using CI_Platform.Repository.Repository;
using CI_PLATFORM.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CI_PLATFORM.Controllers
{
    public class ContentController : Controller
    {

        private readonly ICountryRepository _countryRepository;
        private readonly ICityRepository _city;
        private readonly IThemeRepository _theme;
        private readonly ISkillsRepository _skill;
        private readonly IMissionListingRepository _db2;
        private readonly IUserList _users;
        private readonly CiPlatformContext _db;
        private readonly IMissionDetail _im;
        public ContentController(ICountryRepository countryRepository, IThemeRepository theme, ISkillsRepository skill, IMissionListingRepository db2, IUserList users, CiPlatformContext db, IMissionDetail im)
        {
            _countryRepository = countryRepository;;
            _theme = theme;
            _skill = skill;
            _db2 = db2;
            _users = users;
            _db = db;
            _im = im;
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

            List<PlatformLandingViewModel> missions = _db2.GetAllMission();

            return View(missions);
        }

        //14-03
        public JsonResult[] Filter(string[] country, string[] city, string[] theme, string[] skill, string sort)
        {
            var filter = _db2.GetFilterData(country, city, theme, skill, sort);
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
                    y.image.MediaPath


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
            

            VolunteeringMissionPageViewModel missiondetails = _im.GetMissionDetaiil( id);
            return View(missiondetails);
        }


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
    
    public IActionResult Story_Listing_Page()
        {
            return View();
        }
    }
}
