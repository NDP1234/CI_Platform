using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using Microsoft.AspNetCore.Http;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Repository.Repository
{
    public class UserEditProfileRepository : IUserEditProfileRepository
    {
        private readonly CiPlatformContext _db;
        private readonly IUserList _users;
        public UserEditProfileRepository(CiPlatformContext db, IUserList users)
        {
            _db = db;
            _users = users;
        }

        //for returning country and city list
        public UserEditProfileViewModel getCountryAndCityList()
        {
            //var session_details = HttpContext.Session.GetString("Login");

            //List<User> users = _users.GetUserList();
            //var profile = users.FirstOrDefault(m => m.Email == session_details);
            UserEditProfileViewModel cityandcountryinfo = new UserEditProfileViewModel()
            {
                countries = _db.Countries.ToList(),
                cities = _db.Cities.ToList()
            };
            return cityandcountryinfo;
        }


        //for retrive save data and displayed on page
        public UserEditProfileViewModel GetUserInfo(int userid)
        {
            var isExistUser = _db.Users.Where(u => u.UserId == userid).FirstOrDefault();
            var userSkills = _db.UserSkills
            .Where(u => u.UserId == userid)
            .Select(u => new UserEditProfileViewModel.UserSkillViewModel { SkillId = u.SkillId, SkillName = u.Skill.SkillName })
            .ToList();


            UserEditProfileViewModel userinfo = new UserEditProfileViewModel()
                {
                    Avatar = isExistUser.Avatar,
                    FirstName = isExistUser.FirstName,
                    LastName = isExistUser.LastName,
                    EmployeeId = isExistUser?.EmployeeId,
                    Title = isExistUser.Title,
                    Department = isExistUser?.Department,
                    ProfileText = isExistUser.ProfileText,
                    WhyIVolunteer = isExistUser.WhyIVolunteer,
                    LinkedInUrl = isExistUser.LinkedInUrl,
                    CountryId = isExistUser.CountryId,
                    CityId = isExistUser.CityId,
                    userSkills = userSkills
            };
                

                return userinfo;

        }


        //for storing data on click on save button
        public void saveUserDetails(int userid, UserEditProfileViewModel myUserModel)
        {
            var isExistUser = _db.Users.Where(u => u.UserId == userid).FirstOrDefault();


            isExistUser.UserId = userid;
            isExistUser.FirstName = myUserModel.FirstName;
            isExistUser.LastName = myUserModel.LastName;
            isExistUser.EmployeeId = myUserModel.EmployeeId;
            isExistUser.Title = myUserModel.Title;
            isExistUser.Department = myUserModel.Department;
            isExistUser.ProfileText = myUserModel.ProfileText;
            isExistUser.WhyIVolunteer = myUserModel.WhyIVolunteer;
            isExistUser.CityId = myUserModel.CityId;
            isExistUser.CountryId = myUserModel.CountryId;
            isExistUser.LinkedInUrl = myUserModel.LinkedInUrl;
            isExistUser.UpdatedAt = DateTime.UtcNow;

            _db.Users.Update(isExistUser);
            _db.SaveChanges();

        }

        //for update password of user
        public bool UpdatePwd(int uid, UserEditProfileViewModel mychangePwdModel)
        {
            var isExistUser = _db.Users.Where(u => u.UserId == uid).FirstOrDefault();
            if (isExistUser != null && mychangePwdModel.ConfirmPassword == mychangePwdModel.NewPassword && mychangePwdModel.OldPassword==isExistUser.Password)
            {
                isExistUser.Password=mychangePwdModel.NewPassword;
                _db.Users.Update(isExistUser);
                _db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
