
$(document).ready(function () {
    setInterval(function () {
        var now = new Date();
        //for full name of the day of the week
        var day = now.toLocaleString('default', { weekday: 'long' });
        //for full name of the month
        var month = now.toLocaleString('default', { month: 'long' });
        //Get date
        var date = now.getDate();
        //get year
        var year = now.getFullYear();
        //get hour
        var hour = now.getHours();
        //get minute
        var minute = now.getMinutes();
        //for select PM or AM
        var ampm = hour >= 12 ? 'PM' : 'AM';
        //for convert hour in based of 12-hour format
        hour = hour % 12;
        //for displaying 12 instaed of 0 hour
        hour = hour ? hour : 12;
        //for append thw zero if minute is in single digit
        minute = minute < 10 ? '0' + minute : minute;
        //provide required format
        var time = day + ', ' + month + ' ' + date + ', ' + year + ', ' + hour + ':' + minute + ' ' + ampm;
        $('#current-time').text(time);
    }, 1000);
});




$(document).on("click", ".missionApplicationApproved", function () {
    var maID = $(this).data('missionapplication-id');

    $.ajax({
        type: "POST",
        url: "/Admin/ApproveMissionApplication",
        data: {
            MissionApplicationId: maID,
        },
        success: function (data) {
            console.log(data);


            $('.missionApplicationListing').html(data);

            alert(" Mission application is successfully approved");



        },
    })
})


$(document).on("click", ".missionApplicationDeclined", function () {
    var maID = $(this).data('missionapplication-id');

    $.ajax({
        type: "POST",
        url: "/Admin/DeclineMissionApplication",
        data: {
            MissionApplicationId: maID,
        },
        success: function (data) {
            console.log(data);


            $('.missionApplicationListing').html(data);
            alert(" Mission application is successfully Declined");


        },
    })
})

$(document).on("click", ".storyApproved", function () {
    var sID = $(this).data('story-id');

    $.ajax({
        type: "POST",
        url: "/Admin/PublishStory",
        data: {
            StoryId: sID,
        },
        success: function (data) {
            console.log(data);


            $('.StoryListing').html(data);

            alert(" story is sccessfully published");


        },
    })
})


$(document).on("click", ".storyDeclined", function () {
    var sID = $(this).data('story-id');

    $.ajax({
        type: "POST",
        url: "/Admin/DeclineStory",
        data: {
            StoryId: sID,
        },
        success: function (data) {
            console.log(data);


            $('.StoryListing').html(data);

            alert(" story is sccessfully declined ");


        },
    })
})

$('#addthemeBtn').on('click', function () {
    (function () {
        'use strict'


        var forms = document.querySelectorAll('.needs-validation.addthemevalidation')
        console.log(forms);

        Array.prototype.slice.call(forms)
            .forEach(function (form) {

                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')

            })
    })()

    var enteredThemeName = $('#MissionThemeTitle').val();
    var status = $("#myStatusOfTheme option:selected").val();

    console.log(enteredThemeName);
    console.log(status);
    if (enteredThemeName && status) {
        $.ajax({
            type: "POST",
            url: "/Admin/AddMissionTheme",
            data: {
                Title: enteredThemeName,
                status: status,
            },
            success: function (data) {
                console.log(data);

                $('.Missionthemelisting').html(data);
                alert("data is  successfully added");

            },
        })
    }

});

function OpenEditThemeModal(themename, status, themeid) {
    console.log(themename);
    console.log(status);
    console.log(themeid);
    $('#MissionThemeTitle2').val(themename);

    $("#myStatusOfTheme2").val(status);
    $('#EditablethemeBtn').attr('data-missionTheme-id', themeid);

    $('#editMissionThemeModal').modal('show');

}




$(document).on('click', '#EditablethemeBtn', function () {

    var MissionThemeId = $(this).attr('data-missionTheme-id');
    var editedThemeTitle = $(`#MissionThemeTitle2`).val();

    var status = $('#myStatusOfTheme2').val();

    console.log(MissionThemeId);
    console.log(editedThemeTitle);
    console.log(status);

    $.ajax({
        type: "POST",
        url: "/Admin/editMissionTheme",
        data: {
            MissionThemeId: MissionThemeId,
            Title: editedThemeTitle,
            status: status,
        },
        success: function (data) {
            console.log(data);

            $('.Missionthemelisting').html(data);
            alert("Edited data is successfully saved");

        },
    })

})


