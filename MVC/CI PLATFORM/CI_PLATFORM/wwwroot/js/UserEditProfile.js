﻿//for displaying header in mobile view
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





function cascading() {
    // when the country dropdown is changed
    $('#CountryInput').on('change', function () {
        var countryId = $(this).val(); // get the selected country id
        $('#cityInput').empty(); // clear the city dropdown
        
        // make an AJAX request to get cities for the selected country
        $('#selectedCity').remove();
        $.ajax({
            url: '/UserEditProfile/GetCitiesForCountry',
            type: 'POST',
            dataType: 'json',
            data: { countryId: countryId },
            success: function (data) {
                // populate the city dropdown with the returned data
                $('#cityInput').empty();

                $.each(data, function (i, city) {
                    $('#cityInput').append($('<option>').attr('value', city.cityId).text(city.name));
                });

                 //Select the city based on the city ID retrieved from data
                var cityId = $('#cityInput').data('city-id');
                if (cityId) {
                    $('#cityInput').val(cityId);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
            }
        });
    });
}

$(document).ready(function () {
    var userid = $('#UserName').data('user-id');
    cascading();
    $.ajax({
        url: '/UserEditProfile/getuserprofile',
        type: 'get',
        data: { userid: userid },
        success: function (data) {
            if (data) {
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
                cascading();
                $('#CountryInput').val(data.countryId).prop('selected', true);
              
                $('#cityInput').val(data.cityId).prop('selected', true); // Set city ID as data attribute

                

                var userSkillList = data.userSkills;
                var skillList = $(".skilllist ul");

                $.each(userSkillList, function (i, skill) {
                    var li = $("<li>").text(skill.skillName).attr("data-skillid", skill.skillId);
                    skillList.append(li);
                });
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





//for adding skills


// Add click event handlers to the skills in the skill container
$(".skillcontainer .border").click(function () {
    // Remove any previous selection
    $(".skillcontainer .border.selected").removeClass("selected");

    // Highlight the selected skill
    $(this).addClass("selected");
});


// Add click event handlers to the arrow buttons
$("#rightArrow").click(function () {
    // Check if a skill is selected
    var selectedSkill = $(".skillcontainer .border.selected");
    if (selectedSkill.length > 0) {
        // Clone the selected skill and append it to the selected skill container
        var clonedSkill = selectedSkill.clone();
        clonedSkill.removeClass("selected");
        $(".selectedskillcontainer").append(clonedSkill);
    }

    // Add click event handlers to the skills in the selected skill container
    $(".selectedskillcontainer .border").click(function () {
        // Remove any previous selection
        $(".selectedskillcontainer .border.selected").removeClass("selected");
        $(".skillcontainer .border.selected").removeClass("selected");
        // Highlight the selected skill
        $(this).addClass("selected");
    });


    $("#leftArrow").click(function () {
        // Check if a skill is selected in the selected skill container
        var selectedSelectedSkill = $(".selectedskillcontainer .border.selected");
        if (selectedSelectedSkill.length > 0) {
            // Remove the selected skill from the selected skill container
            selectedSelectedSkill.remove();
        }
    });

});


//when user clicks on save button it is displayed in list
    $(document).ready(function () {
        $(".SaveBtn").click(function () {
            var selectedSkills = "";
            $(".selectedskillcontainer .border").each(function () {
                var skillName = $(this).text();
                selectedSkills += "<li class='list-group-item'>" + skillName + "</li>";
            });
            $(".list-group").append(selectedSkills);
        });
    });


//when user saves the modal at a time modal will disappear
var saveBtn = document.querySelector('.SaveBtn');

// Add a click event listener to the "Save" button
saveBtn.addEventListener('click', function () {
    // Get the modal element
    var modalEl = document.getElementById('skillmodal');

    // Close the modal
    var modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
});

