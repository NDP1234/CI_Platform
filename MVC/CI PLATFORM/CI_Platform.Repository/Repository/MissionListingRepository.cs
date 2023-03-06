using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Repository.Interface;
using CI_Platform.Entities.Models.VM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace CI_Platform.Repository.Repository
{
    public class MissionListingRepository : IMissionListingRepository
    {
        private readonly CiPlatformContext _db;

        public MissionListingRepository(CiPlatformContext db)
        {
            _db = db;
        }

        public List<PlatformLandingViewModel> GetAllMission()
        {
            List<Mission> mission = _db.Missions.ToList();
            List<MissionMedium> image = _db.MissionMedia.ToList();
            List<MissionTheme> theme = _db.MissionThemes.ToList();
            List<Country> countries = _db.Countries.ToList();
            List<City> city = _db.Cities.ToList();
            List<Skill> skills = _db.Skills.ToList();
            var Missions = (from m in mission
                            join i in image on m.MissionId equals i.MissionId into data
                            from i in data.DefaultIfEmpty().Take(1)
                            select new PlatformLandingViewModel { image = i, Missions = m, Country = countries, themes = theme, skills = skills }).ToList();
            return Missions;
        }
    }

}
