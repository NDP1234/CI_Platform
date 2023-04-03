
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Repository.Interface
{

    public interface IStoryListingRepository
    {
        List<Story> GetAllStory();
        int GetStoryCount();
    }

}
