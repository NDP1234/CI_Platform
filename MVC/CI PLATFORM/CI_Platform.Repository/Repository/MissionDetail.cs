using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using Microsoft.AspNetCore.Http;
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
        public VolunteeringMissionPageViewModel GetMissionDetaiil(int id, int userID)
        {
            
            //var userId = 
            List<Mission> mission = _db.Missions.ToList();
            List<MissionMedium> image = _db.MissionMedia.ToList();
            List<MissionTheme> theme = _db.MissionThemes.ToList();
            List<Country> countries = _db.Countries.ToList();
            List<City> city = _db.Cities.ToList();
            List<Skill> skills = _db.Skills.ToList();
            List<MissionSkill> missionSkills = _db.MissionSkills.ToList();
            List<User> users = _db.Users.ToList();
            List<MissionDocument> missionDocuments = _db.MissionDocuments.Where(m => m.MissionId == id).ToList(); // retrieve mission documents based on mission id
            List<MissionApplication> missionApplications = _db.MissionApplications.Where(m =>m.UserId!=userID && m.MissionId == id).ToList();


            var Missionsdetail = (from m in mission
                                  where m.MissionId.Equals(id)
                                  join i in image on m.MissionId equals i.MissionId into data
                                  join s in missionSkills on m.MissionId equals s.MissionId into data1
                                  from i in data.DefaultIfEmpty().Take(1)
                                  from s in data1.DefaultIfEmpty().Take(1)
                                  
                                  select new VolunteeringMissionPageViewModel { image = i, Missions = m, Country = countries, themes = theme, skills = skills,UserDetail = users, isValid = _db.FavouriteMissions.Any(f => f.UserId == userID && f.MissionId == m.MissionId), MissionDocuments = missionDocuments, MissionApplications =missionApplications }).First();

;
            var relatedMissions = _db.Missions
            .Where(m => (m.City.Name == Missionsdetail.Missions.City.Name || m.Theme.Title == Missionsdetail.Missions.Theme.Title) && m.MissionId != id)
            .Join(_db.MissionMedia, m => m.MissionId, i => i.MissionId, (m, i) => new { Mission = m, Image = i })
            .ToList();


            Missionsdetail.RelatedMissions = relatedMissions.Select(x => x.Mission).ToList();
            return Missionsdetail;

        }



    }
}
