using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
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
            var storyExist = _db.Stories.Where(s=>s.StoryId == StoryId).FirstOrDefault();
            storyExist.Status = "PUBLISHED";
            storyExist.PublishedAt = DateTime.Now;
            _db.Stories.Update(storyExist);
            _db.SaveChanges();

            return true;
        } 
        public bool forDeclineStory(int StoryId)
        {
            var storyExist = _db.Stories.Where(s=>s.StoryId == StoryId).FirstOrDefault();
            storyExist.Status = "DECLINED";           
            _db.Stories.Update(storyExist);
            _db.SaveChanges();

            return true;
        }
    }
}
