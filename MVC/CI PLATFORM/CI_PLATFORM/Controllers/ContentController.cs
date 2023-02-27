using Microsoft.AspNetCore.Mvc;

namespace CI_PLATFORM.Controllers
{
    public class ContentController : Controller
    {

        public IActionResult Platform_Landing_Page()
        {
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
