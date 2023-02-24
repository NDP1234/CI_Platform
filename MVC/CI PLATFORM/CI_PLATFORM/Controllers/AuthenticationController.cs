using Microsoft.AspNetCore.Mvc;

namespace CI_PLATFORM.Controllers
{
    public class AuthenticationController : Controller
    {
        public IActionResult login()
        {
            return View();
        }
        public IActionResult Forgot_Password()
        {
            return View();
        }
        public IActionResult Reset_Password()
        {
            return View();
        }
        public IActionResult Registration()
        {
            return View();
        }
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
