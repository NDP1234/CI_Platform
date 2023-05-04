using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;

using Microsoft.AspNetCore.Mvc;

namespace CI_PLATFORM.Controllers
{
    
    public class TimesheetController : Controller
    {
        private readonly IUserList _users;
        private readonly CiPlatformContext _db;
        private readonly IVolunteeringTimeSheetRepository _timesheet;

        public TimesheetController(IUserList users, CiPlatformContext db, IUserEditProfileRepository UEPrepository, IVolunteeringTimeSheetRepository timesheet)
        {
            _users = users;
            _db = db;
            _timesheet = timesheet;
        }
        //for pass the required fields in the form of view model
        public IActionResult VolunteeringTimesheet()
        {
            var session_details = HttpContext.Session.GetString("Login");
            if (session_details == null)
            {
                return RedirectToAction("login", "Authentication");
            }
            List<User> users = _users.GetUserList();
            var profile = users.FirstOrDefault(m => m.Email == session_details);
            ViewBag.UserDetails = profile;
            int userId = (int)profile.UserId;
            List<Mission>? missionTitles = _timesheet.getMissionTitles(userId);
            VTSViewModel vTSViewModel = new VTSViewModel();
            vTSViewModel.Missions = missionTitles;
            vTSViewModel.timesheets = _db.Timesheets.Where(t => t.UserId == userId && t.Action == null).ToList();
            vTSViewModel.timesheetsGoalBased = _db.Timesheets.Where(t => t.UserId == userId && t.Action != null).ToList();
            return View(vTSViewModel);
        }

        //for save the time based timesheet details 
        [HttpPost]
        [Route("/Timesheet/SaveTimeBasedTimesheet", Name = "SaveTimeBasedTimesheet")]
        public IActionResult SaveTimeBasedTimesheet(int userid, int TitleId, DateTime Date, int Hours, int Minutes, string Message)
        {
            var timeOnly = new TimeOnly(Hours, Minutes, 0);
            var tbasedDetail = _timesheet.saveTimeBasedTimeSheetDetails(userid, TitleId, Date, timeOnly, Message);
            return Json(tbasedDetail);
        }

        //for save the edited time based timesheet
        [HttpPost]
        public bool editTimeBasedTimesheetDetails(int uesrId, int timesheetId, DateTime Date, int Hour, int Minute, string Message)
        {
            var ExistTimesheet = _db.Timesheets.Where(t => t.TimesheetId == timesheetId).FirstOrDefault();
            ExistTimesheet.UserId = uesrId;
            ExistTimesheet.DateVolunteered = Date;
            ExistTimesheet.Notes = Message;
            var timeOnly = new TimeOnly(Hour, Minute, 0);
            ExistTimesheet.Time = timeOnly;
            ExistTimesheet.UpdatedAt = DateTime.UtcNow;
            _db.Timesheets.Update(ExistTimesheet);
            _db.SaveChanges();
            return true;
        }

        //for delete the  timesheet detail
        public bool trashTimeBasedData(int timesheetId)
        {
            var ExistTimesheet = _db.Timesheets.Where(t => t.TimesheetId == timesheetId).FirstOrDefault();
            if (ExistTimesheet != null)
            {
                _db.Timesheets.Remove(ExistTimesheet);
                _db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        //for save the goal based timesheet details
        [HttpPost]
        [Route("/Timesheet/SaveGoalBasedTimesheet", Name = "SaveGoalBasedTimesheet")]
        public IActionResult SaveGoalBasedTimesheet(int userid, int TitleId, DateTime Date, int Action, string Message)
        {

            var tbasedDetail = _timesheet.saveGoalBasedTimeSheetDetails(userid, TitleId, Date, Action, Message);
            return Json(tbasedDetail);
        }

        //for save the edited goal based timesheet
        [HttpPost]
        public bool editGoalBasedTimesheetDetails(int uesrId, int timesheetId, DateTime Date, int Action, string Message)
        {
            var ExistTimesheet = _db.Timesheets.Where(t => t.TimesheetId == timesheetId).FirstOrDefault();
            ExistTimesheet.UserId = uesrId;
            ExistTimesheet.DateVolunteered = Date;
            ExistTimesheet.Action = Action;
            ExistTimesheet.Notes = Message;
            ExistTimesheet.UpdatedAt = DateTime.UtcNow;
            _db.Timesheets.Update(ExistTimesheet);
            _db.SaveChanges();
            return true;
        }


        
    }
}
