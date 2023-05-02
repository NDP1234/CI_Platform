//for displaying date on top
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



//for approve the mission Application
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
            forMissionApplicationPagenation();
            //alert(" Mission application is successfully approved");
            toastr.success(' Mission application is successfully approved');



        },
    })
})

//for decline the mission Application
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
            forMissionApplicationPagenation();
            //alert(" Mission application is successfully Declined");
            toastr.success('Mission application is successfully Declined');



        },
    })
})


//for approve the story
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
            forStoryPagenation();
            //alert(" story is sccessfully published");
            toastr.success(' story is sccessfully published');

        },
    })
})

//for decline the story
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
            forStoryPagenation();
            /*   alert(" story is sccessfully declined ");*/
            toastr.success(' story is sccessfully declined');

        },
    })
})

//for add the theme
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
                $('#closeAddTheme').click();
                $('.DataTablesId').DataTable().destroy();
                $('.Missionthemelisting').html(data);

                //LoadDataTable();
                //alert("data is  successfully added");
                /*toastr.success(' data is  successfully added');*/
                $('#MissionThemeTitle').val(''); // Clear enteredThemeName input field
                $("#myStatusOfTheme").prop('selectedIndex', 0); // Reset the status dropdown to the first option
                $('.needs-validation.addthemevalidation').removeClass('was-validated'); // Remove the validation message

                forMissionThemePagenation();



            },
        })
    }

});






//for open the modal for edit the Theme
function OpenEditThemeModal(themename, status, themeid) {
    console.log(themename);
    console.log(status);
    console.log(themeid);
    $('#MissionThemeTitle2').val(themename);

    $("#myStatusOfTheme2").val(status);
    $('#EditablethemeBtn').attr('data-missionTheme-id', themeid);

    $('#editMissionThemeModal').modal('show');

}



//for save the edited theme
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
            $('#closeEditTheme').click();
            $('.Missionthemelisting').html(data);
            //alert("Edited data is successfully saved");
            toastr.success(' Edited data is successfully saved');

            forMissionThemePagenation();
        },
    })

})

//for add the skill
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
                $('#closeAddSkill').click();
                $('#missionskillPartialView').html(data);
                //alert("data is  successfully added");

                //toastr.success(' data is  successfully added');
                $('#MissionSkillTitle').val(''); // Clear enteredThemeName input field
                $("#myStatus").prop('selectedIndex', 0); // Reset the status dropdown to the first option
                $('.needs-validation.addskillvalidation').removeClass('was-validated'); // Remove the validation message

                forMissionSkillPagenation();



            },
        })
    }

});




//for open the modal for edit the skill
function OpenEditSkillModal(skillname, status, skillid) {
    console.log(skillname);
    console.log(status);
    console.log(skillid)
    $('#MissionSkillTitle2').val(skillname);

    $("#myStatus2").val(status);
    $('#EditSkillBtn').attr('data-skill-id', skillid);


    $('#editMissionSkillModal').modal('show');

}
//for save the edited skill
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
            $('#closeEditSkill').click();
            $('#missionskillPartialView').html(data);
            //alert("Edited data is successfully saved");
            toastr.success(' Edited data is successfully saved');
            forMissionSkillPagenation();
        },
    })

})


////for delete skill
$(document).on('click', '.deleteMissionSkill', function () {
    var skillId = $(this).attr('mission-skill-id');

    // show a toaster confirm before deleting the data
    Swal.fire({
        title: 'Are you sure?',
        text: 'You would not be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // if the user confirms, delete the data
            $.ajax({
                type: "POST",
                url: "/Admin/deleteMissionSkill",
                data: {
                    skillId: skillId
                },
                success: function (data) {
                    console.log(data);
                    $('#missionskillPartialView').html(data);
                    forMissionSkillPagenation();
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    );
                },
            });
        }
    });
});


//for delete the theme
$(document).on('click', '.deleteMissionTheme', function () {
    var themeId = $(this).attr('data-missionTheme-id')

    Swal.fire({
        title: 'Are you sure?',
        text: 'You would not be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url: "/Admin/deleteMissionTheme",
                data: {
                    themeId: themeId
                },
                success: function (data) {
                    console.log(data);

                    $('.Missionthemelisting').html(data);
                    forMissionThemePagenation();
                    //alert(" data is successfully deleted");
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    );
                },
            })
        }
    });
});

//for delete the story
$(document).on('click', '.deleteStory', function () {
    var storyid = $(this).attr('data-story-id')


    Swal.fire({
        title: 'Are you sure?',
        text: 'You would not be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {


            $.ajax({
                type: "POST",
                url: "/Admin/deleteStory",
                data: {
                    StoryId: storyid
                },
                success: function (data) {
                    console.log(data);

                    $('.StoryListing').html(data);
                    //alert(" data is successfully deleted");
                    forStoryPagenation();
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    );
                },
            })
        }
    });
});

//for getting _CMSAddPage partial view

$(document).on('click', '#addCMS2', function () {
    console.log("clicked");
    $.ajax({
        url: "/Admin/_CMSAddPage",
        success: function (data) {
            $('.cmsdetailcontent').html(data);

        }
    })
})


$(document).on('click', '.CMSBack', function () {
    $.ajax({
        type: "POST",
        url: "/Admin/_CMSPage",
        success: function (data) {

            $('.cmsdetailcontent').html(data);
            forCmsPagenation();
        }
    })
})


//for add the cms detail
$(document).on('click', "#CMSAdd", function () {
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation.addcmsvalidation')
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

    var Cmstitle = $('#cmstitle').val();
    var description = CKEDITOR.instances.editor1.getData();
    var slug = $('#cmsSlug').val();
    var selectedValue = $('#myStatusOfCMS').val();
    console.log(Cmstitle);
    console.log(description);
    console.log(slug);
    console.log(selectedValue);
    if (Cmstitle && slug && selectedValue) {
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
                $('.cmsdetailcontent').html(data);
                //alert(" data is successfully added");
                toastr.success('data is successfully saved');

                forCmsPagenation();

            }
        })
    }

})


