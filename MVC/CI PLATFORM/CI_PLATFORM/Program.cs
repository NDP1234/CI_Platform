using CI_Platform.Entities.Data;
using CI_Platform.Repository.Interface;
using CI_Platform.Repository.Repository;
//using CI_PLATFORM.FILTERS;


//using CI_PLATFORM.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(120);
}); 

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<CiPlatformContext>(options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

builder.Services.AddScoped<ICountryRepository, CountryRepository>();
builder.Services.AddScoped<ICityRepository, CityRepository>();
builder.Services.AddScoped<IThemeRepository, ThemeRepository>();
builder.Services.AddScoped<ISkillsRepository, SkillsRepository>();
builder.Services.AddScoped<IMissionListingRepository, MissionListingRepository>();
builder.Services.AddScoped<IUserList, UserList>();
builder.Services.AddScoped<IMissionDetail, MissionDetail>();
builder.Services.AddScoped<IStoryListingRepository, StoryListingRepository>();
builder.Services.AddScoped<IMissionApplicationListingRepository, MissionApplicationListingRepository>();
builder.Services.AddScoped<IStoryDetailRepository, StoryDetailRepository>();
builder.Services.AddScoped<IUserEditProfileRepository, UserEditProfileRepository>();
builder.Services.AddScoped<IVolunteeringTimeSheetRepository, VolunteeringTimeSheetRepository>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
//builder.Services.AddScoped<IsUserProfileValidated>();







var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseSession();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
     //pattern: "{controller=Home}/{action=Index}/{id?}");
     pattern: "{controller=Authentication}/{action=login}");

app.MapControllerRoute(
    name: "Authentication",
    pattern: "{controller=Authentication}/{action=login}");

app.MapControllerRoute(
    name: "Content",
    pattern: "{controller=Content}/{action=Platform_Landing_Page}");
app.MapControllerRoute(
    name: "StoryRelated",
    pattern: "{controller=StoryRelated}/{action=Story_Listing_Page}");
app.MapControllerRoute(
    name: "UserEditProfile",
    pattern: "{controller=UserEditProfile}/{action=UserEditProfilePage}");
app.MapControllerRoute(
    name: "Timesheet",
    pattern: "{controller=Timesheet}/{action=VolunteeringTimesheet}");
app.MapControllerRoute(
    name: "Admin",
    pattern: "{controller=Admin}/{action=AdminDashBoard}");



app.Run();

