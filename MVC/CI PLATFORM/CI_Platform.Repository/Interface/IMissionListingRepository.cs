using CI_Platform.Entities.Models.VM;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CI_Platform.Entities.Data;
using CI_Platform.Repository.Interface;



namespace CI_Platform.Repository.Interface
{
    public interface IMissionListingRepository
    {
        List<PlatformLandingViewModel> GetAllMission(int userId);

        
        List<PlatformLandingViewModel> GetMissionSorting(String sort, List<PlatformLandingViewModel> finalMission);

        public List<PlatformLandingViewModel> GetFilterData(int userId, string[] country, string[] city, string[] theme, string[] skill, string sort);
        public List<PlatformLandingViewModel> ExploreData(string ExploreBasedOnVal, int userId);
    }
}