//for edit the cms detail
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
        /* CKEDITOR.instances.CMSeditor2.setData(Description);*/

        $('#cmsSlug2').val(Slug);
        $('#EditBtnForCmsPage').attr('data-cms-id', CmsPageId);


    })
    $(document).on('click', '#EditBtnForCmsPage', function () {

        (function () {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation.editcmsvalidation')
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


        var editedTitle = $('#cmstitle2').val();

        var editedDescription = CKEDITOR.instances.CMSeditor2.editable().getData();
        var editedSlug = $('#cmsSlug2').val();
        var editedStatus = $('#myStatusOfCMS2').val();
        var cmsid = $(this).attr('data-cms-id');
        console.log(editedTitle)
        console.log(editedDescription)
        console.log(editedSlug)
        console.log(editedStatus)
        console.log(cmsid)

        if (editedTitle && editedDescription != '' && editedSlug && editedStatus && cmsid) {
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

                    $('.cmsdetailcontent').html(data);

                    toastr.options.preventDuplicates = true;
                    toastr.success(' Edited data is successfully saved');
                    //alert("Edited data is successfully saved");

                    forCmsPagenation();

                }
            })
        }

    })


}

//for delete the cms detail
$(document).on('click', '#DeleteBtnForCmsPage', function () {

    var cmspageid = $(this).attr('data-cms-id');
    console.log(cmspageid);

    Swal.fire({
        title: 'Are you sure?',
        text: 'You would not be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url: "/Admin/DeleteCmsDetails",
                data: {
                    CMSPageId: cmspageid
                },
                success: function (data) {
                    $('.cmsdetailcontent').html(data);
                    /*alert(" data is successfully deleted");*/
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    );
                    forCmsPagenation();
                }
            })
        }
    });
});

//for cascading dropdown
$('#Country').on('change', function () {
    var countryId = $(this).val(); // get the selected country id
    $('#City').empty(); // clear the city dropdown

    // make an AJAX request to get cities for the selected country

    $.ajax({
        url: '/Admin/GetCitiesForCountry',
        type: 'POST',
        dataType: 'json',
        data: { countryId: countryId },
        success: function (data) {
            console.log(data);
            // populate the city dropdown with the returned data
            $('#cityInput').empty();
            $('#City').append($('<option>').val('').text('Select City').prop('disabled', true).prop('selected', true));
            $.each(data, function (i, city) {
                $('#City').append($('<option>').attr('value', city.cityId).text(city.name));
            });
        },
        error: function (xhr, textStatus, errorThrown) {

            console.log(xhr.responseText);
        }
    });
});

//for alert if email already exist
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

//for add the user
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
    var phone = $('#phonenumber').val();
    var profilepic = $('#userProfile').attr('src');
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
    console.log(phone);
    console.log(profilepic);

    if (!/^\d{10}$/.test(phone)) {
        // Display error message
        $('#phonenumber2').addClass('is-invalid');
        $('#phonenumber2').siblings('.invalid-feedback').text('Please enter a valid 10 digit phone number.');
        return; // Stop further execution
    } else {
        // Remove any existing error messages
        $('#phonenumber2').removeClass('is-invalid');
        $('#phonenumber2').siblings('.invalid-feedback').text('');
    }


    if (pwd.length < 8) {
        $('#pwdValid').removeClass('d-none');
    }


    if (firstName && LastName && email && pwd.length > 8 && EmpId && CountryId && CityId && ProfText && Department && Status && phone) {
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
                Status: Status,
                PhoneNumber: phone,
                Avatar: profilepic
            },
            success: function (data) {
                console.log(data);
                $('#addUserCloseBtn').click();
                $('.userlist').html(data);
                forUserPagenation();
                //alert(" data is successfully added");
                toastr.success(' data is successfully saved');
                $('#myFirstName').val('');
                $('#myLastName').val('');
                $('#myemail').val('');
                $('#myPwd').val('');
                $('#EmpId').val('');
                $('#Country').prop('selectedIndex', 0);
                $('#City').prop('selectedIndex', 0);
                $('#pText').val('');
                $('#Department').val('');
                $('#Status').val('');
                $('#phonenumber').val('');
                $('#userProfile').attr('src', '/profileImg/NicePng_watsapp-icon-png_9332131.png');
                $('.needs-validation.adduservalidation').removeClass('was-validated'); // Remove the validation message
                $('#pwdValid').removeClass('d-block');
            },
        })
    }


})


//for open the modal for edit user detail
function OpenEditUserModal(UserId, FirstName, LastName, Email, Password, EmployeeId, CountryId, CityId, ProfileText, Department, Status, PhoneNumber, Avatar) {

    $('#UserSaveChangesBtn').attr('data-user-id', UserId);
    $('#myFirstName2').val(FirstName);
    $('#myLastName2').val(LastName);
    $('#myemail2').val(Email);
    $('#myPwd2').val(Password);
    $('#EmpId2').val(EmployeeId);
    $('#Country2').val(CountryId);

    $.ajax({
        type: "POST",
        url: '/Admin/citiesBasedOnCountryForUser',
        data: {
            CountryId: CountryId
        },
        success: function (cities) {
            console.log(cities);

            $('#City2').empty();

            $('#City2').append($('<option>').val('').text('Select City').disabled);

            cities.forEach(function (city) {
                $('#City2').append($('<option>').val(city.cityId).text(city.name));
            });
            //Select the existing city if it exists in the list of cities
            if (CityId && cities.find(function (city) { return city.id == CityId })) {
                $('#City2').val(CityId);
            }

        }
    });

    //$('#City2').val(CityId);
    $('#pText2').val(ProfileText);
    $('#Department2').val(Department);
    $('#Status2').val(Status);
    $('#phonenumber2').val(PhoneNumber);
    $('#userProfile2').attr('src', Avatar);
    $('#editUserDetailModal').modal('show');

}

