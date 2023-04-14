using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Entities.Models.VM
{
    public class AdminViewModel
    {
        public List<User> users { get; set; }
        public List<Mission> Missions { get; set; }
        public List<MissionApplication> MissionApplications { get; set; }
        public List<Story> Stories { get; set; }
        public List<Skill> missionSkills { get; set; }
        public List<MissionTheme> MissionThemes { get; set; }

    }
}
