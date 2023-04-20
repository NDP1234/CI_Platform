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
            viewmodel.countries = _adminPrepository.getCountryList();
            return View(viewmodel);
        }

        public IActionResult _CMSAddPage()
        {
            return PartialView("_CMSAddPage");
        }

        public IActionResult _CMSEditPage()
        {
            return PartialView("_CMSEditPage");
        }
        public IActionResult _CMSPage()
        {
            return PartialView("_CMSPage");
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
        public IActionResult _userPartial()
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
            var editmissionskill = _adminPrepository.forEditMissionSkill(SkillId, Title, Status);
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

        public IActionResult deleteMissionSkill(int skillid)
        {
            var deletemissionskill = _adminPrepository.forDeleteMissionSkill(skillid);
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
        public IActionResult deleteMissionTheme(int themeId)
        {
            var deletemissiontheme = _adminPrepository.forDeleteMissionTheme(themeId);
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
        public IActionResult deleteStory(int StoryId)
        {
            var deletemissiontheme = _adminPrepository.forDeleteStory(StoryId);
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

        public IActionResult AddCmsDetails(string Title, string Description, string Slug, int Status)
        {
            var addCMSdetails = _adminPrepository.forAddCMSDetails(Title, Description, Slug, Status);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_CMSPage", viewmodel);
        }
        public IActionResult EditCmsDetails(int CMSPageId, string Title, string Description, string Slug, int Status)
        {
            var editCMSdetails = _adminPrepository.forEditCMSDetails(CMSPageId, Title, Description, Slug, Status);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_CMSPage", viewmodel);
        }
        public IActionResult DeleteCmsDetails(int CMSPageId)
        {
            var editCMSdetails = _adminPrepository.forDeleteCMSDetails(CMSPageId);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            return PartialView("_CMSPage", viewmodel);
        }

        public IActionResult GetCitiesForCountry(long countryId)
        {
            var session_details = HttpContext.Session.GetString("Login");

            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            var cities = _db.Cities.Where(c => c.CountryId == countryId).ToList();
            var cityList = cities.Select(c => new { cityId = c.CityId, name = c.Name });
            return Json(cityList);
        }

        public IActionResult CheckEmailExistence(string email)
        {
            bool emailExists = _db.Users.Any(u => u.Email == email);
            return Json(!emailExists);
        }

        public IActionResult AddUser(string firstName, string LastName, string email, string pwd, string EmpId, int CountryId, int CityId, string ProfText, string Department, int Status)
        {
            var editCMSdetails = _adminPrepository.forAddUser(firstName, LastName, email, pwd, EmpId, CountryId, CityId, ProfText, Department, Status);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            return PartialView("_userPartial", viewmodel);
        }
    }
}
