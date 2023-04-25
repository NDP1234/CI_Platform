using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CI_Platform.Entities.Models.VM;

namespace CI_Platform.Repository.Interface
{
    public interface IMissionDetail
    {
        public VolunteeringMissionPageViewModel GetMissionDetaiil(int id, int userID);

        
    }
}
