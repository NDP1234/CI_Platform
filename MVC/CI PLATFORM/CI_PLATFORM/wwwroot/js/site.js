// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var Themes = [];




$("#sortby").on('change', function () {
    var SortValue = $('#sortby').val();
    //console.log(SortValue);
    $.ajax({
        url: '/Content/DateSort?sort=' + SortValue,
        type: 'GET',
        dataType: 'json',
        success: function (data)
        {
            console.log(data);
            var items = "";
            var contents = "";
            var mission = $("#products");
            var mission_list = $("#myListView")
            mission.empty();
            mission_list.empty();

            let i = 0;
           /* let j = 0;*/
            //Grid View
            $(data).each(function (a, item)
            {
               
                i = a;
                items = mission.html() + `<div class="item col-xs-4 col-lg-4">

                <div class="thumbnail card">
                    <div class="img-event position-relative">
                        <img class="group list-group-image img-fluid w-100"
                            src=`+item.value.mediaPath+` alt="unable to load img" />
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
                                <a class="btn btnapp " href="#">Apply <img src="/images/right-arrow.png" alt=""></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>`
                
                mission.html(items);
                console.log(item.value.missionType == "TIME" )
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
                                <td>09/01/2019 </td>
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
                <div class="col-xs-12 col-md-6 mx-auto ">
                    <div class="row mt-4 cle">`+

                    `<div>
                </div >

            </div >

        </div >
    
        </div >`
                mission_list.html(contents)
                if (item.value.missionType == "TIME") {

                    var d = /*<hr style="z-index: -1;">*/
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
                                    <td>09/01/2019 </td>
                                </tr>
                                <tr>
                                    <td class="fsize">Deadline</td>
                                </tr>
                            </table>
                        </div>`

                    $('.cle').eq(i).append(e)
                }
                else
                {
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

//for loading country list
$(document).ready(function () {
    $.ajax({
        url: "/Content/GetAllCountries",
        type: "GET",
        dataType: "json",
        success: function (result) {
            $.each(result, function (i, country) {
                let newOption = $('<option></option>').val(country.countryId).html(country.name)
                $("#countryDropdown").append(newOption);
            });
        }
    });
});

//for loading related city list
$("#countryDropdown").on("change", function () {
    var countryId = $("#countryDropdown").val();
    console.log(countryId);
    $("#cityDropdown").empty();
    $("#cityDropdown").append($('<option></option>').val('').html('City'));


    if (countryId) {
        $.ajax({
            url: "/Content/GetCitiesByCountryId",
            type: "GET",
            data: { countryId: countryId },
            dataType: "json",
            success: function (result) {
                $.each(result, function (i, city) {
                    $("#cityDropdown").append($('<option></option>').val(city.cityId).html(city.name));
                })
            }
        });
    };
});

$("#countryDropdown").on("change", function () {
    var countryId = $("#countryDropdown").val();
    console.log(countryId);
    $("#cityDropdown").empty();


    if (countryId) {
        $.ajax({
            url: "/Content/GetCitiesByCountryId",
            type: "GET",
            data: { countryId: countryId },
            dataType: "json",
            success: function (result) {
                $.each(result, function (i, city) {
                    var checkbox = $('<input type="checkbox"/>')
                        .attr("name", "cityCheckbox")
                        .attr("value", city.cityId)
                        .attr("id", "cityCheckbox_" + i);
                    var label = $('<label/>')
                        .attr("for", "cityCheckbox_" + i)
                        .text(city.name);
                    var container = $('<div/>')
                        .addClass("cityCheckboxContainer")
                        .append(checkbox)
                        .append(label);
                    $("#cityDropdown").append(container);
                })
            }
        });
    };
});





//for filtering themes
$(".themeDropdown").on("change", function () {
    var themeId = $(this).val();
    console.log(themeId);
    $.ajax({
        url: '/Content/ThemeFilter?themeid=' + themeId ,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var items = "";
            var contents = "";
            var mission = $("#products");
            var mission_list = $("#myListView")
            mission.empty();
            mission_list.empty();

            let i = 0;
            /* let j = 0;*/
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
                                <a class="btn btnapp " href="#">Apply <img src="/images/right-arrow.png" alt=""></a>
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
                                <td>09/01/2019 </td>
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
                <div class="col-xs-12 col-md-6 mx-auto ">
                    <div class="row mt-4 cle">`+

                    `<div>
                </div >

            </div >

        </div >
    
        </div >`
                mission_list.html(contents)
                if (item.value.missionType == "TIME") {

                    var d = /*<hr style="z-index: -1;">*/
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
                                    <td>09/01/2019 </td>
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