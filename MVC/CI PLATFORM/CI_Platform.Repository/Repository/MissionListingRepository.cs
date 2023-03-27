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
            List<MissionMedium> image = _db.MissionMedia.ToList();
            List<MissionTheme> theme = _db.MissionThemes.ToList();
            List<Country> countries = _db.Countries.ToList();
            List<City> city = _db.Cities.ToList();
            List<Skill> skills = _db.Skills.ToList();
            List<MissionSkill> missionSkills = _db.MissionSkills.ToList();
            List<User> users = _db.Users.ToList();
            var Missions = (from m in mission
                                //join S in missionSkills on m.MissionId equals S.MissionId
                            join i in image on m.MissionId equals i.MissionId into data
                            from i in data.DefaultIfEmpty().Take(1)
                            select new PlatformLandingViewModel { image = i, Missions = m, Country = countries, themes = theme, skills = skills, isValid = _db.FavouriteMissions.Any(f => f.UserId == userId && f.MissionId == m.MissionId) }).ToList();
            return Missions;
        }


        //public List<PlatformLandingViewModel> GetMissionSorting(string sort)
        //{
        //    List<PlatformLandingViewModel> missionsortdata = GetAllMission();


        //    if (sort == "newest")
        //    {
        //        return missionsortdata.OrderByDescending(m => m.Missions.CreatedAt).ToList();
        //    }
        //    else if (sort == "oldest")
        //    {
        //        return missionsortdata.OrderBy(m => m.Missions.CreatedAt).ToList();
        //    }
        //    else if (sort == "seats_asc")
        //    {
        //        return missionsortdata.OrderByDescending(m => m.Missions.SeatsVacancy).ToList();
        //    }
        //    else if (sort == "seats_desc")
        //    {
        //        return missionsortdata.OrderBy(m => m.Missions.SeatsVacancy).ToList();
        //    }
        //    else if (sort == "deadline")
        //    {
        //        return missionsortdata.OrderByDescending(m => m.Missions.EndDate).ToList();
        //    }
        //    else
        //    {
        //        return missionsortdata.OrderByDescending(m => m.Missions.CreatedAt).ToList();
        //    }
        //}

        //14-03
        public List<PlatformLandingViewModel> GetMissionSorting(string sort, List<PlatformLandingViewModel> finalMission)
        {
            //List<PlatformLandingViewModel> missionsortdata = GetAllMission();


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
                return finalMission.OrderByDescending(m => m.Missions.EndDate).ToList();
            }
            else
            {
                //return finalMission.OrderByDescending(m => m.Missions.CreatedAt).ToList();
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
                        finalMission = (List<PlatformLandingViewModel>)finalMission.Concat(missionBySkill);
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


        //public List<PlatformLandingViewModel> GetItemsBySearchString(int themeid)
        //{

        //    List<PlatformLandingViewModel> missionthemedata = GetAllMission();
        //    return missionthemedata.Where(m => m.Missions.ThemeId == themeid).ToList();
        //}
    }
}
