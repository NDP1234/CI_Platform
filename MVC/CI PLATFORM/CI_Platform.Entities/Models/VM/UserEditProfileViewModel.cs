using System;
using System.Collections.Generic;
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


    }
}
