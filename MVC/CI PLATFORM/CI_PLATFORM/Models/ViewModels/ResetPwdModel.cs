using System.ComponentModel.DataAnnotations;

namespace CI_PLATFORM.Models.ViewModels
{
    public class ResetPwdModel
    {

        public string ConfirmPassword { get; set; }
        public string email { get; set; }
        public string Token { get; set; }

        [Required, DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [Required, DataType(DataType.Password)]
        [Compare("NewPassword")]


        public bool IsSuccess { get; set; }

    }
}
