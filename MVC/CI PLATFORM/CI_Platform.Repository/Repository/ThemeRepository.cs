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
    public class ThemeRepository: IThemeRepository
    {
        private readonly CiPlatformContext _db;

        public ThemeRepository(CiPlatformContext db)
        {
            _db = db;
        }

        public List<MissionTheme> GetThemeDetails()
        {
            List<MissionTheme> mission_details = _db.MissionThemes.Where(mt=>mt.DeletedAt==null).ToList();
            return mission_details;
        }
    }
}
