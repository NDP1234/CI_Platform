
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

    $('#addCMS').on('click', function(){

        $('.cmscontent').load('@Url.Content("/Admin/_CMSAddPage")');
        })


$('.missionApplicationApproved').on('click', function () {
    var maID = $(this).data('missionapplication-id');

    $.ajax({
        type: "POST",
        url: "/Admin/ApproveMissionApplication",
        data: {
            MissionApplicationId: maID,
        },
        success: function (data) {
            console.log(data);
            
             location.reload();

            
            alert(" Mission application is successfully approved");
          
          

        },
    })
})

$('.missionApplicationDeclined').on('click', function () {
    var maID = $(this).data('missionapplication-id');

    $.ajax({
        type: "POST",
        url: "/Admin/DeclineMissionApplication",
        data: {
            MissionApplicationId: maID,
        },
        success: function (data) {
            console.log(data);

            location.reload();

            alert(" Mission application is successfully Declined");
         

        },
    })
})
$('.storyApproved').on('click', function () {
    var sID = $(this).data('story-id');

    $.ajax({
        type: "POST",
        url: "/Admin/PublishStory",
        data: {
            StoryId: sID,
        },
        success: function (data) {
            console.log(data);

            location.reload();

            alert(" story is sccessfully published");
         

        },
    })
})

$('.storyDeclined').on('click', function () {
    var sID = $(this).data('story-id');

    $.ajax({
        type: "POST",
        url: "/Admin/DeclineStory",
        data: {
            StoryId: sID,
        },
        success: function (data) {
            console.log(data);

            location.reload();

            alert(" story is sccessfully declined ");
         

        },
    })
})