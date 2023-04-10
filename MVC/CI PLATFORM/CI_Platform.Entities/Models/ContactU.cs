using System;
using System.Collections.Generic;

namespace CI_Platform.Entities.Models;

public partial class ContactU
{
    public long ContactUsId { get; set; }

    public string UserName { get; set; } = null!;

    public string UserEmailId { get; set; } = null!;

    public string Subject { get; set; } = null!;

    public string Message { get; set; } = null!;
}