//for save edited detail of user
$(document).on('click', '#UserSaveChangesBtn', function () {

    var userId = $(this).attr('data-user-id');
    var FirstName = $(`#myFirstName2`).val();
    var LastName = $(`#myLastName2`).val();
    var Email = $(`#myemail2`).val();
    var Password = $(`#myPwd2`).val();
    var EmployeeId = $(`#EmpId2`).val();
    var CountryId = $(`#Country2`).val();
    var CityId = $(`#City2`).val();
    var ProfileText = $(`#pText2`).val();
    var Department = $(`#Department2`).val();
    var Status = $(`#Status2`).val();
    var PhoneNumber = $(`#phonenumber2`).val();
    var Avatar = $(`#userProfile2`).attr('src');

    if (!/^\d{10}$/.test(PhoneNumber)) {
        // Display error message
        $('#phonenumber2').addClass('is-invalid');
        $('#phonenumber2').siblings('.invalid-feedback').text('Please enter a valid 10 digit phone number.');
        return; // Stop further execution
    } else {
        // Remove any existing error messages
        $('#phonenumber2').removeClass('is-invalid');
        $('#phonenumber2').siblings('.invalid-feedback').text('');
    }


    console.log(userId);
    console.log(FirstName);
    console.log(LastName);
    console.log(Email);
    console.log(Password);
    console.log(EmployeeId);
    console.log(CountryId);
    console.log(CityId);
    console.log(ProfileText);
    console.log(Department);
    console.log(Status);
    console.log(PhoneNumber);
    console.log(Avatar);
    if (userId && FirstName && LastName && Email && Password && EmployeeId && CountryId && CityId && ProfileText && Department && Status && PhoneNumber && Avatar) {
        $.ajax({
            type: "POST",
            url: "/Admin/SaveEditedUser",
            data: {
                userId: userId,
                FirstName: FirstName,
                LastName: LastName,
                Email: Email,
                Password: Password,
                EmployeeId: EmployeeId,
                CountryId: CountryId,
                CityId: CityId,
                ProfileText: ProfileText,
                Department: Department,
                Status: Status,
                PhoneNumber: PhoneNumber,
                Avatar: Avatar,
            },
            success: function (data) {
                console.log(data);
                $('#editUserCloseBtn').click();
                $('.userlist').html(data);
                forUserPagenation();
                //alert(" edited data is successfully saved");
                toastr.success(' Edited data is successfully saved');
            },
        })
    }


})

//for delete the user details
$(document).on('click', '.deleteUserBtn', function () {
    var userId = $(this).attr('data-user-id');

    Swal.fire({
        title: 'Are you sure?',
        text: 'You would not be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url: "/Admin/deleteUser",
                data: {
                    UserId: userId
                },
                success: function (data) {
                    console.log(data);

                    $('.userlist').html(data);
                    forUserPagenation();
                    //alert(" data is successfully deleted");
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    );
                },
            })
        }
    });
});

