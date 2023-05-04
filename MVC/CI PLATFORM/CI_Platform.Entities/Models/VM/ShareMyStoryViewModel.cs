using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Entities.Models.VM
{
    public class ShareMyStoryViewModel
    {
        public List<ForSaveDraft> forSaveDrafts { get; set; }
        public List<ForSubmit> forSubmits { get; set; }
        public class ForSaveDraft
        {
            public long UserId { get; set; }

            public long MissionId { get; set; }
            [Required]
            public string? Title { get; set; }
            [Required]
            public string? Description { get; set; }

            public string Status { get; set; } = null!;
            [Required]
            public DateTime PublishedAt { get; set; }

            public DateTime CreatedAt { get; set; }
            [Required]
            public List<string> paths { get; set; }
            
        }

        public class ForSubmit
        {
            public long UserId { get; set; }

            public long MissionId { get; set; }
      
            public string? Title { get; set; }

            public string? Description { get; set; }

            public string Status { get; set; } = null!;

            public DateTime PublishedAt { get; set; }

            public DateTime CreatedAt { get; set; }
            public bool isStoryExist { get; set; }
            public bool isStoryExistasPublished { get; set; }
        }
    }
}
