using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Entities.Models.VM
{
    public class UserEditProfileViewModel
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }
        public string Password { get; set; } = null!;
        public string? Avatar { get; set; }
        public string? WhyIVolunteer { get; set; }

        public string? EmployeeId { get; set; }

        public string? Department { get; set; }
        public string? ProfileText { get; set; }

        public string? LinkedInUrl { get; set; }

        public string? Title { get; set; }

        public List<Country> countries{ get; set; }
        public List<City> cities{ get; set; }

        public long CountryId { get; set; }
        public long CityId { get; set; }

        
        public string OldPassword { get; set; } = null!;
       
        public string NewPassword { get; set; } = null!;
        
        public string ConfirmPassword { get; set; } = null!;
        
        public long ContactUsId { get; set; }

        public string UserName { get; set; } = null!;

        public string UserEmailId { get; set; } = null!;

        public string Subject { get; set; } = null!;

        public string Message { get; set; } = null!;
        
        public List<UserSkillViewModel> userSkills { get; set; } = new List<UserSkillViewModel>(); 

        public class UserSkillViewModel
        {
            public long SkillId { get; set; }
            public string SkillName { get; set; }
        }
        

        public List<Skill> Skills { get; set; }

        public string skillIds { get; set; }
    }
}
