using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Repository.Repository
{
    public class VolunteeringTimeSheetRepository : IVolunteeringTimeSheetRepository
    {
        private readonly CiPlatformContext _db;

        public VolunteeringTimeSheetRepository(CiPlatformContext db)
        {
            _db = db;
        }
        public List<Mission> getMissionTitles(int userid)
        {
            return _db.MissionApplications
               .Where(m => m.UserId == userid)
               .Select(m => m.Mission)
               .ToList();
        }
        public Timesheet saveTimeBasedTimeSheetDetails(int userid, int TitleId, DateTime Date, TimeOnly time, string Message)
        {
            Timesheet model = new Timesheet();
            model.MissionId = TitleId;
            model.DateVolunteered = Date;
            model.Time = time;
            model.Status = "APPROVED";
            model.UserId = userid;
            model.Notes = Message;
            _db.Timesheets.Add(model);
            _db.SaveChanges();

            return model;
        }
        
        public Timesheet saveGoalBasedTimeSheetDetails(int userid, int TitleId, DateTime Date, int Action, string Message)
        {
            Timesheet model = new Timesheet();
            model.UserId = userid;
            model.MissionId = TitleId;
            model.DateVolunteered = Date;
            model.Status = "APPROVED";
            model.Action = Action;
            model.Notes = Message;
            _db.Timesheets.Add(model);
            _db.SaveChanges();

            return model;
        }
    }
}
