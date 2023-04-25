using CI_Platform.Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace CI_PLATFORM.Models.ViewModels
{
    public class RegistrationViewModel
    {
        [Required(ErrorMessage = "First name is required")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = null!;


        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must contain minimum 8 characters  ")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;

        [Required(ErrorMessage = "Phone number is required")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Confirm password is required")]
        [MinLength(8, ErrorMessage = "Password must contain minimum 8 characters  ")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; }

        public List<Banner> BannerList { get; set; } = new List<Banner>();
    }
}
