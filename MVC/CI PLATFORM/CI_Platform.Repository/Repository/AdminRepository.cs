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

        //public List<AdminViewModel.MissionSkill> forAddMissionSkill(string Title, int Status)
        //{

        //    Skill MissionSkillData = new Skill();

        //    MissionSkillData.SkillName = Title;
        //    MissionSkillData.Status = (byte)Status;
        //    _db.Skills.Add(MissionSkillData);
        //    _db.SaveChanges();

        //    MissionSkillData.Status = (byte)Status;
        //    _db.Skills.Update(MissionSkillData);
        //    _db.SaveChanges();

        //    AdminViewModel.MissionSkill myskill = new AdminViewModel.MissionSkill
        //    {
        //        SkillId = MissionSkillData.SkillId,
        //        SkillName = MissionSkillData.SkillName,
        //        Status = MissionSkillData.Status
        //    };
        //    List<AdminViewModel.MissionSkill> myskills = new List<AdminViewModel.MissionSkill>();
        //    myskills.Add(myskill);

        //    return myskills;

        //}
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
    }


}
