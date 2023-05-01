using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
            var session_details = HttpContext.Session.GetString("Login");
            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            ViewBag.UserDetails = profile;
            var AuthorizedAdmin = _db.Users.FirstOrDefault(user => user.Email == session_details && user.DeletedAt == null && user.Role == "admin");
            if (session_details == null)
            {

                return RedirectToAction("Logout", "Authentication");
            }

            if (AuthorizedAdmin == null)
            {

                return RedirectToAction("logout", "Authentication");
            }

            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return View(viewmodel);
        }

        public IActionResult _CMSAddPage()
        {
            return PartialView("_CMSAddPage");
        }
        //public IActionResult _CMSAddPage2()
        //{
        //    return PartialView("_CMSAddPage");
        //}
        public IActionResult _BannerManagementPartial()
        {
            return PartialView("_BannerManagementPartial");
        }
        public IActionResult _CMSEditPage()
        {
            return PartialView("_CMSEditPage");
        }
        public IActionResult _CMSPage()
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
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return PartialView("_CMSPage", viewmodel);

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
        public IActionResult _MissionPartial()
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            if (addmissiontheme==false)
            {
                TempData["error1"] = "data is already exists.";
            }
            else
            {
                TempData["success1"] = "data is successfully added.";
            }
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();

            if (addmissionskill == false)
            {
                TempData["error2"] = "data is already exists.";
            }
            else
            {
                TempData["success2"] = "data is successfully added.";
            }

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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
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

        public IActionResult AddUser(string firstName, string LastName, string email, string pwd, string EmpId, int CountryId, int CityId, string ProfText, string Department, int Status, string PhoneNumber, string Avatar)
        {
            var addUserDetails = _adminPrepository.forAddUser(firstName, LastName, email, pwd, EmpId, CountryId, CityId, ProfText, Department, Status, PhoneNumber, Avatar);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return PartialView("_userPartial", viewmodel);
        }
        public IActionResult SaveEditedUser(int userId, string FirstName, string LastName, string Email, string Password, string EmployeeId, int CountryId, int CityId, string ProfileText, string Department, int Status, string PhoneNumber, string Avatar)
        {
            var editUserdetails = _adminPrepository.SaveEditedUserinfo(userId, FirstName, LastName, Email, Password, EmployeeId, CountryId, CityId, ProfileText, Department, Status, PhoneNumber, Avatar);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return PartialView("_userPartial", viewmodel);
        }
        public IActionResult deleteUser(int userId)
        {
            var deleteUserdetails = _adminPrepository.DeleteUserDetails(userId);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return PartialView("_userPartial", viewmodel);
        }
        public IActionResult SaveMission(string MissionTitle, string ShortDescription, string Description, int CountryId, int CityId, string OrganisationName, string Missiontype, DateTime MisStartDate, DateTime MisEndDate, string Organizationdetails, int TotalSeats, DateTime MisRegEndDate, int MissionTheme, string myAvailability, string VideoUrl, List<string> imgpathlist, List<string> docpathlist, List<string> selectedMissionSkill, string goaltext, int GoalValue)
        {
            var deleteUserdetails = _adminPrepository.forAddMissionDetails(MissionTitle, ShortDescription, Description, CountryId, CityId, OrganisationName, Missiontype, MisStartDate, MisEndDate, Organizationdetails, TotalSeats, MisRegEndDate, MissionTheme, myAvailability, VideoUrl, imgpathlist, docpathlist, selectedMissionSkill, goaltext, GoalValue);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return PartialView("_MissionPartial", viewmodel);
        }
        public IActionResult SaveEditedMission(int MissionId, string MissionTitle, string ShortDescription, string Description, int CountryId, int CityId, string OrganisationName, string Missiontype, DateTime MisStartDate, DateTime MisEndDate, string Organizationdetails, int TotalSeats, DateTime MisRegEndDate, int MissionTheme, string myAvailability, string VideoUrl, List<string> imgpathlist, List<string> docpathlist, List<string> selectedMissionSkill, string goaltext, int GoalValue)
        {
            var deleteUserdetails = _adminPrepository.forSaveEditedMissionDetails(MissionId, MissionTitle, ShortDescription, Description, CountryId, CityId, OrganisationName, Missiontype, MisStartDate, MisEndDate, Organizationdetails, TotalSeats, MisRegEndDate, MissionTheme, myAvailability, VideoUrl, imgpathlist, docpathlist, selectedMissionSkill, goaltext, GoalValue);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return PartialView("_MissionPartial", viewmodel);
        }

        public IActionResult getMissionData(int Missionid)
        {
            var missiondetails = _adminPrepository.getMissionData(Missionid);
            return Json(missiondetails);
        }

        public IActionResult AddBannerDetails(string Text, int Ordervalue, string image)
        {
            var addBanneretails = _adminPrepository.forAddBannerDetails(Text, Ordervalue, image);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return PartialView("_BannerManagementPartial", viewmodel);
        }
        public IActionResult EditBannerDetails(string Text, int Ordervalue, string image, int BannerId)
        {
            var editBannerdetails = _adminPrepository.forEditBannerDetails(Text, Ordervalue, image, BannerId);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return PartialView("_BannerManagementPartial", viewmodel);
        }

        public IActionResult DeleteBannerDetails(int BannerId)
        {
            var deleteBannerdetails = _adminPrepository.forDeleteBannerDetails(BannerId);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return PartialView("_BannerManagementPartial", viewmodel);
        }
        public IActionResult DeleteMissionDetails(int MissionId)
        {
            var deletemission = _adminPrepository.forDeleteMission(MissionId);
            var viewmodel = new AdminViewModel();
            viewmodel.users = _adminPrepository.getUserList();
            viewmodel.Missions = _adminPrepository.getMissionList();
            viewmodel.MissionApplications = _adminPrepository.getMissionApplicationList();
            viewmodel.Stories = _adminPrepository.getStoryDetailList();
            viewmodel.missionSkills = _adminPrepository.getMissionSkillList();
            viewmodel.MissionThemes = _adminPrepository.getMissionThemeList();
            viewmodel.cmsPages = _adminPrepository.getCMSPageList();
            viewmodel.countries = _adminPrepository.getCountryList();
            viewmodel.cities = _adminPrepository.getCityList();
            viewmodel.BannerList = _adminPrepository.getBannerList();
            return PartialView("_MissionPartial", viewmodel);
        }
        [HttpPost]
        public IActionResult SaveImage(IFormFile file)
        {
            string fileName = file.FileName;
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/profileImg", fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return Content("/profileImg/" + fileName);
        }
        [HttpPost]
        public IActionResult SaveBannerImage(IFormFile file)
        {
            string fileName = file.FileName;
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/BannerImage", fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return Content("/BannerImage/" + fileName);
        }

        public IActionResult citiesBasedOnCountryForUser(int CountryId)
        {
            var cities = _db.Cities.Where(c => c.CountryId == CountryId).Select(c => new { cityId = c.CityId, name = c.Name }).ToList();
            return Json(cities);
        }
    }
}
