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
    public class AdminRepository : IAdminRepository
    {
        private readonly CiPlatformContext _db;
        public AdminRepository(CiPlatformContext db)
        {
            _db = db;
        }
        public List<User> getUserList()
        {
            var ListOfUsers = _db.Users.ToList();
            return ListOfUsers;
        }

        public List<Mission> getMissionList()
        {
            var ListOfMission = _db.Missions.ToList();
            return ListOfMission;
        }

        public List<MissionApplication> getMissionApplicationList()
        {
            var ListOfMissionApplication = _db.MissionApplications.ToList();
            return ListOfMissionApplication;
        }

        public List<Story> getStoryDetailList()
        {
            var ListOfStories = _db.Stories.ToList();
            return ListOfStories;
        }

        public List<Skill> getMissionSkillList()
        {
            var ListOfMissionSkills = _db.Skills.ToList();
            return ListOfMissionSkills;
        }


        public List<MissionTheme> getMissionThemeList()
        {
            var ListOfMissionTheme = _db.MissionThemes.ToList();
            return ListOfMissionTheme;
        }
        public List<CmsPage> getCMSPageList()
        {
            var ListOfCMSPages = _db.CmsPages.ToList();
            return ListOfCMSPages;
        }
        public List<Banner> getBannerList()
        {
            var ListOfBanner = _db.Banners.ToList();
            return ListOfBanner;
        }
        public bool forApproveMissionApplication(int MissionAppId)
        {
            var MissionApplicationExist = _db.MissionApplications.Where(m => m.MissionApplicationId == MissionAppId).FirstOrDefault();

            MissionApplicationExist.ApprovalStatus = "APPROVE";
            _db.MissionApplications.Update(MissionApplicationExist);
            _db.SaveChanges();

            return true;
        }
        public bool forDeclineMissionApplication(int MissionAppId)
        {
            var MissionApplicationExist = _db.MissionApplications.Where(m => m.MissionApplicationId == MissionAppId).FirstOrDefault();

            MissionApplicationExist.ApprovalStatus = "DECLINE";
            _db.MissionApplications.Update(MissionApplicationExist);
            _db.SaveChanges();

            return true;
        }

        public bool forPublishStory(int StoryId)
        {
            var storyExist = _db.Stories.Where(s => s.StoryId == StoryId).FirstOrDefault();
            storyExist.Status = "PUBLISHED";
            storyExist.PublishedAt = DateTime.Now;
            _db.Stories.Update(storyExist);
            _db.SaveChanges();

            return true;
        }
        public bool forDeclineStory(int StoryId)
        {
            var storyExist = _db.Stories.Where(s => s.StoryId == StoryId).FirstOrDefault();
            storyExist.Status = "DECLINED";
            _db.Stories.Update(storyExist);
            _db.SaveChanges();

            return true;
        }

        public bool forAddMissionTheme(string Title, int Status)
        {
            var MissionThemeData = new MissionTheme();
            MissionThemeData.Title = Title;
            MissionThemeData.Status = (byte)Status;
            _db.MissionThemes.Add(MissionThemeData);
            _db.SaveChanges();

            MissionThemeData.Status = (byte)Status;
            _db.MissionThemes.Update(MissionThemeData);
            _db.SaveChanges();
            return true;
        }
        public bool forEditMissionTheme(int MissionThemeId, string Title, int Status)
        {

            var isExistMissionTheme = _db.MissionThemes.Where(m => m.MissionThemeId == MissionThemeId).FirstOrDefault();
            isExistMissionTheme.Title = Title;
            isExistMissionTheme.Status = (byte)Status;
            isExistMissionTheme.UpdatedAt = DateTime.UtcNow;
            _db.MissionThemes.Update(isExistMissionTheme);
            _db.SaveChanges();
            return true;
        }

        public bool forAddMissionSkill(string Title, int Status)
        {

            Skill MissionSkillData = new Skill();

            MissionSkillData.SkillName = Title;
            MissionSkillData.Status = (byte)Status;
            _db.Skills.Add(MissionSkillData);
            _db.SaveChanges();

            MissionSkillData.Status = (byte)Status;
            _db.Skills.Update(MissionSkillData);
            _db.SaveChanges();

            return true;
        }
        public bool forEditMissionSkill(int SkillId, string Title, int Status)
        {
            var isExistMissionSkill = _db.Skills.Where(m => m.SkillId == SkillId).FirstOrDefault();
            isExistMissionSkill.SkillName = Title;
            isExistMissionSkill.Status = (byte)Status;
            isExistMissionSkill.UpdatedAt = DateTime.UtcNow;
            _db.Skills.Update(isExistMissionSkill);
            _db.SaveChanges();
            return true;
        }

        public bool forDeleteMissionSkill(int skillid)
        {
            var ExistSkillData = _db.Skills.Where(s => s.SkillId == skillid).FirstOrDefault();
            ExistSkillData.DeletedAt = DateTime.UtcNow;
            _db.Skills.Update(ExistSkillData);
            _db.SaveChanges();
            return true;
        }
        public bool forDeleteMissionTheme(int missionThemeId)
        {
            var ExistThmeData = _db.MissionThemes.Where(m => m.MissionThemeId == missionThemeId).FirstOrDefault();
            ExistThmeData.DeletedAt = DateTime.UtcNow;
            _db.MissionThemes.Update(ExistThmeData);
            _db.SaveChanges();
            return true;
        }
        public bool forDeleteStory(int StoryId)
        {
            var ExistStoryData = _db.Stories.Where(st => st.StoryId == StoryId).FirstOrDefault();
            ExistStoryData.DeletedAt = DateTime.UtcNow;
            _db.Stories.Update(ExistStoryData);
            _db.SaveChanges();
            return true;
        }

        public bool forAddCMSDetails(string Title, string Description, string Slug, int Status)
        {
            CmsPage myCMS = new CmsPage();
            myCMS.Title = Title;
            myCMS.Description = Description;
            myCMS.Slug = Slug;
            myCMS.Status = Status;
            _db.CmsPages.Add(myCMS);
            _db.SaveChanges();
            return true;
        }
        public bool forEditCMSDetails(int CMSid, string Title, string Description, string Slug, int Status)
        {
            var existCms = _db.CmsPages.Where(c => c.CmsPageId == CMSid).FirstOrDefault();
            existCms.Description = Description;
            existCms.Slug = Slug;
            existCms.Status = Status;
            existCms.UpdatedAt = DateTime.UtcNow;
            existCms.Title = Title;
            _db.CmsPages.Update(existCms);
            _db.SaveChanges();
            return true;
        }
        public bool forDeleteCMSDetails(int CMSPageId)
        {
            var existCmsPage = _db.CmsPages.Where(c => c.CmsPageId == CMSPageId).FirstOrDefault();
            existCmsPage.DeletedAt = DateTime.UtcNow;
            _db.CmsPages.Update(existCmsPage);
            _db.SaveChanges();
            return true;
        }
        public List<Country> getCountryList()
        {
            var ListOfCountry = _db.Countries.ToList();
            return ListOfCountry;
        }

        public List<City> getCityList()
        {
            var ListOfCity = _db.Cities.ToList();
            return ListOfCity;
        }

        public bool forAddUser(string firstName, string LastName, string email, string pwd, string EmpId, int CountryId, int CityId, string ProfText, string Department, int Status, string PhoneNumber, string Avatar)
        {
            User adduser = new User();
            adduser.FirstName = firstName;
            adduser.LastName = LastName;
            adduser.Email = email;
            adduser.Password = pwd;
            adduser.CountryId = CountryId;
            adduser.EmployeeId = EmpId;
            adduser.CityId = CityId;
            adduser.ProfileText = ProfText;
            adduser.Department = Department;
            adduser.Status = Status;
            adduser.PhoneNumber = PhoneNumber;
            adduser.Avatar = Avatar;
            _db.Users.Add(adduser);
            _db.SaveChanges();
            return true;
        }

        public bool SaveEditedUserinfo(int userId, string FirstName, string LastName, string Email, string Password, string EmployeeId, int CountryId, int CityId, string ProfileText, string Department, int Status, string PhoneNumber, string Avatar)
        {
            var isExistUser = _db.Users.Where(u => u.UserId == userId).FirstOrDefault();
            isExistUser.FirstName = FirstName;
            isExistUser.LastName = LastName;
            isExistUser.Email = Email;
            isExistUser.Password = Password;
            isExistUser.EmployeeId = EmployeeId;
            isExistUser.CountryId = CountryId;
            isExistUser.CityId = CityId;
            isExistUser.ProfileText = ProfileText;
            isExistUser.Department = Department;
            isExistUser.Status = Status;
            isExistUser.PhoneNumber = PhoneNumber;
            isExistUser.Avatar = Avatar;
            isExistUser.UpdatedAt = DateTime.UtcNow;

            _db.Users.Update(isExistUser);
            _db.SaveChanges();
            return true;
        }

        public bool DeleteUserDetails(int userId)
        {
            var isExistUser = _db.Users.Where(u => u.UserId == userId).FirstOrDefault();
            isExistUser.DeletedAt = DateTime.UtcNow;
            _db.Users.Update(isExistUser);
            _db.SaveChanges();
            return true;
        }

        public bool forAddMissionDetails(string MissionTitle, string ShortDescription, string Description, int CountryId, int CityId, string OrganisationName, string Missiontype, DateTime MisStartDate, DateTime MisEndDate, string Organizationdetails, int TotalSeats, DateTime MisRegEndDate, int MissionTheme, string myAvailability, string VideoUrl, List<string> imgpathlist, List<string> docpathlist, List<string> selectedMissionSkill, string goaltext, int GoalValue)
        {
            Mission myMission = new Mission();
            myMission.Title = MissionTitle;
            myMission.ShortDescription = ShortDescription;
            myMission.Description = Description;
            myMission.CountryId = CountryId;
            myMission.CityId = CityId;
            myMission.OrganizationName = OrganisationName;
            myMission.MissionType = Missiontype;
            myMission.StartDate = MisStartDate;
            myMission.EndDate = MisEndDate;
            myMission.OrganizationDetail = Organizationdetails;
            myMission.SeatsVacancy = TotalSeats;
            myMission.Availability = myAvailability;
            myMission.ThemeId = MissionTheme;
            _db.Missions.Add(myMission);
            _db.SaveChanges();

            var missionId = myMission.MissionId;

            foreach (var img in imgpathlist)
            {
                MissionMedium image = new MissionMedium()
                {

                    MediaPath = img,
                    MissionId = missionId,
                    CreatedAt = DateTime.UtcNow,
                    MediaType = "img",


                };
                _db.MissionMedia.Add(image);
            }
            _db.SaveChanges();

            foreach (var doc in docpathlist)
            {
                MissionDocument missionDoc = new MissionDocument()
                {
                    MissionId = missionId,
                    DocumentName = "document",
                    DocumentType = "document",
                    DocumentPath = doc


                };
                _db.MissionDocuments.Add(missionDoc);
            }
            _db.SaveChanges();

            MissionMedium videoUrl = new MissionMedium()
            {

                MediaPath = VideoUrl,
                MissionId = missionId,
                MediaType = "url",


            };
            _db.MissionMedia.Add(videoUrl);
            _db.SaveChanges();

            foreach (var skl in selectedMissionSkill)
            {
                MissionSkill MissionSkill = new MissionSkill()
                {
                    MissionId = missionId,
                    SkillId = long.Parse(skl),
                };
                _db.MissionSkills.Add(MissionSkill);
            }
            _db.SaveChanges();

            if (Missiontype == "GOAL")
            {
                GoalMission mygoalMission = new GoalMission()
                {
                    MissionId = missionId,
                    GoalObjectiveText = goaltext,
                    GoalValue = GoalValue
                };
                _db.GoalMissions.Add(mygoalMission);
                _db.SaveChanges();
            }
            return true;
        }



        public MissionSendViewModel getMissionData(int missionId)
        {
            //var isExistMissionData = _db.Missions.Where(m => m.MissionId == missionId).FirstOrDefault();
            var isExistMissionData = _db.Missions.FirstOrDefault(m => m.MissionId == missionId);
            var MissionMediaData = _db.MissionMedia.Where(md => md.MissionId == missionId && md.MediaType!="url").Select(md=>md.MediaPath).ToList();
            //var urlinfo = _db.MissionMedia.Where(md => md.MissionId == missionId && md.MediaType=="url").Select(md=>md.MediaPath).First();
            var missionSkill = _db.MissionSkills.Where(ms => ms.MissionId == missionId).Select(m => m.SkillId).ToList();
            var missionDoc = _db.MissionDocuments.Where(md => md.MissionId == missionId).Select(mdoc=>mdoc.DocumentPath).ToList();
            var missionGoal = _db.GoalMissions.Where(mg => mg.MissionId == missionId).FirstOrDefault();
            

            MissionSendViewModel mymodel = new MissionSendViewModel()
            {
                MissionId = missionId,
                Title = isExistMissionData.Title,
                Description = isExistMissionData.Description,
                ShortDescription = isExistMissionData.ShortDescription,
                OrganizationDetail = isExistMissionData.OrganizationDetail,
                OrganizationName = isExistMissionData.OrganizationName,
                StartDate = isExistMissionData.StartDate,
                EndDate = isExistMissionData.EndDate,
                SeatsVacancy = isExistMissionData.SeatsVacancy,
                MissionType = isExistMissionData.MissionType,
                ThemeId = isExistMissionData.ThemeId,
                CountryId = isExistMissionData.CountryId,
                CityId = isExistMissionData.CityId,
                Status = isExistMissionData.Status,
                Availability = isExistMissionData.Availability,
                MissionDocuments = missionDoc,
                MissionMediums = MissionMediaData,
                MissionSkills = missionSkill
               
            };
            if (mymodel.MissionType == "GOAL")
            {
                mymodel.GoalObjectiveText = missionGoal.GoalObjectiveText;
                mymodel.GoalValue = missionGoal.GoalValue;
            }
            return mymodel;


        }



        public bool forAddBannerDetails(string Text, int Ordervalue, string image)
        {
            var myBanner = new Banner();
            myBanner.Text = Text;
            myBanner.SortOrder = Ordervalue;
            myBanner.Image = image;

            _db.Banners.Add(myBanner);
            _db.SaveChanges();
            return true;
        }

        public bool forEditBannerDetails(string Text, int Ordervalue, string image, int BannerId)
        {
            var BannerExist = _db.Banners.Where(b => b.BannerId == BannerId).First();
            BannerExist.Text = Text;
            BannerExist.SortOrder = Ordervalue;
            BannerExist.Image = image;
            BannerExist.UpdatedAt = DateTime.UtcNow;

            _db.Banners.Update(BannerExist);
            _db.SaveChanges();

            return true;
        }

        public bool forDeleteBannerDetails(int BannerId)
        {
            var isExistBnner = _db.Banners.Where(b => b.BannerId == BannerId).FirstOrDefault();
            isExistBnner.DeletedAt = DateTime.UtcNow;
            _db.Banners.Update(isExistBnner);
            _db.SaveChanges();
            return true;
        }

    }
}

