using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Repository.Interface
{
    public interface IAdminRepository
    {
        public List<User> getUserList();
        public List<Mission> getMissionList();
        public List<MissionApplication> getMissionApplicationList();
        public List<Story> getStoryDetailList();
        //public AdminViewModel getMissionSkillList();
        public List<Skill> getMissionSkillList();
        public List<MissionTheme> getMissionThemeList();
        public List<CmsPage> getCMSPageList();
        public List<Country> getCountryList();

         public bool forApproveMissionApplication(int MissionAppId) ;
         public bool forDeclineMissionApplication(int MissionAppId) ;
         public bool forPublishStory(int StoryId) ;
         public bool forDeclineStory(int StoryId) ;
         public bool forAddMissionTheme(string Title, int Status);
        public bool forEditMissionTheme(int MissionThemeId, string Title, int Status);
        //public List<AdminViewModel.MissionSkill> forAddMissionSkill(string Title, int Status);
        public bool forAddMissionSkill(string Title, int Status);
        public bool forEditMissionSkill(int SkillId, string Title, int Status);
        public bool forDeleteMissionSkill(int skillid);
        public bool forDeleteMissionTheme(int missionThemeId);
        public bool forDeleteStory(int StoryId);
        public bool forAddCMSDetails(string Title, string Description, string Slug, int Status);
        public bool forEditCMSDetails(int CMSid, string Title, string Description, string Slug, int Status);
        public bool forDeleteCMSDetails(int CMSPageId);
        public bool forAddUser(string firstName, string LastName, string email, string pwd, string EmpId, int CountryId, int CityId, string ProfText, string Department, int Status);
    }
}
