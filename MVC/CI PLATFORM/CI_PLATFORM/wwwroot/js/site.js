// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//for click on cross icon
function clearall() {
    var divs = document.getElementById("chipclear");
    divs.classList.add('hide');

    $('#FilterBtn').click();
    console.log("helllllo");
}


//for loading country list
$(document).ready(function () {
    $.ajax({
        url: "/Content/GetAllCountries",
        type: "GET",
        dataType: "json",
        success: function (result) {
            console.log(result);

            $.each(result, function (i, country) {
                let newOption = $('<option></option>').val(country.countryId + country.name).html(country.name).attr('id', country.name).attr('class', 'countrylist');
                $("#countryDropdown").append(newOption);
            });
        }
    });
});


//for pushing selected country in array
$("#countryDropdown ").on("change", function () {
    var countryids = $("#countryDropdown").val();
    var countryid = countryids[0];
    var length = countryids.length;
    var countryname = countryids.substring(1, length);
    var countryIndex = countrychip.indexOf(countryname);
    console.log(countryid);
    console.log(countryname);
    var filterchipCountry = 1 + countryname;
    if (countryIndex == -1) {
        countrychip.push(countryname);
        $('#chips').append($(`<div id="chip${countryname}" class="filter-wrapper px-3 rounded-pill py-1 d-flex align-items-center m-1 flex-nowrap">
                        <p class="filter">`+ countryname + `</p>
                        <button class="border-0 bg-white"  onclick="clear1(this);" value="${filterchipCountry}"> <i class="bi bi-x" ></i> </button>
                    </div>`));
    }
    console.log(countrychip);
    $("#FilterBtn").click();
});


function clear1(clearnow) {
    
    var arrayId = clearnow.value[0];
    var arrlength = clearnow.length;
    var data = clearnow.value.substring(1, arrlength);
    
    var idname = clearnow.value;
    if (arrayId == 1) {
        console.log("nirav", countrychip);
        var name = countrychip.indexOf(data);
       
        countrychip.splice(name, 1);
        $("#chip" + data).remove();
        console.log("patel", countrychip);
        console.log("#" + data);
        $("#" + data).css('display', 'none');
        $("#FilterBtn").click();
    }
};




//related city list
$("#countryDropdown").on("click", function () {
    var countryId = $("#countryDropdown").val()[0];


    console.log(countryId);


    // Remove any existing cities
    $("#cityDropdown").empty();

    if (countryId) {
        $.ajax({
            url: "/Content/GetCitiesByCountryId",
            type: "GET",
            data: { countryId: countryId },
            dataType: "json",
            success: function (result) {
                $.each(result, function (i, city) {
                    // Create a new checkbox for each city
                    var checkbox = $('<input />', {
                        type: 'checkbox',
                        //id: 'city' + city.cityId,
                        id: city.cityId,
                        name: 'city',
                        value: city.name,
                        onclick: 'cityfun(this);'
                    });
                    var label = $('<label />', {
                        'for': 'city' + city.cityId,
                        text: city.name
                    });

                    // Add the checkbox to the container
                    $("#cityDropdown").append(checkbox).append(label).append("<br>");
                })
            }
        });
    };
});


//for pushing selected city in array
function cityfun(city) {
    console.log(city.value);

    var cityname = city.value;
    var $city = $(city); // convert city to a jQuery object
    var cityid = $city.attr('id'); // use attr() method on the jQuery object

    var cityIndex = citychip.indexOf(cityname);
    console.log(cityid);
    console.log(cityname);


    var filterchipCity = 2 + cityname;
    if (cityIndex == -1) {
        citychip.push(cityname);
        $('#chips').append($(`<div id="chip${cityname}" class="filter-wrapper px-3 rounded-pill py-1 d-flex align-items-center m-1 flex-nowrap">
                        <p class="filter">`+ cityname + `</p>
                        <button class="border-0 bg-white"  onclick="clear2(this);" value="${filterchipCity}"> <i class="bi bi-x" ></i> </button>
                    </div>`));
    }
    else {
        // City is unchecked
        if (cityIndex != -1) {
            // Remove city from citychip
            citychip.splice(cityIndex, 1);
            $(`#chip${cityname}`).remove();
        }
    }


    console.log(citychip);
    $("#FilterBtn").click();

}


function clear2(clearnow) {
    
    var arrayId = clearnow.value[0];
    var arrlength = clearnow.length;
    var data = clearnow.value.substring(1, arrlength);
    
    var idname = clearnow.value;
    if (arrayId == 2) {
        console.log("nirav", citychip);
        var name = citychip.indexOf(data);
       
        citychip.splice(name, 1);
        $("#chip" + data).remove();
        console.log("patel", citychip);
        console.log("#" + data);
        $("#" + data).css('display', 'none');
        $("#FilterBtn").click();
    }
};



