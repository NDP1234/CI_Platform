using System;
using System.Collections.Generic;

namespace CI_Platform.Entities.Models;

public partial class NotificationSetting
{
    public long NotificationSettingId { get; set; }

    public string? NotificationName { get; set; }

    public virtual ICollection<UserNotificationInfo> UserNotificationInfos { get; } = new List<UserNotificationInfo>();
}
