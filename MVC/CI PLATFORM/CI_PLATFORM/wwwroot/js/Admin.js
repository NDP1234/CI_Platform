
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
                $('.userlist').html(data);
                alert(" data is successfully added");

            },
        })
    }


})



function OpenEditUserModal(UserId, FirstName, LastName, Email, Password, EmployeeId, CountryId, CityId, ProfileText, Department, Status, PhoneNumber, Avatar) {

    $('#UserSaveChangesBtn').attr('data-user-id', UserId);
    $('#myFirstName2').val(FirstName);
    $('#myLastName2').val(LastName);
    $('#myemail2').val(Email);
    $('#myPwd2').val(Password);
    $('#EmpId2').val(EmployeeId);
    $('#Country2').val(CountryId);
    $('#City2').val(CityId);
    $('#pText2').val(ProfileText);
    $('#Department2').val(Department);
    $('#Status2').val(Status);
    $('#phonenumber2').val(PhoneNumber);
    $('#userProfile2').attr('src', Avatar);
    $('#editUserDetailModal').modal('show');

}


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

                $('.userlist').html(data);
                alert(" edited data is successfully saved");

            },
        })
    }


})


$(document).on('click', '.deleteUserBtn', function () {
    var userId = $(this).attr('data-user-id')

    $.ajax({
        type: "POST",
        url: "/Admin/deleteUser",
        data: {
            UserId: userId
        },
        success: function (data) {
            console.log(data);

            $('.userlist').html(data);
            alert(" data is successfully deleted");

        },
    })
})


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

            $.each(data, function (i, city) {
                $('#City2').append($('<option>').attr('value', city.cityId).text(city.name));
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        }
    });
});


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
            // populate the city dropdown with the returned data
            /*  $('#cityInput').empty();*/

            $.each(data, function (i, city) {
                $('#MissionCity').append($('<option>').attr('value', city.cityId).text(city.name));
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        }
    });
});

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
    var Description = CKEDITOR.instances.Missioneditor.editable().getText();
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
    var VideoUrl = $('#VideoUrl').val();
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

    if (MissionTitle && ShortDescription && Description && CountryId && CityId && OrganisationName && Missiontype && MisStartDate && MisEndDate && Organizationdetails   && MissionTheme && myAvailability && VideoUrl && imgpathlist && docpathlist && selectedMissionSkill)
    {
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

                $('.missionList').html(data);
                alert("  data is successfully saved");

            },
        })
    }


})


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
});

