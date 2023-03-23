using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
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
            var data = _db.MissionApplications
                .Where(m => m.UserId == userId)
                .Select(m => m.Mission)
                .ToList();
            return data;
        }
    }
}
