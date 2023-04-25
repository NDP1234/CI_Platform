using CI_Platform.Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace CI_PLATFORM.Models.ViewModels
{
    public class ForgotViewModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = null!;
        public List<Banner> BannerList { get; set; } = new List<Banner>();
    }
}

