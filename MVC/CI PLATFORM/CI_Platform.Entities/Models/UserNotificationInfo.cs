using System;
using System.Collections.Generic;

namespace CI_Platform.Entities.Models;

public partial class UserNotificationInfo
{
    public long UserNotificationId { get; set; }

    public long NotificationSettingId { get; set; }

    public long UserId { get; set; }
}
