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
            vTSViewModel.timesheets = _db.Timesheets.Where(t=>t.UserId== userId && t.Action==null).ToList();
            return View(vTSViewModel);
        }
        [HttpPost]
        [Route("/Timesheet/SaveTimeBasedTimesheet", Name = "SaveTimeBasedTimesheet")]
        public IActionResult SaveTimeBasedTimesheet(int userid, int TitleId, DateTime Date, int Hours, int Minutes, string Message)
        {
            var timeOnly = new TimeOnly(Hours, Minutes, 0);
            var tbasedDetail = _timesheet.saveTimeBasedTimeSheetDetails(userid, TitleId, Date, timeOnly, Message);
            return Json(tbasedDetail);
        }

        [HttpPost]
        public bool saveTimeBasedTimesheetDetails(int userid,int timesheetId, int TitleId, DateTime Date, int Hours, int Minutes, string Message)
        {
            var ExistTimesheet = _db.Timesheets.Where(t => t.TimesheetId == timesheetId).FirstOrDefault();
            ExistTimesheet.UserId=userid;
            ExistTimesheet.MissionId = TitleId;
            ExistTimesheet.DateVolunteered=Date;
            ExistTimesheet.Notes = Message;
            var timeOnly = new TimeOnly(Hours, Minutes, 0);
            ExistTimesheet.Time = timeOnly;
            _db.Timesheets.Update(ExistTimesheet);
            _db.SaveChanges();
            return true;
        }
    }
}
