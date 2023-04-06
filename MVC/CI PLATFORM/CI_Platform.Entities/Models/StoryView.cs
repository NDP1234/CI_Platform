using System;
using System.Collections.Generic;

namespace CI_Platform.Entities.Models;

public partial class StoryView
{
    public long StoryViewId { get; set; }

    public long UserId { get; set; }

    public long StoryId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }
}
