using CI_Platform.Entities.Models;
using CI_Platform.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CI_PLATFORM.Controllers
{
    public class ContentController : Controller
    {
        private readonly ICountryRepository _country;
        private readonly ICityRepository _city;
        private readonly IThemeRepository _theme;
        public ContentController(ICountryRepository country, ICityRepository city, IThemeRepository theme) {
            _country = country;
            _city = city;
            _theme = theme;
        }
        public IActionResult Platform_Landing_Page()
        {
            List<Country> country = _country.GetCountryDetails();
            ViewBag.Country = country;
            List<City> city = _city.GetCityDetails();
            ViewBag.City = city;
            List<MissionTheme> theme = _theme.GetThemeDetails();
            ViewBag.MissionTheme = theme;
            return View();

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
