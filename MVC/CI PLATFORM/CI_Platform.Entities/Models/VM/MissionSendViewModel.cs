using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Entities.Models.VM
{
    public class MissionSendViewModel
    {
        public long MissionId { get; set; }
        public long ThemeId { get; set; }
        public long CityId { get; set; }
        public long CountryId { get; set; }
        public string Title { get; set; }
        public string? ShortDescription { get; set; }

        public string? Description { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string MissionType { get; set; } = null!;

        public int Status { get; set; }

        public string? OrganizationName { get; set; }

        public string? OrganizationDetail { get; set; }

        public string? Availability { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }

        public int? SeatsVacancy { get; set; }
        public long SkillId { get; set; }
        public string? SkillName { get; set; }
        public string? GoalObjectiveText { get; set; }
        public int GoalValue { get; set; }
        public List<string> MissionDocuments {get; set;}
        public List<string> MissionMediums {get; set; }
        public List<long> MissionSkills { get; set; }
        public string url { get; set; }

    }
}
