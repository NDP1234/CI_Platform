using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Entities.Models.VM
{
    public class StoryDetailViewModel
    {
        public long StoryId { get; set; }
        public long UserId { get; set; }
        public long MissionId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public List<string> paths { get; set; }
        public string? Avatar { get; set; }
        public string? WhyIVolunteer { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<User> Users { get; set; }
        public long? Views { get; set; }
        public List<StoryInvite> StoryInvites { get; set; }
    }
}
