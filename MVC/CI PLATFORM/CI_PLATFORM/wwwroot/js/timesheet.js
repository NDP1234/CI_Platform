//for validation and save the timebased timesheet details
$('#SaveBtn').on('click', function () {
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation.timebasedtimesheet')
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

    var userId = $('#SaveBtn').data('user-id');
    var selectedTitleid = $('#mymission option:selected').val();
    var myDate = $('#myDate').val();
    var myHour = $('#myHour').val();
    var myMinutes = $('#myMinutes').val();
    var myMessage = $('#myMessage').val();


    console.log(userId);
    console.log(selectedTitleid);
    console.log(myDate);
    console.log(myHour);
    console.log(myMinutes);
    console.log(myMessage);

    if (userId && selectedTitleid && myDate && myHour && myMinutes && myMessage) {
        $.ajax({
            type: "POST",
            url: "/Timesheet/SaveTimeBasedTimesheet",
            data: {
                userId: userId,
                TitleId: selectedTitleid,
                Date: myDate,
                Hours: myHour,
                Minutes: myMinutes,
                Message: myMessage
            },
            success: function (data) {
                console.log(data);
                location.reload();
                
                alert("data is  successfully added");
               
            },
        })
    }
})


//for displaying a modal that can be editable 
var timesheetId;

$("#editableBtn").on("click", function () {
    

    timesheetId = $(this).data("timesheet-id");



    $(`#editTimeBasedModal-${timesheetId}`).modal("show");


});

//for update and save the edited timesheet details  
$('#SaveBtn2').on('click', function () {
    var timesheetId = $(this).data('timesheet-id');
    var userId = $('#SaveBtn2').data('user-id');
    var mDate = $(`#myDate-${timesheetId}`).val();
    var mHour = $(`#myHour-${timesheetId}`).val();
    var mMinute = $(`#myMinutes-${timesheetId}`).val();
    var mMessage = $(`#myMessage-${timesheetId}`).val();
 
    console.log(timesheetId);
    console.log(userId);
    console.log(mDate);
    console.log(mHour);
    console.log(mMinute);
    console.log(mMessage);
        $.ajax({
        type: "POST",
            url: "/Timesheet/editTimeBasedTimesheetDetails",
            data: {
            uesrId: userId,
            TimesheetId: timesheetId,
            Date: mDate,
            Hour: mHour,
            Minute: mMinute,
            Message: mMessage
        },
        success: function (data) {
            console.log(data);
            location.reload();
            alert("eidted data is successfully saved");
           
        },
    })

})

//for remove  timesheet detail while click on trash button 
$(document).ready(function () {
  
    $('.TrashBtn').on('click', function () {
        var timesheetId = $(this).data('timesheet-id');
        if (confirm("Are you sure  want to delete this detail?")) {
            $.ajax({
                url: '/Timesheet/trashTimeBasedData',
                type: 'POST',
                data: { timesheetId: timesheetId },
                success: function (response) {
                    if (response) {
                        location.reload();
                        alert("data is successfully removed");
                    }
                },
               
            });
        }
    });
});


//for validation and save the goalbased timesheet details
$('#SaveBtn3').on('click', function () {
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation.goalbasedtimesheet')
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

    var userId = $('#SaveBtn3').data('user-id');
    var selectedTitleid = $('#mymission2 option:selected').val();
    var myDate = $('#myDate2').val();
    var myAction = $('#myAction').val();
    var myMessage = $('#myMessage2').val();


    console.log(userId);
    console.log(selectedTitleid);
    console.log(myDate);
    console.log(myAction);
    console.log(myMessage);

    if (userId && selectedTitleid && myDate && myDate && myAction && myMessage) {
        $.ajax({
            type: "POST",
            url: "/Timesheet/SaveGoalBasedTimesheet",
            data: {
                userId: userId,
                TitleId: selectedTitleid,
                Date: myDate,
                Action: myAction,
                Message: myMessage
            },
            success: function (data) {
                console.log(data);
                location.reload();

                alert("data is  successfully added");

            },
        })
    }
})



//for displaying a modal that can be editable 
$("#editableBtn2").on("click", function () {


    var timesheetId = $('#editableBtn2').data("timesheet-id");

    console.log(timesheetId)

    $(`#editGoalBasedModal-${timesheetId}`).modal("show");


});


//for update and save the edited goal based timesheet details 
$('#SaveBtn4').on('click', function () {
    var timesheetId = $('#SaveBtn4').data('timesheet-id');
    var userId = $('#SaveBtn4').data('user-id');
    var myDate = $(`#myDate2-${timesheetId}`).val();
    var myAction = $(`#myAction-${timesheetId}`).val();
    var myMessage = $(`#myMessage2-${timesheetId}`).val();

    console.log(timesheetId);
    console.log(userId);
    console.log(myDate);
    console.log(myAction);
    console.log(myMessage);
    $.ajax({
        type: "POST",
        url: "/Timesheet/editGoalBasedTimesheetDetails",
        data: {
            uesrId: userId,
            TimesheetId: timesheetId,
            Date: myDate,
            Action: myAction,
            Message: myMessage
        },
        success: function (data) {
            console.log(data);
            location.reload();
            alert("eidted data is successfully saved");

        },
    })

})