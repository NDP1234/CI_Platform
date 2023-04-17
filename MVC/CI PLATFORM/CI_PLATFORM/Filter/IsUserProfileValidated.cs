////using CI_PLATFORM.DataDB;
//using CI_Platform.Entities.Data;
//using CI_Platform.Entities.Models;
//using CI_Platform.Repository.Interface;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Filters;
//using Microsoft.AspNetCore.Mvc.ViewFeatures;
//using Microsoft.AspNetCore.Http;
//using Microsoft.VisualBasic;
//using System.Collections.Generic;
//using System.Security.Claims;


//namespace CI_PLATFORM.FILTERS
//{
//    public class IsUserProfileValidated : Microsoft.AspNetCore.Mvc.Filters.IActionFilter
//    {
//        private readonly CiPlatformContext _db;
//        private readonly ITempDataDictionaryFactory _tempData;
//        private readonly IUserList _users;
//        //private readonly IHttpContextAccessor _httpContextAccessor;

//        public IsUserProfileValidated(CiPlatformContext db, ITempDataDictionaryFactory tempData, IUserList users)
//        {
//            _db = db;
//            _tempData = tempData;
//            _users = users;
//            //_httpContextAccessor = httpContextAccessor;
//        }
        
//        public void OnActionExecuting(Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext context)
//        {
//            var session_details = HttpContext.Session.GetString("Login");

//            if (session_details != null)
//            {
//                List<User> users = _users.GetUserList();
//                var profile = users.FirstOrDefault(m => m.Email == session_details);

//                if (profile.CountryId == null && profile.CityId == null)
//                {
//                    var TempData = _tempData.GetTempData(context.HttpContext);
//                    TempData["Warning"] = "Your Profile is incomplete befor acessing any page please add your city and country..!!!";
//                    context.Result = new RedirectToActionResult("UserEditProfilePage", "UserEditProfile", null);
//                }
//                return;
//            }
//            else
//            {
//                context.Result = new RedirectToActionResult("login", "Authentication", null);
//            }
//        }

//        public void OnActionExecuted(Microsoft.AspNetCore.Mvc.Filters.ActionExecutedContext context)
//        {
//            return;
//        }
//    }
//}