//for cascading dropdown
$('#Country2').on('change', function () {
    var countryId = $(this).val(); // get the selected country id
    $('#City2').empty(); // clear the city dropdown

    // make an AJAX request to get cities for the selected country
    $.ajax({
        url: '/Admin/GetCitiesForCountry',
        type: 'POST',
        dataType: 'json',
        data: { countryId: countryId },
        success: function (data) {
            console.log(data);
            // populate the city dropdown with the returned data
            $('#cityInput').empty();

            $('#City2').append($('<option>').val('').text('Select City').prop('disabled', true).prop('selected', true));

            $.each(data, function (i, city) {
                $('#City2').append($('<option>').attr('value', city.cityId).text(city.name));
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        }
    });
});

//for cascading dropdown
$('#MissionCountry').on('change', function () {
    var countryId = $(this).val(); // get the selected country id
    $('#MissionCity').empty(); // clear the city dropdown

    // make an AJAX request to get cities for the selected country
    $.ajax({
        url: '/Admin/GetCitiesForCountry',
        type: 'POST',
        dataType: 'json',
        data: { countryId: countryId },
        success: function (data) {
            console.log(data);

            $('#MissionCity').append($('<option>').val('').text('Select City').prop('disabled', true).prop('selected', true));

            $.each(data, function (i, city) {
                $('#MissionCity').append($('<option>').attr('value', city.cityId).text(city.name));
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        }
    });
});

//for cascading dropdown
$('#MissionCountry2').on('change', function () {
    var countryId = $(this).val(); // get the selected country id
    $('#MissionCity2').empty(); // clear the city dropdown

    // make an AJAX request to get cities for the selected country
    $.ajax({
        url: '/Admin/GetCitiesForCountry',
        type: 'POST',
        dataType: 'json',
        data: { countryId: countryId },
        success: function (data) {
            console.log(data);

            $('#MissionCity2').append($('<option>').val('').text('Select City').prop('disabled', true).prop('selected', true));

            $.each(data, function (i, city) {
                $('#MissionCity2').append($('<option>').attr('value', city.cityId).text(city.name));
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        }
    });
});


//for display the password
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


const togglePassword2 = document
    .querySelector('#togglePassword2');

const password2 = document.querySelector('#myPwd2');

togglePassword2.addEventListener('click', () => {

    // Toggle the type attribute using
    // getAttribure() method
    const type = password2
        .getAttribute('type') === 'password' ?
        'text' : 'password';

    password2.setAttribute('type', type);

    // Toggle the eye and bi-eye icon
    this.classList.toggle('bi-eye');
});


//for add mission
$(document).on('click', '#AddMissionDetailBtn', function () {

    (function () {
        'use strict'


        var forms = document.querySelectorAll('.needs-validation.addMissionDetailsValidate')
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

    var MissionTitle = $('#MyMissionTitle').val();
    var ShortDescription = $('#sDescription').val();
    //var Description = CKEDITOR.instances.Missioneditor.editable().getText();
    var Description = CKEDITOR.instances.Missioneditor.getData();

    var CountryId = $('#MissionCountry').val();
    var CityId = $('#MissionCity').val();
    var OrganisationName = $('#OrganisationName').val();
    var Missiontype = $('#MissionType').val();
    var MisStartDate = $('#MisStartDate').val();
    var MisEndDate = $('#MisEndDate').val();
    var Organizationdetails = $('#Organizationdetails').val();
    var TotalSeats = $('#TotalSeats').val();
    var MisRegEndDate = $('#MisRegEndDate').val();
    var MissionTheme = $('#MissionThemedata').val();
    var myAvailability = $('#myAvailability').val();
    var VideoUrl = $('#VideoUrl2').val();
    var imgpathlist = selectedImagesBase64;
    var docpathlist = selectedDocsBase64;
    var goaltext = $('#goaltext').val();
    var GoalValue = $('#GoalValue').val();
    var selectedSkills = [];

    $('.themeDropdown').each(function () {
        if ($(this).is(':checked')) {
            selectedSkills.push($(this).attr('id'));
        }
    });

    var selectedMissionSkill = selectedSkills;
    console.log(MissionTitle)
    console.log(ShortDescription)
    console.log(Description)
    console.log(CountryId)
    console.log(CityId)
    console.log(OrganisationName)
    console.log(Missiontype)
    console.log(MisStartDate)
    console.log(MisEndDate)
    console.log(Organizationdetails)
    console.log(TotalSeats)
    console.log(MisRegEndDate)
    console.log(MissionTheme)
    console.log(myAvailability)
    console.log(VideoUrl)
    console.log(imgpathlist)
    console.log(docpathlist)
    console.log(selectedMissionSkill)
    console.log(goaltext)
    console.log(GoalValue)

    var startDate = new Date($('#MisStartDate').val());
    var endDate = new Date($('#MisEndDate').val());

    // Compare the dates
    if (startDate >= endDate) {
        // Show error message and add "is-invalid" class to date fields
        $('#MisStartDate, #MisEndDate').addClass('is-invalid').siblings('.invalid-feedback').text('Please select valid start and end date');

        // Disable submit button
        $('#submitBtn').prop('disabled', true);

        // Prevent form submission
        e.preventDefault();
    } else {
        // Hide error message and remove "is-invalid" class from date fields
        $('#MisStartDate, #MisEndDate').removeClass('is-invalid').siblings('.invalid-feedback').text('');

        // Enable submit button
        $('#submitBtn').prop('disabled', false);
    }


    if (MissionTitle && ShortDescription && Description && CountryId && CityId && OrganisationName && Missiontype && MisStartDate && MisEndDate && Organizationdetails && MissionTheme && myAvailability && imgpathlist.length > 0 && docpathlist.length>0 && selectedMissionSkill) {
        $.ajax({
            type: "POST",
            url: "/Admin/SaveMission",
            data: {
                MissionTitle: MissionTitle,
                ShortDescription: ShortDescription,
                Description: Description,
                CountryId: CountryId,
                CityId: CityId,
                OrganisationName: OrganisationName,
                Missiontype: Missiontype,
                MisStartDate: MisStartDate,
                MisEndDate: MisEndDate,
                Organizationdetails: Organizationdetails,
                TotalSeats: TotalSeats,
                MisRegEndDate: MisRegEndDate,
                MissionTheme: MissionTheme,
                myAvailability: myAvailability,
                VideoUrl: VideoUrl,
                imgpathlist: imgpathlist,
                docpathlist: docpathlist,
                selectedMissionSkill: selectedMissionSkill,
                goaltext: goaltext,
                GoalValue: GoalValue

            },
            success: function (data) {
                console.log(data);
                $('#addMissionCloseBtn').click();
                $('.missionList').html(data);
                forMissionPagenation();
                //alert("  data is successfully saved");
                toastr.success(' data is successfully saved');

                $('#MyMissionTitle').val('');
                $('#sDescription').val('');
                CKEDITOR.instances.Missioneditor.editable().setText('');
                $('#MissionCountry').prop('selectedIndex', 0);
                $('#MissionCity').prop('selectedIndex', 0);
                $('#OrganisationName').val('');
                $('#MissionType').prop('selectedIndex', 0);
                $('#MisStartDate').val('');
                $('#MisEndDate').val('');
                $('#Organizationdetails').val('');
                $('#TotalSeats').val('');
                $('#MisRegEndDate').val('');
                $('#MissionThemedata').val('');
                $('#myAvailability').prop('selectedIndex', 0);
                $('#VideoUrl2').val('');

                $('#goaltext').val('');
                $('#GoalValue').val('');
                $('.themeDropdown').each(function () {
                    if ($(this).is(':checked')) {
                        $(this).prop('checked', false);
                    }
                });



            },
        })
    }


})

//for getting missiondata and open filled modal
var paths = [];
var docs = [];
$(document).on('click', '.EditMissionDetailBtn', function () {
    var missionId = $(this).attr('data-mission-id');
    console.log(missionId);




    $.ajax({
        type: 'POST',
        url: '/Admin/getMissionData',
        data: {
            MissionId: missionId,
        },

        success: function (data) {
            console.log(data);

            $('#editMissionDetailModal').modal('show');


            $('#MyMissionTitle2').val(data.title);
            $('#sDescription2').val(data.shortDescription);
            //CKEDITOR.instances.Missioneditoreditable.editable().setText(data.description);
            CKEDITOR.instances.Missioneditoreditable.setData(data.description);
            $("#OrganisationName2").val(data.organizationName);
            $('#MissionType2').val(data.missionType);
            var startdate = data.startDate;
            var enddate = data.endDate;
            $('#MisStartDate2').val(formatedate(startdate));
            $('#MisEndDate2').val(formatedate(enddate));
            $('#Organizationdetails2').val(data.organizationDetail);
            $('#TotalSeats2').val(data.seatsVacancy);
            $('#goaltext2').val(data.goalObjectiveText);
            $('#GoalValue2').val(data.goalValue);
            $('#MissionThemedata2').val(data.themeId);
            $('#myAvailability2').val(data.availability);
            $('#MissionCountry2').val(data.countryId);
            $('#VideoUrl2').val(data.url);
            var CityId = data.cityId;
            //for displaying citylist on the basis of country and select the city on the basis of city exist in db
            $.ajax({
                type: "POST",
                url: '/Admin/citiesBasedOnCountryForUser',
                data: {
                    CountryId: data.countryId
                },
                success: function (cities) {
                    console.log(cities);

                    $('#MissionCity2').empty();

                    $('#MissionCity2').append($('<option>').val('').text('Select City').disabled);

                    cities.forEach(function (city) {
                        $('#MissionCity2').append($('<option>').val(city.cityId).text(city.name));
                    });
                    //Select the existing city if it exists in the list of cities
                    if (CityId && cities.find(function (city) { return city.cityid == CityId })) {
                        $('#MissionCity2').val(CityId);
                    }

                }
            });

            //$('#MissionCity2').val(data.cityId);
            $('#VideoUrl2').val(data.url);
            $('.SaveChangesForMission').attr('data-mission-id', data.missionId)
            var imagelist = data.missionMediums;
            var doclist = data.missionDocuments;
            paths = imagelist;
            docs = doclist;
            var imagesHtml = '';
            for (var i = 0; i < paths.length; i++) {
                imagesHtml += '<div class="selectedImageItem"><img src="' + paths[i] + '" /><span class="removeImageIcon" data-index="' + i + '">x</span></div>';

            }
            $(".selectedImageEditable").html(imagesHtml);

            var dochtml = '';
            for (var j = 0; j < docs.length; j++) {
                dochtml += '<div class="selectedDocitem"><a href=' + docs[j] + '>document</a><span class="removeDocIcon" data-index="' + j + '">x</span></div>';
            }
            $(".selectedDoceditable").html('<div class="selectedDoceditable">' + dochtml + '</div>');



            var skillIds = data.missionSkills;


            $('.skilldropdown2').each(function () {
                var checkbox = $(this);
                var skillId = parseInt(checkbox.attr('id'));
                if (skillIds.includes(skillId)) {
                    checkbox.prop('checked', true);
                }
            });


        },

    })
})
$(document).on('click', '.removeImageIcon', function () {
    var index = $(this).data('index');
    paths.splice(index, 1); // Remove the element from the array
    $(this).closest('.selectedImageItem').remove(); // Remove the corresponding image tag
    console.log(paths);
});
$(document).on('click', '.removeDocIcon', function () {
    var index = $(this).data('index');
    docs.splice(index, 1); // Remove the element from the array
    $(this).closest('.selectedDocitem').remove(); // Remove the corresponding image tag
    console.log(docs);
});

//for save edited mission detail
$(document).on('click', '.SaveChangesForMission', function () {
    var MissionId = $(this).attr('data-mission-id');
    (function () {
        'use strict'


        var forms = document.querySelectorAll('.needs-validation.editMissionDetailsValidate')
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

    var MissionTitle = $('#MyMissionTitle2').val();
    var ShortDescription = $('#sDescription2').val();
    //var Description = CKEDITOR.instances.Missioneditoreditable.editable().getText();
    var Description = CKEDITOR.instances.Missioneditoreditable.getData();
    var CountryId = $('#MissionCountry2').val();
    var CityId = $('#MissionCity2').val();
    var OrganisationName = $('#OrganisationName2').val();
    var Missiontype = $('#MissionType2').val();
    var MisStartDate = $('#MisStartDate2').val();
    var MisEndDate = $('#MisEndDate2').val();
    var Organizationdetails = $('#Organizationdetails2').val();
    var TotalSeats = $('#TotalSeats2').val();
    var MisRegEndDate = $('#MisRegEndDate2').val();
    var MissionTheme = $('#MissionThemedata2').val();
    var myAvailability = $('#myAvailability2').val();
    var VideoUrl = $('#VideoUrl2').val();
    var imgpathlist = selectedImagesBase64Editable.concat(paths);
    var docpathlist = selectedDocsBase64Editable.concat(docs);
    var goaltext = $('#goaltext2').val();
    var GoalValue = $('#GoalValue2').val();
    var selectedSkills = [];

    $('.skilldropdown2').each(function () {
        if ($(this).is(':checked')) {
            selectedSkills.push($(this).attr('id'));
        }
    });

    var selectedMissionSkill = selectedSkills;
    console.log(MissionTitle)
    console.log(ShortDescription)
    console.log(Description)
    console.log(CountryId)
    console.log(CityId)
    console.log(OrganisationName)
    console.log(Missiontype)
    console.log(MisStartDate)
    console.log(MisEndDate)
    console.log(Organizationdetails)
    console.log(TotalSeats)
    console.log(MisRegEndDate)
    console.log(MissionTheme)
    console.log(myAvailability)
    console.log(VideoUrl)
    console.log(imgpathlist)
    console.log(docpathlist)
    console.log(selectedMissionSkill)
    console.log(goaltext)
    console.log(GoalValue)
    if (imgpathlist.length > 0 && docpathlist.length > 0) {
        $.ajax({
            type: "POST",
            url: "/Admin/SaveEditedMission",
            data: {
                MissionId: MissionId,
                MissionTitle: MissionTitle,
                ShortDescription: ShortDescription,
                Description: Description,
                CountryId: CountryId,
                CityId: CityId,
                OrganisationName: OrganisationName,
                Missiontype: Missiontype,
                MisStartDate: MisStartDate,
                MisEndDate: MisEndDate,
                Organizationdetails: Organizationdetails,
                TotalSeats: TotalSeats,
                MisRegEndDate: MisRegEndDate,
                MissionTheme: MissionTheme,
                myAvailability: myAvailability,
                VideoUrl: VideoUrl,
                imgpathlist: imgpathlist,
                docpathlist: docpathlist,
                selectedMissionSkill: selectedMissionSkill,
                goaltext: goaltext,
                GoalValue: GoalValue

            },
            success: function (data) {
                console.log(data);
                $('#editMissionCloseBtn').click();
                $('.missionList').html(data);
                forMissionPagenation();
                //alert("  data is successfully saved");
                toastr.success(' Edited data is successfully saved');

            },
        })
    }




})

//for delete mission
$(document).on('click', '#DeleteBtnForMission', function () {
    var MissionId = $(this).attr('data-mission-id');
    Swal.fire({
        title: 'Are you sure?',
        text: 'You would not be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "/Admin/DeleteMissionDetails",
                data: {
                    MissionId: MissionId
                },
                success: function (data) {
                    $('.missionList').html(data);
                    forMissionPagenation();
                   /* alert(" data is successfully deleted");*/
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    );
                }
            })
        }
    });
});

//for formating a date
function formatedate(datetime) {
    const inputDateStr = datetime;
    const date = new Date(inputDateStr);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const outputDateStr = `${year}-${month}-${day}`;
    console.log(outputDateStr);
    return outputDateStr;

}


// Get references to the form fields
const missionTypeSelect = document.getElementById("MissionType");
const goalText = document.getElementById("goaltext");
const goalValue = document.getElementById("GoalValue");
const totalSeats = document.getElementById("TotalSeats");
const regDeadline = document.getElementById("MisRegEndDate");

// Disable all fields initially
goalText.disabled = true;
goalValue.disabled = true;
totalSeats.disabled = true;
regDeadline.disabled = true;

// Listen for changes on the mission type select element
missionTypeSelect.addEventListener("change", () => {
    // Enable/disable fields based on the selected value
    if (missionTypeSelect.value === "GOAL") {
        goalText.disabled = false;
        goalValue.disabled = false;
        totalSeats.disabled = true;
        regDeadline.disabled = true;
    } else if (missionTypeSelect.value === "TIME") {
        goalText.disabled = true;
        goalValue.disabled = true;
        totalSeats.disabled = false;
        regDeadline.disabled = false;
    } else {
        // If the selected value is neither "GOAL" nor "TIME", disable all fields
        goalText.disabled = true;
        goalValue.disabled = true;
        totalSeats.disabled = true;
        regDeadline.disabled = true;
    }
})


// Get references to the form fields
const missionTypeSelect2 = document.getElementById("MissionType2");
const goalText2 = document.getElementById("goaltext2");
const goalValue2 = document.getElementById("GoalValue2");
const totalSeats2 = document.getElementById("TotalSeats2");
const regDeadline2 = document.getElementById("MisRegEndDate2");

// Disable all fields initially
goalText2.disabled = true;
goalValue2.disabled = true;
totalSeats2.disabled = true;
regDeadline2.disabled = true;

// Listen for changes on the mission type select element
missionTypeSelect2.addEventListener("change", () => {
    // Enable/disable fields based on the selected value
    if (missionTypeSelect2.selected.value === "GOAL") {
        goalText2.disabled = false;
        goalValue2.disabled = false;
        totalSeats2.disabled = true;
        regDeadline2.disabled = true;
    } else if (missionTypeSelect2.selected.value === "TIME") {
        goalText2.disabled = true;
        goalValue2.disabled = true;
        totalSeats2.disabled = false;
        regDeadline2.disabled = false;
    } else {
        // If the selected value is neither "GOAL" nor "TIME", disable all fields
        goalText2.disabled = true;
        goalValue2.disabled = true;
        totalSeats2.disabled = true;
        regDeadline2.disabled = true;
    }
})


//for sending selected image of banner to server
$(document).ready(function () {
    // Handle file input change event
    $("#fileInputBanner").on("change", function (event) {
        var file = event.target.files[0];

        // Create form data object to send file to server
        var formData = new FormData();
        formData.append("file", file);

        // Send file to server using AJAX
        $.ajax({
            type: "POST",
            url: "/Admin/SaveBannerImage",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                // Display uploaded image
                $(".selectedImage").html("<img src='" + response + "' class='BannerImage' height='400px' width='400px' />");
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
            }
        });
    });
});
//for sending selected image of banner to server
$(document).ready(function () {
    // Handle file input change event
    $("#fileInputBannereditable").on("change", function (event) {
        var file = event.target.files[0];

        // Create form data object to send file to server
        var formData = new FormData();
        formData.append("file", file);

        // Send file to server using AJAX
        $.ajax({
            type: "POST",
            url: "/Admin/SaveBannerImage",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                // Display uploaded image
                $(".selectedImageEditable").html("<img src='" + response + "' class='BannerImageEditable' height='400px' width='400px' />");
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
            }
        });
    });
});

//for save banner details
$(document).on('click', "#SaveBanner", function () {

    (function () {
        'use strict'


        var forms = document.querySelectorAll('.needs-validation.addbannervalidation')
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

    var Text = $('#myText').val();
    var Ordervalue = $('#SortOrderValue').val();
    var image = $('.BannerImage').attr('src');

    console.log(Text);
    console.log(Ordervalue);
    console.log(image);

    if (Text && Ordervalue && image) {
        $.ajax({
            type: "POST",
            url: "/Admin/AddBannerDetails",
            data: {
                Text: Text,
                Ordervalue: Ordervalue,
                image: image

            },
            success: function (data) {
                $('#forAddBannerClose').click();
                $('.Bannerdata').html(data);
                forBannerPagenation();
                //alert(" data is successfully added");
                toastr.success('data is successfully saved');
                $('#myText').val(''); // Clear enteredThemeName input field
                $("#SortOrderValue").val(''); // Reset the status dropdown to the first option
                $('.BannerImage').attr('src', '');
                $('.needs-validation.addbannervalidation').removeClass('was-validated'); // Remove the validation message


            }
        })
    }

})

//for edit banner details
function EditBannerDetails(BannerId, Text, SortOrder, Image) {
    console.log(Text);
    console.log(SortOrder);
    console.log(Image);
    $('#myTextedited').val(Text);
    $('#SaveChangedBanner').attr('data-banner-id', BannerId);
    $("#SortOrderValueedited").val(SortOrder);
    $(".selectedImageEditable").html("<img src='" + Image + "' class='BannerImageEditable' height='400px' width='400px' />");

    $('#editBannerModal').modal('show');

}

$(document).on('click', "#SaveChangedBanner", function () {

    (function () {
        'use strict'


        var forms = document.querySelectorAll('.needs-validation.editedbannervalidation')
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
    var bannerid = $(this).attr('data-banner-id');
    var Text = $('#myTextedited').val();
    var Ordervalue = $('#SortOrderValueedited').val();
    var image = $('.BannerImageEditable').attr('src');
    console.log(bannerid);
    console.log(Text);
    console.log(Ordervalue);
    console.log(image);


    $.ajax({
        type: "POST",
        url: "/Admin/EditBannerDetails",
        data: {
            Text: Text,
            Ordervalue: Ordervalue,
            image: image,
            BannerId: bannerid

        },
        success: function (data) {
            $('#forEditBannerClose').click();
            $('.Bannerdata').html(data);
            forBannerPagenation();
            //alert(" data is successfully added");
            toastr.success('Edited data is successfully saved');
        }
    })


})

//for delete the banner detail
$(document).on('click', '.trashBanner', function () {
    var bannerId = $(this).attr('data-banner-id');
    console.log(bannerId);

    Swal.fire({
        title: 'Are you sure?',
        text: 'You would not be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url: "/Admin/DeleteBannerDetails",
                data: {
                    BannerId: bannerId
                },
                success: function (data) {
                    $('.Bannerdata').html(data);
                    //alert(" data is successfully deleted");
                    forBannerPagenation();
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    );
                }
            })
        }
    });
});





































function selectFile() {
    document.getElementById("fileInput").click();
}

function previewImage() {
    var preview = document.getElementById("userProfile");
    var file = document.getElementById("fileInput").files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
        var formData = new FormData();
        formData.append('file', file);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/Admin/SaveImage', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                preview.src = xhr.responseText;
                document.getElementById("avatarInput").value = xhr.responseText;
            }
        };
        xhr.send(formData);
    }

}

function selectFile2() {
    document.getElementById("fileInput2").click();
}

function previewImage2() {
    var preview = document.getElementById("userProfile2");
    var file = document.getElementById("fileInput2").files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
        var formData = new FormData();
        formData.append('file', file);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/Admin/SaveImage', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                preview.src = xhr.responseText;
                document.getElementById("avatarInput").value = xhr.responseText;
            }
        };
        xhr.send(formData);
    }

}