//14-03
var countrychip = [];
var citychip = [];
var skillchip = [];
var themechip = [];
var filterchip = [];
var SortValue;




//for pushing selected theme in array
function misfun(theme) {
    console.log(theme.value);
    
    var theme = theme.value;
    var themeid = theme[0];
    var length = theme.length;
    var themename = theme.substring(2, length);
    var themeIndex = themechip.indexOf(themename);
    console.log(themeid);
    console.log(themename);


    var filterchipTheme = 3 + themename;
    if (themeIndex == -1) {
        themechip.push(themename);
        $('#chips').append($(`<div id="chip${themename}" class="filter-wrapper px-3 rounded-pill py-1 d-flex align-items-center m-1 flex-nowrap">
                        <p class="filter">`+ themename + `</p>
                        <button class="border-0 bg-white"  onclick="clear3(this);" value="${filterchipTheme}"> <i class="bi bi-x" ></i> </button>
                    </div>`));
    }
    else {
        // theme is unchecked
        if (themeIndex != -1) {
            // Remove theme from themechip
            themechip.splice(themeIndex, 1);
            $(`#chip${themename}`).remove();
        }
    }
    console.log(themechip);
    $("#FilterBtn").click();

}


function clear3(clearnow) {
    var arrayId = clearnow.value[0];
    var arrlength = clearnow.length;
    var data = clearnow.value.substring(1, arrlength);
    var idname = clearnow.value;
    if (arrayId == 3) {
        console.log("nirav", themechip);
        var name = themechip.indexOf(data);
        themechip.splice(name, 1);
        $("#chip" + data).remove();
        console.log("patel", themechip);
        console.log("#" + data);
        $("#" + data).css('display', 'none');
        $("#FilterBtn").click();
    }
};



//for pushing selected skill in array
function skillfun(skill) {
    console.log(skill.value);
    
    var skill = skill.value;
    var skillid = skill[0];
    var length = skill.length;
    var skillname = skill.substring(2, length);
    var skillIndex = skillchip.indexOf(skillname);
    console.log(skillid);
    console.log(skillname);


    var filterchipSkill = 4 + skillname;
    if (skillIndex == -1) {
        skillchip.push(skillname);
        $('#chips').append($(`<div id="chip${skillname}" class="filter-wrapper px-3 rounded-pill py-1 d-flex align-items-center m-1 flex-nowrap">
                        <p class="filter">`+ skillname + `</p>
                        <button class="border-0 bg-white"  onclick="clear4(this);" value="${filterchipSkill}"> <i class="bi bi-x" ></i> </button>
                    </div>`));
    }
    else {
        // skill is unchecked
        if (skillIndex != -1) {
            // Remove theme from themechip
            skillchip.splice(skillIndex, 1);
            $(`#chip${skillname}`).remove();
        }
    }
    console.log(skillchip);
    $("#FilterBtn").click();

}


function clear4(clearnow) {
   
    var arrayId = clearnow.value[0];
    var arrlength = clearnow.value.length;
    var data = clearnow.value.substring(1, arrlength);
    
    var idname = clearnow.value;
    if (arrayId == 4) {
        console.log("nirav", skillchip);
        var name = skillchip.indexOf(data);
        
        skillchip.splice(name, 1);
        $("#chip" + data).remove();
        console.log("patel", skillchip);
        console.log("#" + data);
        $("#" + data).css('display', 'none');
        $("#FilterBtn").click();
    }
};





//for sortby functionality
$("#sortby").on('change', function () {
    SortValue = $('#sortby').val();
   
    $("#FilterBtn").click();
});


