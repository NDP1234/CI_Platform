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
        private readonly IMissionApplicationListingRepository _listingRepository;
        public StoryRelatedController( IUserList users, CiPlatformContext db, IStoryListingRepository db2, IMissionApplicationListingRepository listingRepository)
        {           
            _users = users;
            _db = db;
            _db2 = db2;
            _listingRepository = listingRepository;
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
            //storymodel.MissionThemes = _db.MissionThemes;
            return View(storymodel);
            
        }
        public IActionResult Share_Your_Story_Page()
        {
            var session_details = HttpContext.Session.GetString("Login");
            if (session_details == null)
            {
                return RedirectToAction("login", "Authentication");
            }
            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            ViewBag.UserDetails = profile;
            int userId = (int)profile.UserId;
            List<Mission> missionTitles = _listingRepository.GetMissionTitlesByUserId(userId);
            return View(missionTitles);
           
        }

      [HttpPost]
        public IActionResult DraftStory(int userid, int missionid, string title, DateTime publishedAt, string description, string status)
        {
            var draft = _listingRepository.DraftStory(userid, missionid, title, publishedAt, description, status);
            return Ok(new { message = "Draft stored successfully." });
        }

        [HttpPost]
        public IActionResult SubmitStory(int userid, int missionid, string title, DateTime publishedAt, string description, string status)
        {
            var submit = _listingRepository.SubmitStory(userid, missionid, title, publishedAt, description, status);
            return Ok();
        }
    }
}
