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

            var skills = _db.Skills.ToList();
            UserEditProfileViewModel cityandcountryinfo = new UserEditProfileViewModel()
            {
                countries = _db.Countries.ToList(),
                cities = _db.Cities.ToList(),
                Skills = skills
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
                userSkills = userSkills,

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

            if (myUserModel.skillIds != null)
            {
                var selectedSkillIds = myUserModel.skillIds.Split(',').Select(s => long.Parse(s)).ToList();
                var existingSkillIds = _db.UserSkills.Where(u => u.UserId == userid).Select(u => u.SkillId).ToList();


                foreach (var skillId in selectedSkillIds)
                {
                    // Add new skills
                    if (!existingSkillIds.Contains(skillId))
                    {
                        var myskill = new UserSkill()
                        {
                            UserId = userid,
                            SkillId = skillId,
                            CreatedAt = DateTime.UtcNow
                        };
                        _db.UserSkills.Add(myskill);
                    }
                    //change in UpdatedAt field if new skillList conatins in database
                    if (existingSkillIds.Contains(skillId))
                    {
                        var myexistskill = _db.UserSkills.Where(u => u.SkillId == skillId && u.UserId == userid).FirstOrDefault();
                        myexistskill.UpdatedAt = DateTime.UtcNow;

                        _db.UserSkills.Update(myexistskill);
                        _db.SaveChanges();
                    }
                }

                // Remove unmatched skills
                foreach (var skillId in existingSkillIds)
                {
                    if (!selectedSkillIds.Contains(skillId))
                    {
                        var removeskill = _db.UserSkills.Where(u => u.SkillId == skillId && u.UserId == userid).FirstOrDefault();
                        _db.UserSkills.Remove(removeskill);
                        _db.SaveChanges();
                    }
                }
            }
        }

        //for update password of user
        public bool UpdatePwd(int uid, UserEditProfileViewModel mychangePwdModel)
        {
            var isExistUser = _db.Users.Where(u => u.UserId == uid).FirstOrDefault();
            if (isExistUser != null && mychangePwdModel.ConfirmPassword == mychangePwdModel.NewPassword && mychangePwdModel.OldPassword == isExistUser.Password)
            {
                isExistUser.Password = mychangePwdModel.NewPassword;
                _db.Users.Update(isExistUser);
                _db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        //for saving data in contact us schema
        public bool saveContactUsDetails(string username, string useremail, string subject, string message)
        {
            
            ContactU saveContact = new ContactU();
            saveContact.Message = message;
            saveContact.UserEmailId = useremail;
            saveContact.Subject = subject;
            saveContact.UserName =  username;

            _db.ContactUs.Add(saveContact);
            _db.SaveChanges();
            return true;
        }
    }
}