//common method calling for filter and sortby
$("#FilterBtn").on('click', function () {
    console.log(countrychip);
    console.log(citychip);
    console.log(themechip);
    console.log(skillchip);
    var userId = $('#FilterBtn').data('user-id');
    $('#NoMissionFound').css('display', 'none');
    $.ajax({
        url: '/Content/Filter',
        type: 'GET',
        traditional: true,
        data: {
            userId: userId,
            country: countrychip,
            city: citychip,
            theme: themechip,
            skill: skillchip,
            sort: SortValue
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.length == 0) {
                $('#NoMissionId').click()
            }

            console.log(data);
            var items = "";
            var contents = "";
            var mission = $("#products");
            var mission_list = $("#myListView");
            mission.empty();
            mission_list.empty();

            let i = 0;
            //Grid View
            $(data).each(function (a, item) {

                i = a;
                items = mission.html() + `<div class="item col-xs-4 col-lg-4">

                <div class="thumbnail card">
                    <div class="img-event position-relative">
                        <img class="group list-group-image img-fluid w-100"
                            src=`+ item.value.mediaPath + ` alt="unable to load img" />
                        <div class="bottom-left justify-content-center">`
                    + item.value.theme +
                    `</div>
                        <div class="bottom-right  opacity-50   ">
                            <img src="/images/heart.png" class="mx-auto d-block p-1" alt="">
                        </div>
                        <div class="bottom-right2  opacity-50   ">
                            <img src="/images/user.png" class="mx-auto d-block p-1" alt="">
                        </div>
                        <div class="bottom-right3  opacity-50   ">
                            <img src="/images/pin.png" class="mx-auto p-1" alt="">
                            <span>`+ item.value.name + `</span>
                        </div>
                    </div>
                    <div class="caption card-body">
                        <h4 class="group card-title inner list-group-item-heading">`
                    + item.value.title + `</h4>
                        <p class="group inner list-group-item-text sd">`
                    + item.value.shortDescription + `</p>
                        <div class="row mb">
                            <div class="col col-lg-6 col-md-6 col-sm-12">`+ item.value.organizationName + `</div>
                            <div class="col col-lg-6 col-md-6 col-sm-12 ">
                                <img src="/images/selected-star.png" class="wdimg" alt="">
                                <img src="/images/selected-star.png" class="wdimg" alt="">
                                <img src="/images/selected-star.png" class="wdimg" alt="">
                                <img src="/images/star.png" class="wdimg" alt="">
                                <img src="/images/star.png" class="wdimg" alt="">
                            </div>
                        </div>
                        <div class="position-relative cla">`
                    +


                    `</div>
                     

                        <div class="row mt-4 clb ">`+





                    ` </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-6 mx-auto">
                                <a class="btn btnapp " href="/Content/Volunteering_Mission_Page?id=`+ item.value.missionId+`"    >Apply <img src="/images/right-arrow.png" alt=""></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>`

                mission.html(items);
                console.log(item.value.missionType == "TIME")
                if (item.value.missionType == "TIME") {
                    let a = `<hr style="z-index: -1;" >
                    <div class='dt text-center position-absolute'>` +
                        `<span class='fsize'>From ` + item.value.startDate + ` until ` + item.value.endDate + `</span></div>`

                    $('.cla').eq(i).append(a)

                    console.log(i)
                    var c = `<div class="col">

                <table>
                    <tr>
                        <td rowspan="2"><img src="/images/Seats-left.png" alt=""></td>
                            <td>`+ item.value.seatsVacancy + `</td>
                                    </tr>
                        <tr>
                            <td class="fsize2"> Seats Left</td>
                        </tr>
                                </table>
                            </div>
                <div class="col">
                    <table>
                        <tr>
                            <td rowspan="2"><img src="/images/deadline.png" alt=""></td>
                                <td>`+ item.value.deadline+` </td>
                                    </tr>
                            <tr>
                                <td class="fsize">Deadline</td>
                            </tr>
                                </table>
                                        </div>`
                    $(".clb").eq(i).append(c)



                }
                else {
                    var b =
                        `<hr style="z-index: -1;" ><div class="dt text-center  position-absolute">
                <span class="fsize"> Ongoing Opportunity</span>
            </div>`
                    $('.cla').eq(i).append(b)
                    console.log("els");

                    var d = `<div class="col">
            <table>
                <tr>
                    <td rowspan="2"><img src="/images/Already-volunteered.png" alt=""></td>
                        <td>250</td>
                                    </tr>
                    <tr>
                        <td class="fsize2">Already volunteered</td>
                    </tr>
                                </table>
                        </div>
            <div class="col">
                <table>
                    <tr>
                        <td rowspan="2"><img src="/images/achieved.png" alt=""></td>
                            <td>
                                <div class="progress">
                                    <div class="progress-bar bgw" role="progressbar" style="width: 75%"
                                        aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </td>
                           </tr>
                        <tr>
                            <td class="fsize2">8000 Achieved</td>
                        </tr>
                                </table>
                        </div>`
                    $(".clb").eq(i).append(d)
                }
            });


            //list view
            $(data).each(function (b, item) {

                i = b;
                contents = mission_list.html() +
                    `<div class="row border mt-3 item ">
           
        <div class="col col-lg-4  col-md-12 col-xs-12 position-relative border-light  ">
            <img src=`+ item.value.mediaPath + ` class="thumbimg" alt="" />
            <div class="bl1 justify-content-center">`
                    + item.value.theme +
                    `</div>
            <div class="bottom-right4  opacity-50   ">
                <img src="/images/heart.png" class="mx-auto d-block p-1" alt="">
            </div>
            <div class="bottom-right5  opacity-50   ">
                <img src="/images/user.png" class="mx-auto d-block p-1" alt="">
            </div>
            <div class="bottom-right6  opacity-50   ">
                <img src="/images/pin.png" class="mx-auto p-1" alt="">
                <span>` + item.value.name + `</span>
            </div>
        </div>
        <div class="col col-lg-8 col-md-12 col-sm-12">
            <h4 class="group card-title inner list-group-item-heading mtop">` +
                    item.value.title + `</h4>
            <p class="group inner list-group-item-text sd">`+
                    item.value.shortDescription + `</p>

            <div class="row">
                <div class="col col-lg-6 col-md-6 col-sm-12">
                    <div class="d-inline">`+ item.value.organizationName + `</div>
                    <div class="d-inline">
                        <img src="/images/selected-star.png" class="wdimg" alt="">
                        <img src="/images/selected-star.png" class="wdimg" alt="">
                        <img src="/images/selected-star.png" class="wdimg" alt="">
                        <img src="/images/star.png" class="wdimg" alt="">
                        <img src="/images/star.png" class="wdimg" alt="">
                    </div>
                </div>
                <div class="col col-lg-6 col-md-6 col-sm-12 border text-center bdr-rds cld">`+


                    `</div>
                <div class="row">
                            <div class="col-xs-12 col-md-6 mx-auto">
                                <a class="btn btnapp " href="/Content/Volunteering_Mission_Page?id=`+ item.value.missionId +`"    >Apply <img src="/images/right-arrow.png" alt=""></a>
                            </div>
                            <div class="col-xs-12 col-md-6 mx-auto ">
                                <div class="row mt-4 cle">`+

                                `<div>
                            </div >
                        </div>
                

            </div >

        </div >
   
        </div >`
                mission_list.html(contents)
                if (item.value.missionType == "TIME") {

                    var d = 
                        `<span class="fsize"> From` + item.value.startDate + ` until ` + item.value.endDate + `</span>`
                    $('.cld').eq(i).append(d)

                    var e = `<div class="col">

                    <table>
                        <tr>
                            <td rowspan="2"><img src="/images/Seats-left.png" alt=""></td>
                                <td>` + item.value.seatsVacancy + `</td>
                                </tr>
                            <tr>
                                <td class="fsize2"> Seats Left</td>
                            </tr>
                            </table>
                        </div>
                    <div class="col">
                        <table>
                            <tr>
                                <td rowspan="2"><img src="/images/deadline.png" alt=""></td>
                                    <td>`+ item.value.deadline+`</td>
                                </tr>
                                <tr>
                                    <td class="fsize">Deadline</td>
                                </tr>
                            </table>
                        </div>`

                    $('.cle').eq(i).append(e)
                }
                else {
                    var f = `<hr style="z-index: -1;">
                            <span class="fsize"> Ongoing Opportunity</span>`
                    $('.cld').eq(i).append(f)

                    var g = `<div class="col">
                            <table>
                                <tr>
                                    <td rowspan="2"><img src="/images/Already-volunteered.png" alt=""></td>
                                    <td>250</td>
                                </tr>
                                <tr>
                                    <td class="fsize2">Already volunteered</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col">
                            <table>
                                <tr>
                                    <td rowspan="2"><img src="/images/achieved.png" alt=""></td>
                                    <td>
                                        <div class="progress">
                                            <div class="progress-bar bgw" role="progressbar" style="width: 75%"
                                                aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="fsize2">8000 Achieved</td>
                                </tr>
                            </table>
                        </div>`
                    $('.cle').eq(i).append(g)
                }
            });
        }

    });
});


