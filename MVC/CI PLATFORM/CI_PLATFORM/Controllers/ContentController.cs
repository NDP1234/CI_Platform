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
        //private readonly ICountryRepository _country;
        private readonly ICityRepository _city;
        private readonly IThemeRepository _theme;
        private readonly ISkillsRepository _skill;
        private readonly IMissionListingRepository _db2;
        private readonly IUserList _users;
        private readonly CiPlatformContext _db;
        //private readonly IMissionListingRepository _missiondetails;
        public ContentController(ICountryRepository countryRepository,  IThemeRepository theme, ISkillsRepository skill, IMissionListingRepository db2, IUserList users, CiPlatformContext db) {
            _countryRepository = countryRepository;
            //_city = city;
            _theme = theme;
            _skill = skill;
            _db2 = db2;
            _users = users;
            _db = db;
            //_missiondetails = missiondetails;
        }


        //public ContentController(CiPlatformContext db)
        //{
        //    _db = db;
        //}
        //sortby        

        //sortby
        //public IActionResult Platform_Landing_Page()        
        public async Task<IActionResult> Platform_Landing_Page()
        {
            var session_details = HttpContext.Session.GetString("Login");
            if(session_details == null)
            {
                return RedirectToAction("login", "Authentication");
            }

            //List<Country> country = _country.GetCountryDetails();
            //ViewBag.Country = country;
            //List<City> city = _city.GetCityDetails();
            //ViewBag.City = city;
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
            List<PlatformLandingViewModel> missions = _db2.GetAllMission();
            //ViewBag.Mission = missions;
            return View(missions);
        }

        ////public JsonResult[] DateSort(string sort)
        ////{
        ////    var missiondata = _db2.GetMissionSorting(sort);
        ////    var missionlist = new JsonResult[missiondata.ToList().Count];
        ////    int i = 0;

        ////    foreach (PlatformLandingViewModel y in missiondata)
        ////    {
        ////        if (y.Missions == null)
        ////        {
        ////            continue;
        ////        }
        ////        var mission = y.Missions;
        ////        var missionObj = new JsonResult(new
        ////        {
        ////            mission.MissionId,
        ////            mission.Title,
        ////            mission.City.Name,
        ////            mission.ShortDescription,
        ////            Theme = mission.Theme.Title,
        ////            mission.OrganizationName,
        ////            //mission.OrganizationDetail,
        ////            StartDate = mission.StartDate.Value.ToShortDateString(),
        ////            EndDate = mission.EndDate.Value.ToShortDateString(),
        ////            Deadline = (mission.StartDate - TimeSpan.FromDays(1)).Value.ToShortDateString(),
        ////            mission.SeatsVacancy,
        ////            mission.MissionType,
        ////            y.image.MediaPath


        ////        });
        ////        missionlist[i] = missionObj;
        ////        i++;

        ////    }
        ////    return missionlist;

        ////}
            // public JsonResult[] ThemeFilter(int themeid)
            //{
            //var missiondata = _db2.GetItemsBySearchString(themeid);
            //var missionlist = new JsonResult[missiondata.ToList().Count];
            //int i = 0;
            //foreach (PlatformLandingViewModel y in missiondata)
            //{
            //    if (y.Missions == null)
            //    {
            //        continue;
            //    }
            //    var mission = y.Missions;
            //    var missionObj = new JsonResult(new
            //    {
            //        mission.MissionId,
            //        mission.Title,
            //        mission.City.Name,
            //        mission.ShortDescription,
            //        Theme = mission.Theme.Title,
            //        mission.OrganizationName,
            //        //mission.OrganizationDetail,
            //        StartDate = mission.StartDate.Value.ToShortDateString(),
            //        EndDate = mission.EndDate.Value.ToShortDateString(),
            //        Deadline = (mission.StartDate - TimeSpan.FromDays(1)).Value.ToShortDateString(),
            //        mission.SeatsVacancy,
            //        mission.MissionType,
            //        y.image.MediaPath


            //    });
            //    missionlist[i] = missionObj;
            //    i++;

            //}
            //return missionlist;
            //}


        //14-03
        public JsonResult[] Filter(string[] country, string[] city , string[] theme, string[] skill, string sort)
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
        //public JsonResult DateSort(string sort_by)
        //{
        //    List<PlatformLandingViewModel> missions = _db2.GetMissionSorting(sort_by);
        //    return Json(new { missions, success = true });
        //}

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
