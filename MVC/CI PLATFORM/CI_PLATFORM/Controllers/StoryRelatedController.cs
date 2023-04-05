using CI_Platform.Entities.Data;
using CI_Platform.Entities.Models;
using CI_Platform.Entities.Models.VM;
using CI_Platform.Repository.Interface;
using CI_Platform.Repository.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Net;
using System.Net.Mail;

namespace CI_PLATFORM.Controllers;


public class StoryRelatedController : Controller
{
    private readonly IUserList _users;
    private readonly CiPlatformContext _db;
    private readonly IStoryListingRepository _db2;
    private readonly IMissionApplicationListingRepository _listingRepository;
    private readonly IStoryDetailRepository _sd;
    public StoryRelatedController(IUserList users, CiPlatformContext db, IStoryListingRepository db2, IMissionApplicationListingRepository listingRepository, IStoryDetailRepository sd)
    {
        _users = users;
        _db = db;
        _db2 = db2;
        _listingRepository = listingRepository;
        _sd = sd;
    }


    public IActionResult Story_Listing_Page(int page = 1)
    {
        var session_details = HttpContext.Session.GetString("Login");
        if (session_details == null)
        {
            return RedirectToAction("login", "Authentication");
        }

        const int PageSize = 6;

        List<User> users = _users.GetUserList();
        var profile = users.FirstOrDefault(m => m.Email == session_details);
        ViewBag.UserDetails = profile;

        int storyCount = _db2.GetStoryCount();
        int totalPages = (int)Math.Ceiling((double)storyCount / PageSize);

        StoryViewModel storymodel = new StoryViewModel();
        storymodel.Stories = _db2.GetAllStory().Skip((page - 1) * PageSize).Take(PageSize);
        storymodel.User = _db.Users;
        storymodel.MissionThemes = _db.MissionThemes;
        storymodel.CurrentPage = page;
        storymodel.TotalPages = totalPages;

        return View(storymodel);
    }


    public IActionResult Share_Your_Story_Page()
    {
        var session_details = HttpContext.Session.GetString("Login");
        if (session_details == null)
        {
            return RedirectToAction("login", "Authentication");
        }
        List<User> users = _users.GetUserList();
        var profile = users.FirstOrDefault(m => m.Email == session_details);
        ViewBag.UserDetails = profile;
        int userId = (int)profile.UserId;
        List<Mission> missionTitles = _listingRepository.GetMissionTitlesByUserId(userId);
        return View(missionTitles);

    }

    [HttpPost]
    public IActionResult DraftStory(int userid, int missionid, string title, DateTime publishedAt, string description, string status, List<string> pathlist, string url)
    {
        var draft = _listingRepository.DraftStory(userid, missionid, title, publishedAt, description, status, pathlist, url);
        return Ok(new { message = "Draft stored successfully." });
    }

    [HttpPost]
    public IActionResult SubmitStory(int userid, int missionid, string title, DateTime publishedAt, string description, string status, string url)
    {
        var submit = _listingRepository.SubmitStory(userid, missionid, title, publishedAt, description, status, url);
        return Ok();
    }

    //for appear or disappear perticular buttons
    [HttpGet]
    public IActionResult isStoryExist(int userId, int missionId)
    {
        var result = _db.Stories.FirstOrDefault(r => r.MissionId == missionId && r.UserId == userId);

        if (result == null)
        {
            return View();
        }
        var storystatus = new Story()
        {
            StoryId = result.StoryId,
            UserId = result.UserId,
            MissionId = result.MissionId,
            Title = result.Title,
            Description = result.Description,
            Status = result.Status
        };


        return Ok(storystatus);

    }

    //for returning data to ajax if story is saved as draft
    [HttpGet]

    public IActionResult GetStoryDraft(int missionId, int userId)
    {
        List<Story> stories = _db.Stories.ToList();
        List<StoryMedium> storyMedia = _db.StoryMedia.ToList();

        var story = (from s in stories
                     where (s.MissionId == missionId && s.UserId == userId && s.Status == "DRAFT")
                     join m in storyMedia on s.StoryId equals m.StoryId into data
                     select new ShareMyStoryViewModel.ForSaveDraft
                     {
                         paths = data.Select(m => m.Path).ToList(),
                         Title = s.Title,
                         Description = s.Description,
                         Status = s.Status,
                         UserId = s.UserId,
                         MissionId = s.MissionId,
                         PublishedAt = s.CreatedAt,

                     }).ToList();

        return Json(story);

    }


    public IActionResult Story_detail_page(int id)
    {
        var session_details = HttpContext.Session.GetString("Login");
        if (session_details == null)
        {
            return RedirectToAction("login", "Authentication");
        }
        List<User> users = _users.GetUserList();
        var profile = users.FirstOrDefault(m => m.Email == session_details);
        ViewBag.UserDetails = profile;
        int userId = (int)profile.UserId;
        StoryDetailViewModel storyDetailViewModel = _sd.storyDetailPageInfo(id, userId);

        return View(storyDetailViewModel);
    }

    //for recommandation to co-worker
    public void RecommandToCoWorker(string Recommanded)
    {
        var parseObject = JObject.Parse(Recommanded);
        var uStoryId = parseObject.Value<long>("SId");
        var uId = parseObject.Value<long>("Uid");
        var SessionUId = parseObject.Value<long>("FromUid");
        var EmailAdd = parseObject.Value<string>("Uemail");
        var recObj = new StoryInvite()
        {
            StoryId = uStoryId,
            FromUserId = SessionUId,
            ToUserId = uId,
        };
        if (EmailAdd != null)
        {
            var MissionDetailLink = Url.Action("Story_detail_page", "StoryRelated", new { id = uStoryId }, Request.Scheme);


            _db.StoryInvites.Add(recObj);
            _db.SaveChanges();
            EmailSend(EmailAdd, MissionDetailLink);
        }
    }

    //for sending email to co-worker
    public IActionResult EmailSend(string Email, string MissionDetailLink)
    {
        var recommandedLink = MissionDetailLink;

        var fromEmail = new MailAddress("niravdpatel632@gmail.com");
        var toEmail = new MailAddress(Email);
        var fromEmailPassword = "hflzawnzmsaqrkrj";
        string subject = "Recommandation For Story";
        string body = recommandedLink;

        var smtp = new SmtpClient
        {

            Host = "smtp.gmail.com",
            Port = 587,
            EnableSsl = true,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
        };

        MailMessage message = new MailMessage(fromEmail, toEmail);
        message.Subject = subject;
        message.Body = body;
        message.IsBodyHtml = true;
        smtp.Send(message);
        return Ok();
    }

    public IActionResult previewstorydata(int id)
    {
        var session_details = HttpContext.Session.GetString("Login");
        if (session_details == null)
        {
            return RedirectToAction("login", "Authentication");
        }
        List<User> users = _users.GetUserList();
        var profile = users.FirstOrDefault(m => m.Email == session_details);
        ViewBag.UserDetails = profile;
        int userId = (int)profile.UserId;

        int storyId = (int)_db.Stories.Where(s => s.MissionId == id && s.UserId == userId).Select(s => s.StoryId).FirstOrDefault();

        return RedirectToAction("Story_detail_page", new { id = storyId });

    }
}