// -----------------------------------------------------------------------------------------------------------------  
// for select images or videos and displayed at below      
// -----------------------------------------------------------------------------------------------------------------  
// Global array for storing selected image paths in base64 format
const selectedImagesBase64 = [];

// Get the selectedImage div
const selectedImage = document.querySelector('.selectedImage');

// Handle the change event for the file input element
const fileInput = document.getElementById('fileInputForMission');
fileInput.addEventListener('change', function (event) {
    for (const file of event.target.files) {
        // Create a new image element for each selected file
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const newImage = document.createElement(file.type.startsWith('image/') ? 'img' : 'video');
            newImage.src = URL.createObjectURL(file);
            newImage.controls = true;

            // Convert the file to base64 and add it to the selectedImagesBase64 array
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64Image = reader.result;
                selectedImagesBase64.push(base64Image);
            };

            // Create a new remove icon for each selected image
            const removeIcon = document.createElement('span');
            removeIcon.innerHTML = 'x';
            removeIcon.className = 'remove';

            // Add the new image and remove icon to the selectedImage div
            const newDiv = document.createElement('div');
            newDiv.className = 'selectedImageItem';
            newDiv.appendChild(newImage);
            newDiv.appendChild(removeIcon);
            selectedImage.appendChild(newDiv);

            // Add a horizontal line between images
            selectedImage.appendChild(document.createElement('hr'));
        }
    }
    console.log(selectedImagesBase64);
    // Call the function to handle remove icon clicks
    handleRemoveIconClick();
});

