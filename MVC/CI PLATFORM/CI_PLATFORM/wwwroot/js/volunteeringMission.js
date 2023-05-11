//for add to favourites

function addtofav() {
    var missionId = $('#myfavbtn').data('mission-id');
    var userId = $('#myfavbtn').data('user-id');
    const heartIcon = document.querySelector('.bi-heart');
    var isFavorite = heartIcon.classList.contains('filled-heart')
    console.log(missionId);
    console.log(userId);
    $.ajax({
        type: "GET",
        url: "/Content/AddToFavorites",
        data: { missionId: missionId, userId: userId },

        success: function (data) {
            if (data.success) {
                console.log("successfully added to favorite")
                if (isFavorite) {
                    $(heartIcon).removeClass("filled-heart");
                    $("#spanforfav").text("Add To favourite");
                }
                else {
                    $(heartIcon).addClass("filled-heart");
                    $("#spanforfav").text("Remove from favourite");
                }
            }
        },
        error: function (xhr, status, error) {
            console.error("Error adding favorite: " + error);
        }
    });
};



//for recommandation
$('#RecommandationBtn button').on('click', function () {

    var spinner = $('#spinner');
    spinner.removeClass('d-none');

    var udetails = $(this).attr('value');
    var arr = udetails.split(" ");
    var Recommanded = {
        MId: arr[0],
        FromUid: arr[1],
        Uid: arr[2],
        Uemail: arr[3]
    };
    console.log(Recommanded);
    var url = "/Content/RecommandToCoWorker?Recommanded=" + JSON.stringify(Recommanded);

    $.ajax({
        url: url,
        success: function (data) {
            spinner.addClass('d-none');
            window.location.reload();
            toastr.success(' Mail sent successfully ');
        },
    });
})




//for star rating
$(function () {
    var missionId = $('#ratingMission').data('mission-id');
    var userId = $('#ratingMission').data('user-id');
    // Get the current rating from the database and highlight the corresponding stars
    $.ajax({
        type: 'GET',
        url: '/Content/GetMissionRating',
        data: { missionId: missionId, userId: userId },
        success: function (data) {
            if (data != null) {
                $('.star-icon').each(function () {
                    if ($(this).data('value') <= data.rating) {
                        $(this).addClass('filled');
                    }
                });
            }
        }
    });

    // Handle the star rating clicks
    $('.star-icon').on('click', function () {
        // Remove the filled class from all stars
        $('.star-icon').removeClass('filled');
        var missionId = $('#ratingMission').data('mission-id');
        var userId = $('#ratingMission').data('user-id');
        // Add the filled class to the clicked star and all stars before it
        var rating = $(this).data('value');
        for (var i = 1; i <= rating; i++) {
            $('.star-icon[data-value="' + i + '"]').addClass('filled');
        }

        // Save the rating to the database using Ajax
        $.ajax({
            type: 'POST',
            url: '/Content/SaveMissionRating',
            data: { missionId: missionId, userId: userId, rating: rating },
            success: function () {
                console.log('Rating saved successfully.');
            }
        });
    });
});


//For displaying the comments
$(function () {
    var missionId = $('#post-comment').data('mission-id');

    function refreshComments() {

        $.get('/Content/DisplayComments', { missionId: missionId }, function (comments) {
            $('#comments').empty();
            console.log(comments)
            $.each(comments, function (i, comment) {
                var cAt = comment.value.createdAt;
                var formattedDateTime = formatDateTime(cAt);
                var html = ' <div class="cmt my-2 bdr bg-white p-2" id="comments">' +
                    '<div class="section fs ">' +
                    '<div class="d-flex">' +
                    ' <div class="flex-shrink-0">' +
                    '<img src=' + comment.value.avatar + ' class="rounded-pill imgh-pf" alt = "..." > ' +
                    '</div>' +
                    '<div class="flex-grow-1 ms-3">' +
                    '<div>' + comment.value.firstName + " " + comment.value.lastName + '</div>' +
                    '<div class="fs2">' + formattedDateTime + '</div>' +
                    '</div>' +
                    ' </div>' +
                    '<div class="mt-3 p-text">' +
                    comment.value.commentText +
                    ' </div>' +
                    ' </div>' +
                    '</div>';

                $('#comments').append(html);
            });
        });
    }




    //for storing comment in database
    $('#post-comment').on('click', function () {
        var text = $('#comment-text').val();
        var missionId = $('#post-comment').data('mission-id');
        var userId = $('#post-comment').data('user-id');

        $.post('/Content/Create', { missionId: missionId, userId: userId, text: text }, function (comment) {
            refreshComments();
        });

        $('#comment-text').val('');
    });

    refreshComments();
});

