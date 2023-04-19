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

         public bool forApproveMissionApplication(int MissionAppId) ;
         public bool forDeclineMissionApplication(int MissionAppId) ;
         public bool forPublishStory(int StoryId) ;
         public bool forDeclineStory(int StoryId) ;
         public bool forAddMissionTheme(string Title, int Status);
        public bool forEditMissionTheme(int MissionThemeId, string Title, int Status);
        //public List<AdminViewModel.MissionSkill> forAddMissionSkill(string Title, int Status);
        public bool forAddMissionSkill(string Title, int Status);
        public bool forEditMissionSkill(int SkillId, string Title, int Status);
    }
}
