using CI_Platform.Entities.Models;
using System.ComponentModel.DataAnnotations;



namespace CI_Platform.Entities.Models.VM
{
    public class PlatformLandingViewModel
    {
        public bool isValid;

        public Mission? Missions { get; set; }

        public MissionMedium? image { get; set; }
        public IEnumerable<Country>? Country { get; set; }
        public IEnumerable<City>? Cities { get; set; }
        public IEnumerable<MissionTheme>? themes { get; set; }
        public IEnumerable<Skill>? skills { get; set; }
        public IEnumerable<MissionSkill>? MissionSkills { get; set; }
        public List<User> Users { get; set; }
        public double AvgRating { get; set; }
        public string GoalObjectiveText { get; set; }
        public long Goalvalue { get; set; }

        public long totalAchieve { get; set; }
    }
}
