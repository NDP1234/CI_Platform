using System.ComponentModel.DataAnnotations;

namespace CI_PLATFORM.Models.ViewModels
{
    public class ResetPwdModel
    {

        public string email { get; set; }
        public string Token { get; set; }

        [Required, DataType(DataType.Password)]
 
        public string NewPassword { get; set; }

        [Compare("NewPassword")]
        public string ConfirmPassword { get; set; }

        public DateTime CreatedAt { get; set; }

        //[Required, DataType(DataType.Password)]



        //public bool IsSuccess { get; set; }

    }
}
