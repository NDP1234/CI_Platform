using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Repository.Interface
{
    public interface IVolunteeringTimeSheetRepository
    {
        public List<Mission> getMissionTitles(int userid);

        public Timesheet saveTimeBasedTimeSheetDetails(int userid, int TitleId, DateTime Date, TimeOnly time, string Message);
    }
}
