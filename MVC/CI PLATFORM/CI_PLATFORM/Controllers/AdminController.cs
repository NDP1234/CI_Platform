using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CI_PLATFORM.Controllers
{
    public class AdminController : Controller
    {
        private readonly IUserList _users;
        private readonly CiPlatformContext _db;
        private readonly IAdminRepository _adminPrepository;
        public AdminController(IUserList users, CiPlatformContext db, IAdminRepository adminPrepository)
        {
            _users = users;
            _db = db;
            _adminPrepository = adminPrepository;

        }
        public IActionResult AdminDashBoard()
        {
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            return View(viewmodel);
        }

        public IActionResult _CMSAddPage()
        {
            return View();
        }

        public bool ApproveMissionApplication(int MissionApplicationId)
        {
           var approveMisApp = _adminPrepository.forApproveMissionApplication(MissionApplicationId);
            return approveMisApp;
        }
        public bool DeclineMissionApplication(int MissionApplicationId)
        {
           var declineMisApp = _adminPrepository.forDeclineMissionApplication(MissionApplicationId);
            return declineMisApp;
        } 
        public bool PublishStory(int StoryId)
        {
           var pubStory = _adminPrepository.forPublishStory(StoryId);
            return pubStory;
        } 
        public bool DeclineStory(int StoryId)
        {
           var declineStory = _adminPrepository.forDeclineStory(StoryId);
            return declineStory;
        }
    }
}
