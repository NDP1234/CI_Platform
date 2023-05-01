using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using Microsoft.EntityFrameworkCore;

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


            List<Mission> mission = _db.Missions.ToList();
            List<MissionMedium> image = _db.MissionMedia.Where(m => m.MediaType != "url").ToList();
            List<MissionTheme> theme = _db.MissionThemes.ToList();
            List<Country> countries = _db.Countries.ToList();
            List<City> city = _db.Cities.ToList();
            List<Skill> skills = _db.Skills.ToList();
            List<MissionSkill> missionSkills = _db.MissionSkills.ToList();
            List<User> users = _db.Users.ToList();
            List<MissionDocument> missionDocuments = _db.MissionDocuments.Where(m => m.MissionId == id).ToList(); // retrieve mission documents based on mission id
            List<MissionApplication> missionApplications = _db.MissionApplications.Where(m => m.UserId != userID && m.MissionId == id).ToList();
            List<MissionInvite> myInvite = _db.MissionInvites.ToList();

            var Missionsdetail = (from m in mission
                                  where m.MissionId.Equals(id)
                                  join i in image on m.MissionId equals i.MissionId into data
                                  join s in missionSkills on m.MissionId equals s.MissionId into data1
                                  from i in data.DefaultIfEmpty().Take(1)
                                  from s in data1.DefaultIfEmpty().Take(1)

                                  select new VolunteeringMissionPageViewModel { image = i, Missions = m, Country = countries, themes = theme, skills = skills, UserDetail = users, isValid = _db.FavouriteMissions.Any(f => f.UserId == userID && f.MissionId == m.MissionId), MissionDocuments = missionDocuments, MissionApplications = missionApplications, MissionInvites = myInvite,
                                      Goalvalue = m.MissionType == "GOAL" ? _db.GoalMissions.Where(g => g.MissionId == m.MissionId).FirstOrDefault().GoalValue : 0,
                                      totalAchieve = (long)_db.Timesheets.Where(t => t.MissionId == m.MissionId && t.Action != null).Sum(t => t.Action)
                                  }).First();


         

            var relatedMissions = _db.Missions.Include(m => m.MissionMedia).Where(m => (m.City.Name == Missionsdetail.Missions.City.Name || m.Theme.Title == Missionsdetail.Missions.Theme.Title) && (m.MissionId != id && m.DeletedAt == null)).Take(3).ToList();




            Missionsdetail.RelatedMissions = relatedMissions;
            return Missionsdetail;

        }



    }
}