$('#addSkillBtn').on('click', function () {
    (function () {
        'use strict'


        var forms = document.querySelectorAll('.needs-validation.addskillvalidation')
        console.log(forms);

        Array.prototype.slice.call(forms)
            .forEach(function (form) {

                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')

            })
    })()

    var enteredSkillName = $('#MissionSkillTitle').val();

    var status = $("#myStatus option:selected").val();

    console.log(enteredSkillName);
    console.log(status);
    if (enteredSkillName && status) {
        $.ajax({
            type: "POST",
            url: "/Admin/AddMissionSkill",
            data: {
                Title: enteredSkillName,
                status: status,
            },
            success: function (data) {
                console.log(data);

                $('#missionskillPartialView').html(data);
                alert("data is  successfully added");

            },
        })
    }

});





function OpenEditSkillModal(skillname, status, skillid) {
    console.log(skillname);
    console.log(status);
    console.log(skillid)
    $('#MissionSkillTitle2').val(skillname);

    $("#myStatus2").val(status);
    $('#EditSkillBtn').attr('data-skill-id', skillid);


    $('#editMissionSkillModal').modal('show');

}

$(document).on('click', '#EditSkillBtn', function () {

    var SkillId = $(this).attr('data-skill-id');
    var editedSkillTitle = $(`#MissionSkillTitle2`).val();


    var selectedValue = $('#myStatus2').val();



    console.log(SkillId);
    console.log(editedSkillTitle);
    console.log(selectedValue);

    $.ajax({
        type: "POST",
        url: "/Admin/editMissionSkill",
        data: {
            SkillId: SkillId,
            Title: editedSkillTitle,
            status: selectedValue,
        },
        success: function (data) {
            console.log(data);

            $('#missionskillPartialView').html(data);
            alert("Edited data is successfully saved");

        },
    })

})





$(document).on("click", ".editUserModal", function () {

    var userId = $(this).attr('data-user-id');

    console.log(userId);

    $(`#editUserDetailModal-${userId}`).modal("show");

})


$(document).on('click', '.deleteMissionSkill', function () {
    var skillId = $(this).attr('mission-skill-id')

    $.ajax({
        type: "POST",
        url: "/Admin/deleteMissionSkill",
        data: {
            skillId: skillId
        },
        success: function (data) {
            console.log(data);

            $('#missionskillPartialView').html(data);
            alert(" data is successfully deleted");

        },
    })
})

$(document).on('click', '.deleteMissionTheme', function () {
    var themeId = $(this).attr('data-missionTheme-id')

    $.ajax({
        type: "POST",
        url: "/Admin/deleteMissionTheme",
        data: {
            themeId: themeId
        },
        success: function (data) {
            console.log(data);

            $('.Missionthemelisting').html(data);
            alert(" data is successfully deleted");

        },
    })
})

$(document).on('click', '.deleteStory', function () {
    var storyid = $(this).attr('data-story-id')

    $.ajax({
        type: "POST",
        url: "/Admin/deleteStory",
        data: {
            StoryId: storyid
        },
        success: function (data) {
            console.log(data);

            $('.StoryListing').html(data);
            alert(" data is successfully deleted");

        },
    })
})

$('#addCMS').on('click', function () {
    $.ajax({
        url: "/Admin/_CMSAddPage",
        success: function (data) {
            $('.cmscontent').html(data);
        }
    })
})



$(document).on('click', "#CMSAdd", function () {
    var Cmstitle = $('#cmstitle').val();
    var description = CKEDITOR.instances.editor1.editable().getText();
    var slug = $('#cmsSlug').val();
    var selectedValue = $('#myStatusOfCMS').val();
    console.log(Cmstitle);
    console.log(description);
    console.log(slug);
    console.log(selectedValue);
    $.ajax({
        type: "POST",
        url: "/Admin/AddCmsDetails",
        data: {
            Title: Cmstitle,
            Description: description,
            Slug: slug,
            Status: selectedValue
        },
        success: function (data) {
            $('.cmsdata').html(data);
            alert(" data is successfully added");
        }
    })
})

