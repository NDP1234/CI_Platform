﻿using Microsoft.AspNetCore.Mvc;

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
    }
}
