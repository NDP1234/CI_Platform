using CI_Platform.Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace CI_PLATFORM.Models.ViewModels
{
    public class ResetPwdModel
    {

        public string email { get; set; }
        public string Token { get; set; }

        [Required, DataType(DataType.Password)]
        [MinLength(8, ErrorMessage = "Password must contain minimum 8 characters  ")]
        public string NewPassword { get; set; }

        [Compare("NewPassword")]
        [MinLength(8, ErrorMessage = "Password must contain minimum 8 characters  ")]
        public string ConfirmPassword { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<Banner> BannerList { get; set; } = new List<Banner>();
    }
}