function editCmms(Title, Status, CmsPageId, Description, Slug) {

    console.log(Title);
    console.log(Status);
    console.log(CmsPageId);
    console.log(Description);
    console.log(Slug);
    $.get("/Admin/_CMSEditPage", function (data) {
        $('.cmscontent').html(data);
        $('#cmstitle2').val(Title);
        $('#myStatusOfCMS2').val(Status);
        $('.mydescription').text(Description);
        $('#cmsSlug2').val(Slug);
        $('#EditBtnForCmsPage').attr('data-cms-id', CmsPageId);


    }) 
    $(document).on('click', '#EditBtnForCmsPage', function () {

        var editedTitle = $('#cmstitle2').val();
       
        var editedDescription = CKEDITOR.instances.CMSeditor2.editable().getText();
        var editedSlug = $('#cmsSlug2').val();
        var editedStatus = $('#myStatusOfCMS2').val();
        var cmsid = $(this).attr('data-cms-id');
        console.log(editedTitle)
        console.log(editedDescription)
        console.log(editedSlug)
        console.log(editedStatus)
        console.log(cmsid)
        $.ajax({
            type: "POST",
            url: "/Admin/EditCmsDetails",
            data: {
                CMSPageId: cmsid,
                Title: editedTitle,
                Description: editedDescription,
                Slug: editedSlug,
                Status: editedStatus
            },
            success: function (data) {
                
                alert("Edited data is successfully saved");
            }
        })
    })

   
}

$(document).on('click', '#DeleteBtnForCmsPage', function () {
    var cmspageid = $(this).attr('data-cms-id');
    console.log(cmspageid);
    $.ajax({
        type: "POST",
        url: "/Admin/DeleteCmsDetails",
        data: {
            CMSPageId: cmspageid
        },
        success: function (data) {
            $('.cmsdata').html(data);
            alert(" data is successfully deleted");
        }
    })
})



$('#Country').on('change', function () {
    var countryId = $(this).val(); // get the selected country id
    $('#City').empty(); // clear the city dropdown

    // make an AJAX request to get cities for the selected country
   /* $('#selectedCity').remove();*/
    $.ajax({
        url: '/Admin/GetCitiesForCountry',
        type: 'POST',
        dataType: 'json',
        data: { countryId: countryId },
        success: function (data) {
            console.log(data);
            // populate the city dropdown with the returned data
            $('#cityInput').empty();

            $.each(data, function (i, city) {
                $('#City').append($('<option>').attr('value', city.cityId).text(city.name));
            });

            //Select the city based on the city ID retrieved from data
            //var cityId = $('#cityInput').data('city-id');
            //if (cityId) {
            //    $('#cityInput').val(cityId);
            //}
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        }
    });
});

$(document).ready(function () {
    $('#myemail').on('blur', function () {
        var email = $(this).val();
        $.ajax({
            type: 'POST',
            url: '/Admin/CheckEmailExistence',
            data: { email: email },
            success: function (data) {
                if (!data) {
                    alert('Email already exists!');
                }
            }
        });
    });
});

$(document).on('click', '#AddUserBtn', function () {
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation.adduservalidation')
        console.log(forms);
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {

                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')

            })
    })()

    var firstName = $('#myFirstName').val();
    var LastName = $('#myLastName').val();
    var email = $('#myemail').val();
    var pwd = $('#myPwd').val();
    var EmpId = $('#EmpId').val();
    var CountryId = $('#Country').val();
    var CityId = $('#City').val();
    var ProfText = $('#pText').val();
    var Department = $('#Department').val();
    var Status = $('#Status').val();

    console.log(firstName);
    console.log(LastName);
    console.log(email);
    console.log(pwd);
    console.log(EmpId);
    console.log(CountryId);
    console.log(CityId);
    console.log(ProfText);
    console.log(Department);
    console.log(Status);

    if (pwd.length < 8) {
        $('#pwdValid').removeClass('d-none');
    }
    

    if (firstName && LastName && email && pwd.length > 8 && EmpId && CountryId && CityId && ProfText && Department && Status){
        $.ajax({
            type: "POST",
            url: "/Admin/AddUser",
            data: {
                firstName: firstName,
                LastName: LastName,
                email: email,
                pwd: pwd,
                EmpId: EmpId,
                CountryId: CountryId,
                CityId: CityId,
                ProfText: ProfText,
                Department: Department,
                Status: Status
            },
            success: function (data) {
                console.log(data);
                $('.userlist').html(data);
                alert(" data is successfully added");

            },
        })
    }


})



const togglePassword = document
    .querySelector('#togglePassword');

const password = document.querySelector('#myPwd');

togglePassword.addEventListener('click', () => {

    // Toggle the type attribute using
    // getAttribure() method
    const type = password
        .getAttribute('type') === 'password' ?
        'text' : 'password';

    password.setAttribute('type', type);

    // Toggle the eye and bi-eye icon
    this.classList.toggle('bi-eye');
});