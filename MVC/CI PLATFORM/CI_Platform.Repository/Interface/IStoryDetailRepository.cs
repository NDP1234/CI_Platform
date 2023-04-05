using CI_Platform.Entities.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Repository.Interface
{
    public interface IStoryDetailRepository
    {
        public StoryDetailViewModel storyDetailPageInfo(int id, int userId);
    }
}
