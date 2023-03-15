using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Entities.Models.VM
{
    public class VolunteeringMissionPageViewModel
    {
        public Mission? Missions { get; set; }
        public GoalMission? Goals { get; set; }
        public MissionMedium? image { get; set; }
        public List<Country>? Country { get; set; }
        public List<City>? Cities { get; set; }
        public List<MissionTheme>? themes { get; set; }
        public List<Skill>? skills { get; set; }
        public List<MissionSkill>? MissionSkills { get; set; }
    }
}
