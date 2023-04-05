//for displaying header in mobile view
// -----------------------------------------------------------------------------------------------------------------
function openNav() {
    document.getElementById("mySidebar1").style.width = "250px";
    document.getElementById("main1").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar1").style.width = "0";
    document.getElementById("main1").style.marginLeft = "0";
}
function openNav2() {
    document.getElementById("mySidebar2").style.width = "250px";
    document.getElementById("main2").style.marginLeft = "250px";
}

function closeNav2() {
    document.getElementById("mySidebar2").style.width = "0";
    document.getElementById("main2").style.marginLeft = "0";
}




//for displaying details of user from database
$(document).ready(function () {
    

    var userid = $('#UserName').data('user-id');

    $.ajax({
        url: '/UserEditProfile/getuserprofile',
        type: 'get',
        data: { userid: userid },
        success: function (data) {
            
            if (data)
            {
                console.log(data);
                $('#userProfile').attr('src', data.avatar);
                var uname = data.firstName + ' ' + data.lastName;
                $('#UserName').text(uname);
                $('#nameInput').val(data.firstName);
                $('#surnameInput').val(data.lastName);
                $('#EmployeeIdInput').val(data.employeeId);
                $('#TitleInput').val(data.title);
                $('#DepartmentInput').val(data.department);
                $('#MyProfileTextarea').val(data.profileText);
                $('#WhyIVolunteerTextarea').val(data.whyIVolunteer);
                $('#LinkedInInput').val(data.linkedInUrl);
                $('#CountryInput').val(data.countryId).prop('selected', true);
                $('#cityInput').val(data.cityId).prop('selected', true);

            }
            else {
                console.log("No data found");
            }

        },
        error: function () {

            alert(' error in getting response');

        }

    });
});
   
