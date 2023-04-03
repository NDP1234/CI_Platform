using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Entities.Models.VM
{

    public class StoryViewModel
    {
        public IEnumerable<User> User { get; set; }
        public IEnumerable<Story> Stories { get; set; }
        public IEnumerable<MissionTheme> MissionThemes { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
    }

}
