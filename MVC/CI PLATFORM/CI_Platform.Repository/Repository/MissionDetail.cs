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
            List<MissionDocument> misdoc = _db.MissionDocuments.ToList();


            var Missionsdetail = (from m in mission
                                  where m.MissionId.Equals(id)
                                  join i in image on m.MissionId equals i.MissionId into data
                                  join s in missionSkills on m.MissionId equals s.MissionId into data1
                                  join d in misdoc on m.MissionId equals d.MissionId into data2
                                  from i in data.DefaultIfEmpty().Take(1)
                                  from s in data1.DefaultIfEmpty().Take(1)
                                  from d in data2.DefaultIfEmpty().Take(1)
                                  select new VolunteeringMissionPageViewModel { image = i, Missions = m, Country = countries, themes = theme, skills = skills,UserDetail = users,/* DocumentType = d.DocumentType ,DocumentName = d.DocumentName, DocumentPath=d.DocumentPath,*/ isValid = _db.FavouriteMissions.Any(f => f.UserId == userID && f.MissionId == m.MissionId)    }).First();

;
            var relatedMissions = _db.Missions
            .Where(m => (m.City.Name == Missionsdetail.Missions.City.Name || m.Theme.Title == Missionsdetail.Missions.Theme.Title) && m.MissionId != id)
            .Join(_db.MissionMedia, m => m.MissionId, i => i.MissionId, (m, i) => new { Mission = m, Image = i })
            .ToList();

            var relatedDocuments = _db.Missions.Join(_db.MissionDocuments, m => m.MissionId, j => j.MissionId, (m, j) => new { Missison = m, MissionDocuments = j })
            .ToList();

            Missionsdetail.RelatedMissions = relatedMissions.Select(x => x.Mission).ToList();
            Missionsdetail.MissionRelatedDoc = relatedDocuments.Select(x => x.MissionDocuments).ToList();

            return Missionsdetail;

        }



    }
}

