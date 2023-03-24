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
    public class MissionApplicationListingRepository : IMissionApplicationListingRepository
    {
        private readonly CiPlatformContext _db ;

        public MissionApplicationListingRepository(CiPlatformContext db)
        {
            _db = db;
        }

        public List<Mission> GetMissionTitlesByUserId(int userId)
        {
            return _db.MissionApplications
                .Where(m => m.UserId == userId)
                .Select(m => m.Mission)
                .ToList();
            
        }

        public ShareMyStoryViewModel.ForSaveDraft DraftStory(int userid ,int missionid,string title, DateTime publishedAt, string description, string status)
        {
            CI_Platform.Entities.Models.Story storydraft = new Story()
            {
                UserId = userid,
                MissionId = missionid,
                Status = status,
                Title = title,
                PublishedAt = publishedAt,
                //CreatedAt = DateTime.UtcNow,
                Description = description,
            };

            _db.Stories.Add(storydraft);
            _db.SaveChanges();

            return new ShareMyStoryViewModel.ForSaveDraft()
            {
                UserId = userid,
                MissionId = missionid,
                Status = status,
                Title = title,
                PublishedAt = publishedAt,
                Description = description,
            };
        }
        public ShareMyStoryViewModel.ForSubmit SubmitStory(int userid,int missionid,string title, DateTime publishedAt, string description, string status)
        {
           
            CI_Platform.Entities.Models.Story storySave = new Story()
            {
                UserId = userid,
                MissionId = missionid,
                Status = status,
                Title = title,
                PublishedAt = publishedAt,
                Description = description,
            };

            _db.Stories.Add(storySave);
            _db.SaveChanges();

            return new ShareMyStoryViewModel.ForSubmit()
            {
                UserId = userid,
                MissionId = missionid,
                Status = status,
                Title = title,
                PublishedAt = publishedAt,
                Description = description,
            };
        }
    }
    }

