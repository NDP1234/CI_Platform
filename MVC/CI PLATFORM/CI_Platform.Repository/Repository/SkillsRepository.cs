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
    public class SkillsRepository : ISkillsRepository
    {
        private readonly CiPlatformContext _db;

        public SkillsRepository(CiPlatformContext db)
        {
            _db = db;
        }

        public List<Skill> GetSkillDetails()
        {
            List<Skill> skill_details = _db.Skills.Where(ms => ms.DeletedAt == null).ToList();
            return skill_details;
        }


    }
}