//converting datetime type to specific field(day, month date, year, time, AM or PM).
function formatDateTime(dateTimeStr) {
    var date = new Date(dateTimeStr);
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayName = dayNames[date.getDay()];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthName = monthNames[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return dayName + ", " + monthName + " " + day + ", " + year + " " + time;
}

//for displaying average rating
$(function () {
    // Get the average mission rating from the server
    var mId = $('#avg-rating').data('mission-id');
    $.ajax({
        type: 'GET',
        url: '/Content/GetAverageMissionRating',

        data: { missionId: mId },
        success: function (avgRating) {
            // Create the star rating HTML based on the average rating
            var starsHtml = '';
            for (var i = 1; i <= 5; i++) {
                if (i <= Math.round(avgRating)) {
                    starsHtml += '<i class="bi bi-star filled"></i>';
                } else {
                    starsHtml += '<i class="bi bi-star"></i>';
                }
            }

            // Set the star rating HTML in the container
            $('#avg-rating').html(starsHtml);
        }
    });
});


// Handle the star rating clicks for average
$('.star-icon').on('click', function () {
    // Remove the filled class from all stars
    $('.star-icon').removeClass('filled');
    var missionId = $('#ratingMission').data('mission-id');
    var userId = $('#ratingMission').data('user-id');
    // Add the filled class to the clicked star and all stars before it
    var rating = $(this).data('value');
    for (var i = 1; i <= rating; i++) {
        $('.star-icon[data-value="' + i + '"]').addClass('filled');
    }

    // Save the rating to the database using Ajax
    $.ajax({
        type: 'POST',
        url: '/Content/SaveMissionRating',
        data: { missionId: missionId, userId: userId, rating: rating },
        success: function () {
            console.log('Rating saved successfully.');
            // Update the average rating
            $.ajax({
                type: 'GET',
                url: '/Content/GetAverageMissionRating',
                data: { missionId: missionId },
                success: function (avgRating) {
                    // Create the star rating HTML based on the average rating
                    var starsHtml = '';
                    for (var i = 1; i <= 5; i++) {
                        if (i <= Math.round(avgRating)) {
                            starsHtml += '<i class="bi bi-star filled"></i>';
                        } else {
                            starsHtml += '<i class="bi bi-star"></i>';
                        }
                    }

                    // Set the star rating HTML in the container
                    $('#avg-rating').html(starsHtml);
                }
            });
        }
    });
});


//for apply in specific mission
$(function () {
    var missionId = $('.missionApplyBtn').data('mission-id');
    var userId = $('.missionApplyBtn').data('user-id');
    var button = $('.missionApplyBtn');

    $.ajax({
        type: "GET",
        url: "/Content/GetApplicationStatus",
        data: { missionId: missionId, userId: userId },
        success: function (result) {
            //if (result.applied) {
            console.log(result)

            if (result.approvalStatus == "APPROVE") {
                button.text('Applied..').addClass('disabled btn-success').prop('disabled', true);
            }
            else if (result.approvalStatus == "DECLINE") {
                button.text('Declined!..').addClass('disabled btn-danger').prop('disabled', true);
            }
            else {
                button.text('Pending!..').addClass('disabled btn-primary').prop('disabled', true);
            }

        }

    });

    $('a[data-mission-id]').click(function () {
        $.ajax({
            type: "POST",
            url: "/Content/Apply",
            data: { missionId: missionId, userId: userId },
            success: function (result) {
                if (result.success) {
                    button.text('Pending!..').addClass('disabled').prop('disabled', true);
                }
            }
        });
    });
});

//for pagenation
let recent_vol = document.getElementsByClassName("recent-vol");
let prev_vol = document.getElementById("prev-vol");
let next_vol = document.getElementById("next-vol");
let page = 1;
let pageSize = 6;
let maxpages = recent_vol.length / 6;
let recentvolpagenumber = document.getElementById("recentvolpagenumber");



recentpagination();

prev_vol.addEventListener("click", () => {
    if (page > 1) {
        page = page - 1;
    }
    recentpagination();
});

next_vol.addEventListener("click", () => {
    if (page != maxpages) {
        page = page + 1;
    }
    recentpagination();
});

function recentpagination() {
    for (i = 0; i < recent_vol.length; i++) {
        if (i < (page * pageSize) && i > (((page - 1) * pageSize) - 1)) {
            recent_vol[i].classList.remove("d-none");
        }
        else {
            recent_vol[i].classList.add("d-none");
        }
    }
    recentvolpagenumber.innerHTML = `<a class="page-link" href="#" style="color:black">${((page - 1) * 6) + 1
        } - ${(page) * 6 < recent_vol.length ? (page) * 6 : recent_vol.length
        } of ${recent_vol.length} Recent Volunteers</a > `
}

