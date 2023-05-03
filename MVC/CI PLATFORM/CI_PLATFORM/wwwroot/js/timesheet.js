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


    //  custom validation for the date field
    const myDateForTimeBasedTimesheet = document.getElementById('myDate');
    myDateForTimeBasedTimesheet.addEventListener('change', function () {
        const missionSelect = document.getElementById('mymission');
        const selectedOption = missionSelect.options[missionSelect.selectedIndex];
        const startDate = new Date(selectedOption.getAttribute('data-start-date'));
        const endDate = new Date(selectedOption.getAttribute('data-end-date'));
        const selectedDate = new Date(this.value);

        if (selectedDate >= startDate && selectedDate <= endDate) {
            myDateForTimeBasedTimesheet.classList.add('is-valid');
            myDateForTimeBasedTimesheet.classList.remove('is-invalid');
        } else {
            myDateForTimeBasedTimesheet.classList.add('is-invalid');
            myDateForTimeBasedTimesheet.classList.remove('is-valid');
        }
    });


    if (userId && selectedTitleid && myDate && myHour >= 0 && myHour < 24 && myMinutes >= 0 && myMinutes <= 60 && myMessage) {



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

$(document).on('click', '#SaveBtn2', function () {

    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation .editabletimebasedtimesheet')
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

    console.log("click on sv btn")
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

    //custome validation for date
    const myDateForEditedTimeBasedTimesheet = document.getElementById(`myDate-${timesheetId}`);


    var selectedEditedDate = mDate;

    var startDateEditedTimesheet = $(`#myDate-${timesheetId}`).attr('data-start-date');
    var endDateEditedTimesheet = $(`#myDate-${timesheetId}`).attr('data-end-date');
    var EditedStartDateTimeBased = DateFormatting(startDateEditedTimesheet);
    var EditedEndDateTimeBased = DateFormatting(endDateEditedTimesheet);


    if (selectedEditedDate >= EditedStartDateTimeBased && selectedEditedDate <= EditedEndDateTimeBased) {
        myDateForEditedTimeBasedTimesheet.classList.add('is-valid');
        myDateForEditedTimeBasedTimesheet.classList.remove('is-invalid');
    } else {
        myDateForEditedTimeBasedTimesheet.classList.add('is-invalid');
        myDateForEditedTimeBasedTimesheet.classList.remove('is-valid');
    }
    //custom validation for hour and minutes
    if (mHour < 0 || mHour >= 24 || isNaN(mHour)) {
        $(`#myHour-${timesheetId}`).addClass('is-invalid');
    } else {
        $(`#myHour-${timesheetId}`).removeClass('is-invalid');
    }
    if (mMinute < 0 || mMinute >= 60 || isNaN(mMinute)) {
        $(`#myMinutes-${timesheetId}`).addClass('is-invalid');
    } else {
        $(`#myMinutes-${timesheetId}`).removeClass('is-invalid');
    }


    if ($('.is-invalid').length === 0) {
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
    }
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

    //  custom validation for the date field
    const myDateForGoalBasedTimesheet = document.getElementById('myDate2');
    myDateForGoalBasedTimesheet.addEventListener('change', function () {
        const missionSelect2 = document.getElementById('mymission2');
        const selectedOption2 = missionSelect2.options[missionSelect2.selectedIndex];
        const startDate2 = new Date(selectedOption2.getAttribute('data-start-date'));
        const endDate2 = new Date(selectedOption2.getAttribute('data-end-date'));
        const selectedDate = new Date(this.value);

        if (selectedDate >= startDate2 && selectedDate <= endDate2) {
            myDateForGoalBasedTimesheet.classList.add('is-valid');
            myDateForGoalBasedTimesheet.classList.remove('is-invalid');
        } else {
            myDateForGoalBasedTimesheet.classList.add('is-invalid');
            myDateForGoalBasedTimesheet.classList.remove('is-valid');
        }
    });


    if (myAction < 1) {
        $('#myAction').addClass('is-invalid');
    } else {
        $('#myAction').removeClass('is-invalid');
    }

    console.log(userId);
    console.log(selectedTitleid);
    console.log(myDate);
    console.log(myAction);
    console.log(myMessage);

    if (userId && selectedTitleid && myDate && myAction > 0 && myMessage) {
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

$(document).on('click', '#SaveBtn4', function () {

    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation.editableGoalbasedTimesheetValidation')
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

    var timesheetId = $(this).data('timesheet-id');
    var userId = $('#SaveBtn4').data('user-id');
    var myDate = $(`#myDate2-${timesheetId}`).val();
    var myAction = $(`#myAction-${timesheetId}`).val();
    var myMessage = $(`#myMessage2-${timesheetId}`).val();

    console.log(timesheetId);
    console.log(userId);
    console.log(myDate);
    console.log(myAction);
    console.log(myMessage);

    //custome validation for date
    const myDateForEditedGoalBasedTimesheet = document.getElementById(`myDate2-${timesheetId}`);


    var selectedEditedDate = myDate;

    var startDateEditedTimesheetForGoalBased = $(`#myDate2-${timesheetId}`).attr('data-start-date');
    var endDateEditedTimesheetForGoalBased = $(`#myDate2-${timesheetId}`).attr('data-end-date');
    var EditedStartDateTimeBased = DateFormatting(startDateEditedTimesheetForGoalBased);
    var EditedEndDateTimeBased = DateFormatting(endDateEditedTimesheetForGoalBased);


    if (selectedEditedDate >= EditedStartDateTimeBased && selectedEditedDate <= EditedEndDateTimeBased) {
        myDateForEditedGoalBasedTimesheet.classList.add('is-valid');
        myDateForEditedGoalBasedTimesheet.classList.remove('is-invalid');
    } else {
        myDateForEditedGoalBasedTimesheet.classList.add('is-invalid');
        myDateForEditedGoalBasedTimesheet.classList.remove('is-valid');
    }

    //custom validation for myAction
    if (myAction < 1) {
        $(`#myAction-${timesheetId}`).addClass('is-invalid');
    } else {
        $(`#myAction-${timesheetId}`).removeClass('is-invalid');
    }

    //if (userId && timesheetId &&  myDate && myAction > 0 && myMessage) {
    if ($('.is-invalid').length === 0) {
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
    }
})


$(document).ready(function () {
    // add event listener to mymission select element
    $("#mymission").change(function () {
        var selectedMission = $(this).find(":selected");
        var startTime = selectedMission.data("start-date");


        var formatedStartTime = DateFormatting(startTime);


        console.log(selectedMission);
        console.log(startTime);
        console.log(formatedStartTime);

        // update myDate input element's min and max attributes based on selected mission's start and end times
        $("#myDate").attr("min", formatedStartTime);

    });
});

$(document).ready(function () {
    // add event listener to mymission select element
    $("#mymission2").change(function () {
        var selectedMission = $(this).find(":selected");
        var startTime = selectedMission.data("start-date");


        var formatedStartTime = DateFormatting(startTime);


        console.log(selectedMission);
        console.log(startTime);
        console.log(formatedStartTime);

        // update myDate input element's min and max attributes based on selected mission's start and end times
        $("#myDate2").attr("min", formatedStartTime);

    });
});


function DateFormatting(dateStr) {
    var dateParts = dateStr.split(" ");
    var date = dateParts[0].split("-");
    var formattedDate = date[2] + "-" + date[1] + "-" + date[0];
    return formattedDate;
}




