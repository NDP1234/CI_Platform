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
    public class StoryDetailRepository : IStoryDetailRepository
    {
        private readonly CiPlatformContext _db;

        public StoryDetailRepository(CiPlatformContext db)
        {
            _db = db;
        }
        public StoryDetailViewModel storyDetailPageInfo(int id, int userId)
        {
            Story stories = _db.Stories.Where(s => s.StoryId == id).First();
            List<StoryMedium> storyMedium = _db.StoryMedia.Where(s => s.StoryId == id).OrderBy(m => m.Type).ToList();
            User user = _db.Users.Where(u => u.UserId == stories.UserId).First();
            List<User> users = _db.Users.ToList();

            bool isStoryViewExist = _db.StoryViews.Any(s => s.StoryId == id && s.UserId == userId);

            if (!isStoryViewExist)
            {
                StoryView storyView = new StoryView()
                {
                    StoryId = id,
                    UserId = (long)userId,
                    CreatedAt = DateTime.UtcNow,

                };
                _db.StoryViews.Add(storyView);
                _db.SaveChanges();
            }

            long storyViews = _db.StoryViews.Where(s => s.StoryId == id).Count();


            var viewModel = new StoryDetailViewModel
            {
                StoryId = stories.StoryId,
                UserId = user.UserId,
                MissionId = stories.MissionId,
                Title = stories.Title,
                Description = stories.Description,
                paths = storyMedium.Select(m => m.Path).ToList(),
                Avatar = user.Avatar,
                FirstName = user.FirstName,
                LastName = user.LastName,
                WhyIVolunteer = user.WhyIVolunteer,
                Users = users,
                Views = storyViews,
                StoryInvites = _db.StoryInvites.ToList()
            };

            return viewModel;

        }

    }
}
