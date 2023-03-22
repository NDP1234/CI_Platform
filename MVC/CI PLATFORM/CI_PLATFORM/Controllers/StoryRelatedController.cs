using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using CI_Platform.Repository.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CI_PLATFORM.Controllers
{
    public class StoryRelatedController : Controller
    {
        private readonly IUserList _users;
        private readonly CiPlatformContext _db;
        private readonly IStoryListingRepository _db2;
        public StoryRelatedController( IUserList users, CiPlatformContext db, IStoryListingRepository db2 )
        {           
            _users = users;
            _db = db;
            _db2 = db2;
        }
        public IActionResult Story_Listing_Page()
        {
            var session_details = HttpContext.Session.GetString("Login");
            if (session_details == null)
            {
                return RedirectToAction("login", "Authentication");
            }
            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            ViewBag.UserDetails = profile;
            //List<StoryViewModel> stories = _db2.GetAllStory();
            StoryViewModel storymodel = new StoryViewModel();
            storymodel.Stories = _db2.GetAllStory();
            storymodel.User = _db.Users;
            storymodel.MissionThemes = _db.MissionThemes;
            return View(storymodel);
            
        }
    }
}
