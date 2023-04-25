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
    public class StoryListingRepository : IStoryListingRepository
    {
        private readonly CiPlatformContext _db;

        public StoryListingRepository(CiPlatformContext db)
        {
            _db = db;
        }

        public List<Story> GetAllStory()
        {
            List<Story> stories = _db.Stories.Include(m => m.User).Include(m => m.StoryMedia).Include(m => m.Mission).Include(m => m.Mission.Theme).Where(s=>s.Status== "PUBLISHED").ToList();
            return stories;
        }

        public int GetStoryCount()
        {
            return _db.Stories.Count();
        }

    }
}
