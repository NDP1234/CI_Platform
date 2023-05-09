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

        public List<PlatformLandingViewModel> GetAllMission(int userId)
        {
            List<Mission> mission = _db.Missions.ToList();
            List<MissionMedium> image = _db.MissionMedia.Where(md => md.MediaType != "url").ToList();
            List<MissionTheme> theme = _db.MissionThemes.ToList();
            List<Country> countries = _db.Countries.ToList();
            List<City> city = _db.Cities.ToList();
            List<Skill> skills = _db.Skills.ToList();
            List<MissionSkill> missionSkills = _db.MissionSkills.ToList();
            List<User> users = _db.Users.ToList();
            bool missionApplications ;
            var Missions = (from m in mission
                            where m.DeletedAt == null
                            join i in image on m.MissionId equals i.MissionId into data
                            from i in data.DefaultIfEmpty().Take(1)
                            join r in _db.MissionRatings on m.MissionId equals r.MissionId into ratings
                            let avgRating = ratings.Any() ? ratings.Average(r => r.Rating) : 0
                            select new PlatformLandingViewModel
                            {
                                image = i,
                                Missions = m,
                                Country = countries,
                                themes = theme,
                                skills = skills,
                                isValid = _db.FavouriteMissions.Any(f => f.UserId == userId && f.MissionId == m.MissionId),
                                AvgRating = avgRating,
                                GoalObjectiveText = m.MissionType == "GOAL" ? _db.GoalMissions.Where(g => g.MissionId == m.MissionId).FirstOrDefault().GoalObjectiveText : null,
                                Goalvalue = m.MissionType == "GOAL" ? _db.GoalMissions.Where(g => g.MissionId == m.MissionId).FirstOrDefault().GoalValue : 0,
                                totalAchieve = (long)_db.Timesheets.Where(t => t.MissionId == m.MissionId && t.Action != null).Sum(t => t.Action),
                                missionApplications = _db.MissionApplications.Any(ma => ma.UserId == userId && ma.ApprovalStatus == "APPROVE" && ma.MissionId==m.MissionId)
                            }).ToList();
            return Missions;
        }

        public List<PlatformLandingViewModel> ExploreData(string ExploreBasedOnVal, int userId)
        {
            List<PlatformLandingViewModel> ExploreMission = GetAllMission(userId);
            if (ExploreBasedOnVal == "TopThemes")
            {
                var topThemes = (from m in ExploreMission
                                 from t in m.themes
                                 group m by t into g
                                 orderby g.Count() descending
                                 select g.Key).Take(3).ToList();
                return (from m in ExploreMission
                        where m.themes.Any(t => topThemes.Contains(t))
                        orderby m.AvgRating descending
                        select m).ToList();
            }
            else if (ExploreBasedOnVal == "MostRanked")
            {
                return ExploreMission.OrderByDescending(m => m.AvgRating).ToList();
            }
            else if (ExploreBasedOnVal == "TopFavourite")
            {
                return (from m in ExploreMission
                        join f in _db.FavouriteMissions on m.Missions.MissionId equals f.MissionId into favs
                        orderby favs.Count() descending
                        select m).ToList();
            }
            else if (ExploreBasedOnVal == "Random")
            {
                Random rnd = new Random();
                return ExploreMission.OrderBy(m => rnd.Next()).ToList();
            }
            else
            {
                return ExploreMission;
            }
        }


        public List<PlatformLandingViewModel> GetMissionSorting(string sort, List<PlatformLandingViewModel> finalMission)
        {



            if (sort == "newest")
            {
                return finalMission.OrderByDescending(m => m.Missions.CreatedAt).ToList();
            }
            else if (sort == "oldest")
            {
                return finalMission.OrderBy(m => m.Missions.CreatedAt).ToList();
            }
            else if (sort == "seats_asc")
            {
                return finalMission.OrderByDescending(m => m.Missions.SeatsVacancy).ToList();
            }
            else if (sort == "seats_desc")
            {
                return finalMission.OrderBy(m => m.Missions.SeatsVacancy).ToList();
            }
            else if (sort == "deadline")
            {
                return finalMission.OrderByDescending(m => m.Missions.StartDate.Value.AddDays(-1).ToShortDateString()).ToList();
            }
            else
            {

                return finalMission.ToList();
            }
        }
        public List<PlatformLandingViewModel> GetFilterData(int userId, string[] country, string[] city, string[] theme, string[] skill, string sort)
        {
            var GlobalSort = sort;
            List<PlatformLandingViewModel> filterMission = GetAllMission(userId);
            List<PlatformLandingViewModel> finalMission = new List<PlatformLandingViewModel>();

            if (true)
            {
                if (city.Length != 0 && skill.Length != 0 && country.Length != 0 && skill.Length != 0)
                {
                    foreach (string countryname in country)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string cityname in city)
                        {
                            foreach (string skillname in skill)
                            {
                                foreach (string themename in theme)
                                {
                                    missionByFilter = filterMission.Where(m => (m.Missions.Country.Name == countryname && m.Missions.City.Name == cityname) && (m.Missions.Theme.Title == themename && m.Missions.MissionSkills.Any(x => x.Skill.SkillName == skillname))).ToList();
                                    finalMission = finalMission.Concat(missionByFilter).ToList();
                                }
                            }
                        }
                    }
                }
                else if (country.Length != 0 && city.Length != 0 && skill.Length != 0)
                {
                    foreach (string countryname in country)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string cityname in city)
                        {
                            foreach (string skillname in skill)
                            {
                                missionByFilter = filterMission.Where(m => (m.Missions.Country.Name == countryname && m.Missions.City.Name == cityname) && (m.Missions.MissionSkills.Any(x => x.Skill.SkillName == skillname))).ToList();
                                finalMission = finalMission.Concat(missionByFilter).ToList();
                            }
                        }
                    }
                }
                else if (city.Length != 0 && skill.Length != 0 && theme.Length != 0)
                {
                    foreach (string cityname in city)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string skillname in skill)
                        {
                            foreach (string themename in theme)
                            {
                                missionByFilter = filterMission.Where(m => (m.Missions.City.Name == cityname && (m.Missions.MissionSkills.Any(x => x.Skill.SkillName == skillname) && m.Missions.Theme.Title == themename))).ToList();
                                finalMission = finalMission.Concat(missionByFilter).ToList();
                            }
                        }
                    }
                }
                else if (skill.Length != 0 && theme.Length != 0 && country.Length != 0)
                {
                    foreach (string countryname in country)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string skillname in skill)
                        {
                            foreach (string themename in theme)
                            {
                                missionByFilter = filterMission.Where(m => m.Missions.Country.Name == countryname && (m.Missions.MissionSkills.Any(x => x.Skill.SkillName == skillname) && m.Missions.Theme.Title == themename)).ToList();
                                finalMission = finalMission.Concat(missionByFilter).ToList();
                            }
                        }
                    }
                }
                else if (theme.Length != 0 && country.Length != 0 && city.Length != 0)
                {
                    foreach (string countryname in country)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string cityname in city)
                        {
                            foreach (string themename in theme)
                            {
                                missionByFilter = filterMission.Where(m => (m.Missions.Country.Name == countryname && m.Missions.City.Name == cityname) && m.Missions.Theme.Title == themename).ToList();
                                finalMission = finalMission.Concat(missionByFilter).ToList();
                            }
                        }
                    }

                }
                else if (country.Length != 0 && city.Length != 0)
                {
                    foreach (string countryname in country)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string cityname in city)
                        {
                            missionByFilter = filterMission.Where(m => m.Missions.Country.Name == countryname && m.Missions.City.Name == cityname).ToList();
                            finalMission = finalMission.Concat(missionByFilter).ToList();
                        }
                    }
                }
                else if (country.Length != 0 && skill.Length != 0)
                {
                    foreach (string countryname in country)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string skillname in skill)
                        {
                            missionByFilter = filterMission.Where(m => (m.Missions.Country.Name == countryname && m.Missions.MissionSkills.Any(x => x.Skill.SkillName == skillname))).ToList();
                            finalMission = finalMission.Concat(missionByFilter).ToList();
                        }
                    }
                }
                else if (country.Length != 0 && theme.Length != 0)
                {
                    foreach (string countryname in country)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string themename in theme)
                        {
                            missionByFilter = filterMission.Where(m => m.Missions.Country.Name == countryname && m.Missions.Theme.Title == themename).ToList();
                            finalMission = finalMission.Concat(missionByFilter).ToList();
                        }
                    }
                }
                else if (city.Length != 0 && skill.Length != 0)
                {
                    foreach (string cityname in city)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string skillname in skill)
                        {
                            missionByFilter = filterMission.Where(m => m.Missions.City.Name == cityname && m.Missions.MissionSkills.Any(x => x.Skill.SkillName == skillname)).ToList();
                            finalMission = finalMission.Concat(missionByFilter).ToList();
                        }
                    }
                }
                else if (city.Length != 0 && theme.Length != 0)
                {
                    foreach (string cityname in city)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string themename in theme)
                        {
                            missionByFilter = filterMission.Where(m => m.Missions.City.Name == cityname && m.Missions.Theme.Title == themename).ToList();
                            finalMission = finalMission.Concat(missionByFilter).ToList();
                        }
                    }
                }
                else if (skill.Length != 0 && theme.Length != 0)
                {
                    foreach (string skillname in skill)
                    {
                        List<PlatformLandingViewModel> missionByFilter = new List<PlatformLandingViewModel>();
                        foreach (string themename in theme)
                        {
                            missionByFilter = filterMission.Where(m => m.Missions.MissionSkills.Any(x => x.Skill.SkillName == skillname) && m.Missions.Theme.Title == themename).ToList();
                            finalMission = finalMission.Concat(missionByFilter).ToList();
                        }
                    }
                }
                else if (country.Length != 0)
                {
                    foreach (string countryname in country)
                    {
                        IEnumerable<PlatformLandingViewModel> missionByCountry = filterMission.Where(m => m.Missions.Country.Name == countryname);
                        finalMission = finalMission.Concat(missionByCountry).ToList();
                    }
                }
                else if (city.Length != 0)
                {
                    foreach (string cityname in city)
                    {
                        IEnumerable<PlatformLandingViewModel> missionByCity = filterMission.Where(m => m.Missions.City.Name == cityname);
                        finalMission = (List<PlatformLandingViewModel>)finalMission.Concat(missionByCity);
                    }
                }
                else if (skill.Length != 0)
                {
                    foreach (string skillname in skill)
                    {
                        IEnumerable<PlatformLandingViewModel> missionBySkill = filterMission.Where(m => m.Missions.MissionSkills.Any(x => x.Skill.SkillName == skillname));
                        finalMission = finalMission.Concat(missionBySkill).ToList();
                    }
                }
                else if (theme.Length != 0)
                {
                    foreach (string themename in theme)
                    {
                        IEnumerable<PlatformLandingViewModel> missionByTheme = filterMission.Where(m => m.Missions.Theme.Title == themename).ToList();
                        finalMission = finalMission.Concat(missionByTheme).ToList();
                    }
                }
                else
                {
                    finalMission = finalMission.Concat(filterMission).ToList();
                }
            }
            if (sort == null)
            {
                return finalMission.Distinct().ToList();
            }
            else
            {
                return GetMissionSorting(GlobalSort, finalMission.Distinct().ToList());
            }
        }



    }
}
