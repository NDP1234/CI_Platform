using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Repository.Interface
{
    public interface IMissionApplicationListingRepository
    {
         List<Mission> GetMissionTitlesByUserId(int userId);

        public ShareMyStoryViewModel.ForSaveDraft DraftStory(int userid, int missionid, string title, DateTime publishedAt, string description, string status, List<string> pathlist, string url);
        public ShareMyStoryViewModel.ForSubmit SubmitStory(int userid, int missionid, string title, DateTime publishedAt, string description, string status, string url);
        

    }
}
