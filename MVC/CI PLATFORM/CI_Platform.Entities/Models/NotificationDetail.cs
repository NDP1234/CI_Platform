using System;
using System.Collections.Generic;

namespace CI_Platform.Entities.Models;

public partial class NotificationDetail
{
    public long NottificationDeatilId { get; set; }

    public long UserId { get; set; }

    public long? MissionId { get; set; }

    public long? StoryId { get; set; }

    public string? NotificationMessage { get; set; }

    public string? Status { get; set; }

    public string? ImagePath { get; set; }

    public long NotificationSettingId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
