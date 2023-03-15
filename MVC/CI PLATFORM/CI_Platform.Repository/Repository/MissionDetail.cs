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
    public class MissionDetail : IMissionDetail
    {
        private readonly CiPlatformContext _db;

        public MissionDetail(CiPlatformContext db)
        {
            _db = db;
        }
        public VolunteeringMissionPageViewModel GetMissionDetaiil(int id)
        {   
            List<Mission> mission = _db.Missions.ToList();
            List<MissionMedium> image = _db.MissionMedia.ToList();
            List<MissionTheme> theme = _db.MissionThemes.ToList();
            List<Country> countries = _db.Countries.ToList();
            List<City> city = _db.Cities.ToList();
            List<Skill> skills = _db.Skills.ToList();
            List<MissionSkill> missionSkills = _db.MissionSkills.ToList();
            var Missionsdetail = (from m in mission
                                  where m.MissionId.Equals(id)
                                  //join S in missionSkills on m.MissionId equals S.MissionId
                                  join i in image on m.MissionId equals i.MissionId into data
                                  from i in data.DefaultIfEmpty().Take(1)
                                  select new VolunteeringMissionPageViewModel { image = i, Missions = m, Country = countries, themes = theme, skills = skills }).First();
            return Missionsdetail;
        }
    }
}

