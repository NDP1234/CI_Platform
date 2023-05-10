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
                                <a class="btn btnapp " href="/Content/Volunteering_Mission_Page?id=`+ item.value.missionId+`"    >View Details <img src="/images/right-arrow.png" alt=""></a>
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
                                <a class="btn btnapp " href="/Content/Volunteering_Mission_Page?id=`+ item.value.missionId +`"    >View Details <img src="/images/right-arrow.png" alt=""></a>
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



$(document).ready(function () {
    $('.dropdown-item.gthDp').click(function () {
        var selectedValue = $(this).attr('value'); // Get the value of the clicked dropdown item
        console.log(selectedValue)
        var ExploreVal = selectedValue;
        $.ajax({
            type: "POST",
            url: "/Content/ExploredData",
            data: { ExploreBasedOnVal: ExploreVal},
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

                    var starHtml = '';
                    for (var j = 0; j < 5; j++) {
                        if (j < item.value.avgRating) {
                            starHtml += '<img src="/images/selected-star.png" class="wdimg" alt="">';
                        } else {
                            starHtml += '<img src="/images/star.png" class="wdimg" alt="">';
                        }
                    }


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
                                `+ starHtml +`
                            </div>
                        </div>
                        <div class="position-relative cla">`
                        +


                        `</div>
                     

                        <div class="row mt-4 clb ">`+





                        ` </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-6 mx-auto">
                                <a class="btn btnapp " href="/Content/Volunteering_Mission_Page?id=`+ item.value.missionId + `"    >View Details <img src="/images/right-arrow.png" alt=""></a>
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
                                <td>`+ item.value.deadline + ` </td>
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

                    var starHtml = '';
                    for (var j = 0; j < 5; j++) {
                        if (j < item.value.avgRating) {
                            starHtml += '<img src="/images/selected-star.png" class="wdimg" alt="">';
                        } else {
                            starHtml += '<img src="/images/star.png" class="wdimg" alt="">';
                        }
                    }


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
                    <div class="d-inline ">`+ item.value.organizationName + `</div>
                    <div class="d-inline ">
                       `+ starHtml +`
                    </div>
                </div>
                <div class="col col-lg-6 col-md-6 col-sm-12 border text-center bdr-rds cld">`+


                        `</div>
                <div class="row">
                            <div class="col-xs-12 col-md-6 mx-auto">
                                <a class="btn btnapp " href="/Content/Volunteering_Mission_Page?id=`+ item.value.missionId + `"    >View Details <img src="/images/right-arrow.png" alt=""></a>
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
                                    <td>`+ item.value.deadline + `</td>
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
            
        })
    });
});




//09-05
const notificationSettingListButton = document.getElementById('notificationSettingList');
const notificationSettingElement = document.querySelector('.notificationSetting');
const notificationContentElement = document.querySelector('.notificationContent');

notificationSettingListButton.addEventListener('click', function () {
    notificationSettingElement.classList.remove('d-none');
    notificationSettingElement.classList.add('d-block');
    notificationContentElement.classList.add('d-none');
});

const backButton = document.querySelector('#backBtn');

backButton.addEventListener('click', function () {
    notificationSettingElement.classList.add('d-none');
    notificationContentElement.classList.remove('d-none');
    notificationContentElement.classList.add('d-block');
});
//09-05

//10-05
$(document).on('click', '#SaveNotificationSetting', function () {
    var selectedNotificationIds = [];
    $('.userNotificationCheck').each(function () {
        if ($(this).is(':checked')) {
            selectedNotificationIds.push($(this).val());
        }
    });
    console.log(selectedNotificationIds);
    var UserId = $('#SaveNotificationSetting').attr("data-user-id");

    $.ajax({
        type: "POST",
        url: "/Content/SaveNotificationSettingForUser",
        data: {
            UserId: UserId,
            selectedIds : selectedNotificationIds
        },
        success: function (data) {
            alert("settings are saved successfully");
        }
        
    })

})


$(document).ready(function () {
    var userId = $('#SaveNotificationSetting').attr("data-user-id");
    console.log(userId);

    $.ajax({
        type: "POST",
        url: "/Content/GetNotificationSettingForUser",
        data: {
            UserId: userId
        },
        success: function (data) {
            console.log(data);

            var settingIds = [];
            data.forEach(function (userSettingId) {
                settingIds.push(userSettingId.notificationSettingId);
            });

            console.log(settingIds);

            $('.userNotificationCheck').each(function () {
                var checkbox = $(this);
                var settingId = parseInt(checkbox.attr('id'));
                if (settingIds.includes(settingId)) {
                    checkbox.prop('checked', true);
                }
            });

        }

    })
})
//10-05