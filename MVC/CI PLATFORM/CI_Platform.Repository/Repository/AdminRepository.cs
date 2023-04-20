using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Repository.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly CiPlatformContext _db;
        public AdminRepository(CiPlatformContext db)
        {
            _db = db;
        }
        public List<User> getUserList()
        {
            var ListOfUsers = _db.Users.ToList();
            return ListOfUsers;
        }

        public List<Mission> getMissionList()
        {
            var ListOfMission = _db.Missions.ToList();
            return ListOfMission;
        }

        public List<MissionApplication> getMissionApplicationList()
        {
            var ListOfMissionApplication = _db.MissionApplications.ToList();
            return ListOfMissionApplication;
        }

        public List<Story> getStoryDetailList()
        {
            var ListOfStories = _db.Stories.ToList();
            return ListOfStories;
        }

        public List<Skill> getMissionSkillList()
        {
            var ListOfMissionSkills = _db.Skills.ToList();
            return ListOfMissionSkills;
        }


        public List<MissionTheme> getMissionThemeList()
        {
            var ListOfMissionTheme = _db.MissionThemes.ToList();
            return ListOfMissionTheme;
        }
        public List<CmsPage> getCMSPageList()
        {
            var ListOfCMSPages = _db.CmsPages.ToList();
            return ListOfCMSPages;
        }

        public bool forApproveMissionApplication(int MissionAppId)
        {
            var MissionApplicationExist = _db.MissionApplications.Where(m => m.MissionApplicationId == MissionAppId).FirstOrDefault();

            MissionApplicationExist.ApprovalStatus = "APPROVE";
            _db.MissionApplications.Update(MissionApplicationExist);
            _db.SaveChanges();

            return true;
        }
        public bool forDeclineMissionApplication(int MissionAppId)
        {
            var MissionApplicationExist = _db.MissionApplications.Where(m => m.MissionApplicationId == MissionAppId).FirstOrDefault();

            MissionApplicationExist.ApprovalStatus = "DECLINE";
            _db.MissionApplications.Update(MissionApplicationExist);
            _db.SaveChanges();

            return true;
        }

        public bool forPublishStory(int StoryId)
        {
            var storyExist = _db.Stories.Where(s => s.StoryId == StoryId).FirstOrDefault();
            storyExist.Status = "PUBLISHED";
            storyExist.PublishedAt = DateTime.Now;
            _db.Stories.Update(storyExist);
            _db.SaveChanges();

            return true;
        }
        public bool forDeclineStory(int StoryId)
        {
            var storyExist = _db.Stories.Where(s => s.StoryId == StoryId).FirstOrDefault();
            storyExist.Status = "DECLINED";
            _db.Stories.Update(storyExist);
            _db.SaveChanges();

            return true;
        }

        public bool forAddMissionTheme(string Title, int Status)
        {
            var MissionThemeData = new MissionTheme();
            MissionThemeData.Title = Title;
            MissionThemeData.Status = (byte)Status;
            _db.MissionThemes.Add(MissionThemeData);
            _db.SaveChanges();

            MissionThemeData.Status = (byte)Status;
            _db.MissionThemes.Update(MissionThemeData);
            _db.SaveChanges();
            return true;
        }
        public bool forEditMissionTheme(int MissionThemeId, string Title, int Status)
        {

            var isExistMissionTheme = _db.MissionThemes.Where(m => m.MissionThemeId == MissionThemeId).FirstOrDefault();
            isExistMissionTheme.Title = Title;
            isExistMissionTheme.Status = (byte)Status;
            isExistMissionTheme.UpdatedAt = DateTime.UtcNow;
            _db.MissionThemes.Update(isExistMissionTheme);
            _db.SaveChanges();
            return true;
        }

        public bool forAddMissionSkill(string Title, int Status)
        {

            Skill MissionSkillData = new Skill();

            MissionSkillData.SkillName = Title;
            MissionSkillData.Status = (byte)Status;
            _db.Skills.Add(MissionSkillData);
            _db.SaveChanges();

            MissionSkillData.Status = (byte)Status;
            _db.Skills.Update(MissionSkillData);
            _db.SaveChanges();

            return true;
        }
        public bool forEditMissionSkill(int SkillId, string Title, int Status)
        {
            var isExistMissionSkill = _db.Skills.Where(m => m.SkillId == SkillId).FirstOrDefault();
            isExistMissionSkill.SkillName = Title;
            isExistMissionSkill.Status = (byte)Status;
            isExistMissionSkill.UpdatedAt = DateTime.UtcNow;
            _db.Skills.Update(isExistMissionSkill);
            _db.SaveChanges();
            return true;
        }

        public bool forDeleteMissionSkill(int skillid)
        {
            var ExistSkillData = _db.Skills.Where(s => s.SkillId == skillid).FirstOrDefault();
            ExistSkillData.DeletedAt = DateTime.UtcNow;
            _db.Skills.Update(ExistSkillData);
            _db.SaveChanges();
            return true;
        }
        public bool forDeleteMissionTheme(int missionThemeId)
        {
            var ExistThmeData = _db.MissionThemes.Where(m => m.MissionThemeId == missionThemeId).FirstOrDefault();
            ExistThmeData.DeletedAt = DateTime.UtcNow;
            _db.MissionThemes.Update(ExistThmeData);
            _db.SaveChanges();
            return true;
        }
        public bool forDeleteStory(int StoryId)
        {
            var ExistStoryData = _db.Stories.Where(st => st.StoryId == StoryId).FirstOrDefault();
            ExistStoryData.DeletedAt = DateTime.UtcNow;
            _db.Stories.Update(ExistStoryData);
            _db.SaveChanges();
            return true;
        }

        public bool forAddCMSDetails(string Title, string Description, string Slug, int Status)
        {
            CmsPage myCMS = new CmsPage();
            myCMS.Title = Title;
            myCMS.Description = Description;
            myCMS.Slug = Slug;
            myCMS.Status = Status;
            _db.CmsPages.Add(myCMS);
            _db.SaveChanges();
            return true;
        }
        public bool forEditCMSDetails(int CMSid, string Title, string Description, string Slug, int Status)
        {
            var existCms = _db.CmsPages.Where(c => c.CmsPageId == CMSid).FirstOrDefault();
            existCms.Description = Description;
            existCms.Slug = Slug;
            existCms.Status = Status;
            existCms.UpdatedAt = DateTime.UtcNow;
            existCms.Title = Title;
            _db.CmsPages.Update(existCms);
            _db.SaveChanges();
            return true;
        }
        public bool forDeleteCMSDetails(int CMSPageId)
        {
            var existCmsPage = _db.CmsPages.Where(c => c.CmsPageId == CMSPageId).FirstOrDefault();
            existCmsPage.DeletedAt = DateTime.UtcNow;
            _db.CmsPages.Update(existCmsPage);
            _db.SaveChanges();
            return true;
        }
        public List<Country> getCountryList()
        {
            var ListOfCountry = _db.Countries.ToList();
            return ListOfCountry;
        }

        public bool forAddUser(string firstName, string LastName, string email, string pwd, string EmpId, int CountryId, int CityId, string ProfText, string Department, int Status)
        {
            User adduser = new User();
            adduser.FirstName = firstName;
            adduser.LastName = LastName;
            adduser.Email = email;
            adduser.Password = pwd;
            adduser.EmployeeId = EmpId;
            adduser.CountryId = CountryId;
            adduser.CityId = CityId;
            adduser.ProfileText = ProfText;
            adduser.Department = Department;
            adduser.Status = Status;

            _db.Users.Add(adduser);
            _db.SaveChanges();
            return true;
        }
    }
}