// Handle remove icon clicks
function handleRemoveIconClick() {
    const removeIcons = document.querySelectorAll('.selectedImageItem .remove');
    removeIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            // Remove the image path from the selectedImagesBase64 array
            const imageElement = this.previousSibling;
            const index = selectedImagesBase64.indexOf(imageElement.src);
            if (index !== -1) {
                selectedImagesBase64.splice(index, 1);
            }

            // Remove the selected image item from the selectedImage div
            this.parentElement.remove();
        });
    });
}


// -----------------------------------------------------------------------------------------------------------------  
// for select images or videos and displayed at below      
// -----------------------------------------------------------------------------------------------------------------  
// Global array for storing selected image paths in base64 format
const selectedImagesBase64Editable = [];

// Get the selectedImage div
const selectedImageedited = document.querySelector('.selectedImageEditable');

// Handle the change event for the file input element
const fileInputEdited = document.getElementById('fileInputForMissionEditable');
fileInputEdited.addEventListener('change', function (event) {
    for (const file of event.target.files) {
        // Create a new image element for each selected file
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const newImage = document.createElement(file.type.startsWith('image/') ? 'img' : 'video');
            newImage.src = URL.createObjectURL(file);
            newImage.controls = true;

            // Convert the file to base64 and add it to the selectedImagesBase64 array
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64Image2 = reader.result;
                selectedImagesBase64Editable.push(base64Image2);
            };

            // Create a new remove icon for each selected image
            const removeIcon = document.createElement('span');
            removeIcon.innerHTML = 'x';
            removeIcon.className = 'remove';

            // Add the new image and remove icon to the selectedImage div
            const newDiv = document.createElement('div');
            newDiv.className = 'selectedImageItem';
            newDiv.appendChild(newImage);
            newDiv.appendChild(removeIcon);
            selectedImageedited.appendChild(newDiv);

            // Add a horizontal line between images
            selectedImageedited.appendChild(document.createElement('hr'));
        }
    }
    console.log(selectedImagesBase64Editable);
    // Call the function to handle remove icon clicks
    handleRemoveIconClick4();
});

