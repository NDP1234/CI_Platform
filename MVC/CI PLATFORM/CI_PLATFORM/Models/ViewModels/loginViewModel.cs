using CI_Platform.Entities.Models;
using System.ComponentModel.DataAnnotations;


namespace CI_PLATFORM.Models.ViewModels
{
    public class loginViewModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        //[Password(ErrorMessage = "Invalid Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;

        public List<Banner> BannerList { get; set; } = new List<Banner>();
    }
}
