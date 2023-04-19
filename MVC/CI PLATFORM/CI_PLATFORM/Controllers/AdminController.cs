using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
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
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return View(viewmodel);
        }

        public IActionResult _CMSAddPage()
        {
            return PartialView("_CMSAddPage");
        }
        
        public IActionResult _MissionSkill()
        {
            return View();
        } 
        public IActionResult _MissionTheme()
        {
           
            return View();
        }
        public IActionResult _MissionApplication()
        {
           
            return View();
        }
        public IActionResult _StoryPartial()
        {
           
            return View();
        }

        public IActionResult ApproveMissionApplication(int MissionApplicationId)
        {
            var approveMisApp = _adminPrepository.forApproveMissionApplication(MissionApplicationId);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_MissionApplication", viewmodel);
        }
        public IActionResult DeclineMissionApplication(int MissionApplicationId)
        {
            var declineMisApp = _adminPrepository.forDeclineMissionApplication(MissionApplicationId);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_MissionApplication", viewmodel);
        }
        public IActionResult PublishStory(int StoryId)
        {
            var pubStory = _adminPrepository.forPublishStory(StoryId);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_StoryPartial", viewmodel);
        }
        public IActionResult DeclineStory(int StoryId)
        {
            var declineStory = _adminPrepository.forDeclineStory(StoryId);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_StoryPartial", viewmodel);
        }
        public IActionResult AddMissionTheme(string Title, int Status)
        {
            var addmissiontheme = _adminPrepository.forAddMissionTheme(Title, Status);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_MissionTheme", viewmodel);
        }
        public IActionResult editMissionTheme(int MissionThemeId, string Title, int Status)
        {
            var editmissiontheme = _adminPrepository.forEditMissionTheme(MissionThemeId, Title, Status);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_MissionTheme", viewmodel);
        }

       

        public IActionResult AddMissionSkill(string Title, int Status)
        {
            var addmissionskill = _adminPrepository.forAddMissionSkill(Title, Status);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_MissionSkill", viewmodel);
           
        }
        public IActionResult editMissionSkill(int SkillId, string Title, int Status)
        {
            var editmissionskill = _adminPrepository.forEditMissionSkill (SkillId, Title, Status);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_MissionSkill", viewmodel);
        }

    }
}