// Handle remove icon clicks
function handleRemoveIconClick4() {
    const removeIcons = document.querySelectorAll('.selectedImageItem .remove');
    removeIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            // Remove the image path from the selectedImagesBase64 array
            const imageElement = this.previousSibling;
            const index = selectedImagesBase64Editable.indexOf(imageElement.src);
            if (index !== -1) {
                selectedImagesBase64Editable.splice(index, 1);
            }

            // Remove the selected image item from the selectedImage div
            this.parentElement.remove();
        });
    });
}



// -----------------------------------------------------------------------------------------------------------------  
// for select documents and displayed at below      
// -----------------------------------------------------------------------------------------------------------------  
// Global array for storing selected document paths in base64 format
const selectedDocsBase64 = [];

// Get the selectedDoc div
const selectedDoc = document.querySelector('.selectedDoc');

// Handle the change event for the file input element
const fileInputDoc = document.getElementById('fileInputForMissionDoc');
fileInputDoc.addEventListener('change', function (event) {
    for (const file of event.target.files) {
        // Create a new element for each selected file
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            const newDoc = document.createElement('div');
            newDoc.className = 'selectedDocItem';

            // Create a new remove icon for each selected document
            const removeIcon = document.createElement('span');
            removeIcon.innerHTML = 'x';
            removeIcon.className = 'remove';

            // Display the document name
            const docName = document.createElement('span');
            docName.innerHTML = file.name;
            docName.className = 'docName';

            // Add the new document, remove icon and document name to the selectedDoc div
            newDoc.appendChild(docName);
            newDoc.appendChild(removeIcon);
            selectedDoc.appendChild(newDoc);

            // Convert the file to base64 and add it to the selectedDocsBase64 array
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64Doc = reader.result;
                selectedDocsBase64.push(base64Doc);
            };

            // Add a horizontal line between documents
            selectedDoc.appendChild(document.createElement('hr'));
        }
    }
    console.log(selectedDocsBase64);
    // Call the function to handle remove icon clicks
    handleRemoveIconClickDoc();
});

