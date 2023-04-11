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
                alert("data is  successfully added")
            },
        })
    }
})

var timesheetId;

$("#editableBtn").on("click", function () {


    timesheetId = $(this).data("timesheet-id");



    $(`#editTimeBasedModal-${timesheetId}`).modal("show");

    
});

$('#SaveBtn2').on('click', function () {
    var timesheetId = $(this).data('timesheet-id');
    var userId = $(this).data('user-id');
    var mTitle = $(`#mymission-${timesheetId}`);
    var mDate = $(`#myDate-${timesheetId}`);
    var mHour = $(`#myHour-${timesheetId}`);
    var mMinute = $(`#myMinutes-${timesheetId}`); 
    var mMessage = $(`#myMessage-${timesheetId}`);
        $.ajax({
        type: "POST",
        url: "/Timesheet/getTimeBasedTimesheetDetails",
            data: {
            uesrId: userId,
            TimesheetId: timesheetId,
            TitleId: mTitle,
            Date: mDate,
            Hour: mHour,
            Minute: mMinute,
            Message: mMessage
        },
        success: function (data) {
            console.log(data);
            location.reload();
            alert("eidted data is successfully saved")
        },
    })

} )

