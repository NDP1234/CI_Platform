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
    public class UserList : IUserList
    {
        private readonly CiPlatformContext _db;

        public UserList(CiPlatformContext db)
        {
            _db = db;
        }

        public List<User> GetUserList()
        {
            List<User> users = _db.Users.ToList();
            return users;

        }
    }
}
