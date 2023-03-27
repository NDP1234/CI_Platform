using CI_Platform.Entities.Models;
using System.ComponentModel.DataAnnotations;


//namespace CI_PLATFORM.Models.ViewModels
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
    }
}
