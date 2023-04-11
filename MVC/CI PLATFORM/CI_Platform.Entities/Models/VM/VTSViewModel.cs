using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Entities.Models.VM
{
    public class VTSViewModel
    {
        public List<Mission> Missions { get; set; }
        public List<Timesheet> timesheets { get; set; }

        //public long MissionId { get; set; }
        public long TimesheetId { get; set; }

        public long? UserId { get; set; }

        public long? MissionId { get; set; }

        public TimeSpan? Time { get; set; }

        public int? Action { get; set; }

        public DateTime DateVolunteered { get; set; }

        public string? Notes { get; set; }

        public string Status { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}