// Handle remove icon clicks
function handleRemoveIconClickDoc() {
    const removeIcons = document.querySelectorAll('.selectedDocItem .remove');
    removeIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            // Remove the document path from the selectedDocsBase64 array
            const index = Array.from(selectedDoc.children).indexOf(this.parentElement);
            if (index !== -1) {
                selectedDocsBase64.splice(index, 1);
            }

            // Remove the selected document item from the selectedDoc div
            this.parentElement.remove();
        });
    });
}

// -----------------------------------------------------------------------------------------------------------------  
// for select documents and displayed at below      
// -----------------------------------------------------------------------------------------------------------------  
// Global array for storing selected document paths in base64 format
const selectedDocsBase64Editable = [];

// Get the selectedDoc div
const selectedDocEditable = document.querySelector('.selectedDoceditable');

// Handle the change event for the file input element
const fileInputDocEdit = document.getElementById('fileInputForMissionDoc2');
fileInputDocEdit.addEventListener('change', function (event) {
    for (const file of event.target.files) {
        // Create a new element for each selected file
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            const newDoc = document.createElement('div');
            newDoc.className = 'selectedDocItem';

            // Create a new remove icon for each selected document
            const removeIcon = document.createElement('span');
            removeIcon.innerHTML = 'x';
            removeIcon.className = 'remove';

            // Display the document name
            const docName = document.createElement('span');
            docName.innerHTML = file.name;
            docName.className = 'docName';

            // Add the new document, remove icon and document name to the selectedDoc div
            newDoc.appendChild(docName);
            newDoc.appendChild(removeIcon);
            selectedDocEditable.appendChild(newDoc);

            // Convert the file to base64 and add it to the selectedDocsBase64 array
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64Doc = reader.result;
                selectedDocsBase64Editable.push(base64Doc);
            };

            // Add a horizontal line between documents
            selectedDocEditable.appendChild(document.createElement('hr'));
        }
    }
    console.log(selectedDocsBase64Editable);
    // Call the function to handle remove icon clicks
    handleRemoveIconClickDoc2();
});

// Handle remove icon clicks
function handleRemoveIconClickDoc2() {
    const removeIcons = document.querySelectorAll('.selectedDocItem .remove');
    removeIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            // Remove the document path from the selectedDocsBase64 array
            const index = Array.from(selectedDocEditable.children).indexOf(this.parentElement);
            if (index !== -1) {
                selectedDocsBase64Editable.splice(index, 1);
            }

            // Remove the selected document item from the selectedDoc div
            this.parentElement.remove();
        });
    });
}




function forMissionThemePagenation() {
    $('#DataTablesIdForMissionTheme').DataTable({
        info: false,
        lengthChange: false,
        dom: '<"float-start"f><"#DataTablesId"t>i<"#paginatorId"lp>',
        responsive: true,
        pageLength: 10,
        language: {
            searchPlaceholder: "Search Records"
        },

    });
}
function forMissionSkillPagenation() {
    $('#DataTablesIdForMissionSkill').DataTable({
        info: false,
        lengthChange: false,
        dom: '<"float-start"f><"#DataTablesId"t>i<"#paginatorId"lp>',
        responsive: true,
        pageLength: 10,
        language: {
            searchPlaceholder: "Search Records"
        },

    });
}
function forMissionApplicationPagenation() {
    $('#DataTablesIdForMissionApplication').DataTable({
        info: false,
        lengthChange: false,
        dom: '<"float-start"f><"#DataTablesId"t>i<"#paginatorId"lp>',
        responsive: true,
        pageLength: 10,
        language: {
            searchPlaceholder: "Search Records"
        },

    });
}
function forStoryPagenation() {
    $('#DataTablesIdForStory').DataTable({
        info: false,
        lengthChange: false,
        dom: '<"float-start"f><"#DataTablesId"t>i<"#paginatorId"lp>',
        responsive: true,
        pageLength: 10,
        language: {
            searchPlaceholder: "Search Records"
        },

    });
}

function forBannerPagenation() {
    $('#DataTablesIdForBanner').DataTable({
        info: false,
        lengthChange: false,
        dom: '<"float-start"f><"#DataTablesId"t>i<"#paginatorId"lp>',
        responsive: true,
        pageLength: 10,
        language: {
            searchPlaceholder: "Search Records"
        },

    });
}
function forUserPagenation() {
    $('#DataTablesIdForUser').DataTable({
        info: false,
        lengthChange: false,
        dom: '<"float-start"f><"#DataTablesId"t>i<"#paginatorId"lp>',
        responsive: true,
        pageLength: 10,
        language: {
            searchPlaceholder: "Search Records"
        },

    });
}
function forCmsPagenation() {
    $('#DataTablesIdForCMS').DataTable({
        info: false,
        lengthChange: false,
        dom: '<"float-start"f><"#DataTablesId"t>i<"#paginatorId"lp>',
        responsive: true,
        pageLength: 10,
        language: {
            searchPlaceholder: "Search Records"
        },

    });
}
function forMissionPagenation() {
    $('#DataTablesIdForMission').DataTable({
        info: false,
        lengthChange: false,
        dom: '<"float-start"f><"#DataTablesId"t>i<"#paginatorId"lp>',
        responsive: true,
        pageLength: 10,
        language: {
            searchPlaceholder: "Search Records"
        },

    });
}

$(document).ready(function () {
    $('.DataTablesId').DataTable({
        info: false,
        lengthChange: false,
        dom: '<"float-start"f><"#DataTablesId"t>i<"#paginatorId"lp>',
        responsive: true,
        pageLength: 10,
        language: {
            searchPlaceholder: "Search Records"
        },

    });
});