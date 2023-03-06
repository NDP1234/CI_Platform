using CI_Platform.Entities.Models;
using System.ComponentModel.DataAnnotations;


//namespace CI_PLATFORM.Models.ViewModels
namespace CI_Platform.Entities.Models.VM
{
    public class PlatformLandingViewModel
    {
        public Mission? Missions { get; set; }

        public MissionMedium? image { get; set; }
        public List<Country>? Country { get; set; }
        public List<City>? Cities { get; set; }
        public List<MissionTheme>? themes { get; set; }
        public List<Skill>? skills { get; set; }
    }
}
