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
            List<StoryMedium> storyMedium = _db.StoryMedia.Where(s => s.StoryId == id).ToList();
            User user = _db.Users.Where(u => u.UserId == stories.UserId).First();
            List<User> users = _db.Users.ToList();

            var currentUser = _db.Users.FirstOrDefault(u => u.UserId == userId); // replace currentUserId with the ID of the currently logged in user
            bool isAuthor = (stories.UserId == currentUser.UserId);
            var story = _db.Stories.FirstOrDefault(s => s.StoryId == id);
            if (!isAuthor) // only increment views if the current user is not the author
            {
                story.Views = story.Views + 1;
                _db.Stories.Update(story);
                _db.SaveChanges();
            }
            
            //story.Views = story.Views + 1;
            //_db.Stories.Update(story);
            //_db.SaveChanges();
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
                Views = story.Views
            };

            return viewModel;

        }

    }
}
