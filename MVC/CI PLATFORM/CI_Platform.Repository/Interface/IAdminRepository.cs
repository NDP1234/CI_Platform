using CI_Platform.Entities.Models;
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
        public List<Skill> getMissionSkillList();
        public List<MissionTheme> getMissionThemeList();
    }
}
