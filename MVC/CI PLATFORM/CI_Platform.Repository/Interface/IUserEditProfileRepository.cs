using CI_Platform.Entities.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Repository.Interface
{
    public interface IUserEditProfileRepository
    {
        public UserEditProfileViewModel GetUserInfo(int userid);
        public UserEditProfileViewModel getCountryAndCityList();
        public void saveUserDetails(int userid, UserEditProfileViewModel myUserModel);
        public bool UpdatePwd(int uid, UserEditProfileViewModel mychangePwdModel);
        public bool saveContactUsDetails(string username, string useremail, string subject, string message);
    }
}
