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
        List<PlatformLandingViewModel> GetAllMission();

        //10-03
        List<PlatformLandingViewModel> GetMissionSorting(String sort);

    }
}
