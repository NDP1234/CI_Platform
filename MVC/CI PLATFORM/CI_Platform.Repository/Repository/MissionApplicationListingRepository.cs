using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using Microsoft.EntityFrameworkCore;
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

        public ShareMyStoryViewModel.ForSaveDraft DraftStory(int userid, int missionid, string title, DateTime publishedAt, string description, string status, List<string> pathlist)
        {
            var isExistStory = _db.Stories.Where(u => u.UserId == userid && u.MissionId == missionid).FirstOrDefault();

            if (isExistStory != null)
            {
                isExistStory.UserId = userid;
                isExistStory.MissionId = missionid;
                isExistStory.Status = status;
                isExistStory.Title = title;
                isExistStory.PublishedAt = publishedAt;
                //isExistStory.CreatedAt = DateTime.UtcNow;
                isExistStory.Description = description;

                _db.Stories.Update(isExistStory);
                _db.SaveChanges();
                var storyid = isExistStory.StoryId;
                var existingPhotos = _db.StoryMedia
                .Where(sm => sm.StoryId == storyid)
                .ToList();
                if (existingPhotos != null)
                {
                    foreach (var photo in existingPhotos)
                    {
                        _db.StoryMedia.Remove(photo);
                    }
                }

                
                foreach (var path in pathlist)
                {
                    CI_Platform.Entities.Models.StoryMedium image = new StoryMedium()
                    {
                        Path = path,
                        StoryId = storyid,
                        CreatedAt = DateTime.UtcNow,
                        Type = ".jpg",
                    };
                    _db.StoryMedia.Add(image);


                }


                _db.SaveChanges();

            }
            else
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


                var storyid = storydraft.StoryId;

                foreach (var path in pathlist)
                {
                    CI_Platform.Entities.Models.StoryMedium image = new StoryMedium()
                    {

                        Path = path,
                        StoryId = storyid,
                        CreatedAt = DateTime.UtcNow,
                        Type = ".png",


                    };
                    _db.StoryMedia.Add(image);
                }


                _db.SaveChanges();
            }
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
            var isExistStory = _db.Stories.Where(s => s.UserId == userid && s.MissionId == missionid).FirstOrDefault();
            if (isExistStory != null)
            {
                isExistStory.Title = title;
                isExistStory.Status = status;
                isExistStory.PublishedAt = publishedAt;
                isExistStory.CreatedAt = DateTime.UtcNow;

                _db.Stories.Update(isExistStory);
                _db.SaveChanges();
            }
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

