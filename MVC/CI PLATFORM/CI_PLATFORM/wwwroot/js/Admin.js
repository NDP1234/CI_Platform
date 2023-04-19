
    $(document).ready(function() {
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
    var status = $('input[name="gridRadios"]:checked').val();

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




$(document).on("click", ".editMissionThemeModal", function () {

        var MissionThemeId = $(this).attr('data-missionTheme-id');

        console.log(MissionThemeId);

        $(`#editMissionThemeModal-${MissionThemeId}`).modal("show");


    })

$(document).on('click', '#EditablethemeBtn', function () {
    
    var MissionThemeId = $(this).attr('data-missionTheme-id');
    var editedThemeTitle = $(`#MissionThemeTitle-${MissionThemeId}`).val();

    var status = $("input[name='gridRadios-" + MissionThemeId + "']:checked").val();

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
    var status = $('input[name="gridRadios2"]:checked').val();

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


   
$(document).on("click", ".editMissionSkillModal", function () {

    var SkillId = $(this).data('skill-id');

    console.log(SkillId);

    $('#editMissionSkillModal-' + SkillId).modal("show");

})



$(document).on('click', '#EditSkillBtn', function () {

    var SkillId = $(this).attr('data-skill-id');
    var editedSkillTitle = $(`#MissionSkillTitle-${SkillId}`).val();

    var status = $("input[name='gridRadios2-" + SkillId + "']:checked").val();

    console.log(SkillId);
    console.log(editedSkillTitle);
    console.log(status);

    $.ajax({
        type: "POST",
        url: "/Admin/editMissionSkill",
        data: {
            SkillId: SkillId,
            Title: editedSkillTitle,
            status: status,
        },
        success: function (data) {
            console.log(data);
       
            $('#missionskillPartialView').html(data);
            alert("Edited data is successfully saved");

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

$('#editCMS').on('click', function () {
    $.ajax({
        url: "/Admin/_CMSEditPage",
        success: function (data) {
            $('.cmscontent').html(data);
        }
    })
})

$(document).on("click", ".editUserModal", function () {

    var userId = $(this).attr('data-user-id');

    console.log(userId);

    $(`#editUserDetailModal-${userId}`).modal("show");

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