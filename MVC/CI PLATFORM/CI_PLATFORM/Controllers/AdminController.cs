using Microsoft.AspNetCore.Mvc;

namespace CI_PLATFORM.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult AdminDashBoard()
        {
            return View();
        }
    }
}