//for clear all chip
$('#clrbtn').on('click', function () {
    countrychip.length = 0;
    citychip.length = 0;
    themechip.length = 0;
    skillchip.length = 0;

    $('#chips').css('display', 'none');
    $('#clrbtn').css('display', 'none');
    location.reload(true);
});


//for displaying no mission found page
$('#NoMissionId').on('click', function () {
    $('#NoMissionFound').css('display', 'block');
    $('#mission-list').css('display', 'none');
});

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

$('.myfavbtn2').on('click', function () {
    var favBtn = this;
    var missionId = $(favBtn).data('mission-id');
    var userId = $(favBtn).data('user-id');

    var isFavorite = $(favBtn).find("i")[0].classList.contains('filled-heart');
    console.log(missionId);
    console.log(userId);
    $.ajax({
        type: "GET",
        url: "/Content/AddToFavorites2",
        data: { missionId: missionId, userId: userId },

        success: function (data) {
            if (data.success) {
                console.log("successfully added to favorite")
                if (isFavorite) {
                    $(favBtn).find("i").removeClass("filled-heart");

                }
                else {
                    $(favBtn).find("i").addClass("filled-heart");

                }
            }
        },
        error: function (xhr, status, error) {
            console.error("Error adding favorite: " + error);
        }
    });
});


//for recommandation
$('#RecommandationBtn button').on('click', function () {
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
            if (result.applied) {
                button.text('Applied').addClass('disabled').prop('disabled', true);
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
                    button.text('Applied').addClass('disabled').prop('disabled', true);
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
