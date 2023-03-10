// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


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
            var mission = $("#products");
            mission.empty();



            $(data).each(function (i, item)
            {
                items += `<div class="item col-xs-4 col-lg-4">



                <div class="thumbnail card">
                    <div class="img-event position-relative">
                        <img class="group list-group-image img-fluid w-100"
                            src="/images/Grow-Trees-On-the-path-to-environment-sustainability.png" alt="unable to load img" />
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
                                <img src="~/images/selected-star.png" class="wdimg" alt="">
                                <img src="~/images/selected-star.png" class="wdimg" alt="">
                                <img src="~/images/selected-star.png" class="wdimg" alt="">
                                <img src="~/images/star.png" class="wdimg" alt="">
                                <img src="~/images/star.png" class="wdimg" alt="">
                            </div>
                        </div>
                        <div class="position-relative cla">
                            <hr style="z-index: -1;">`+


                    +`</div>
                        <div class="row mt-4 clb ">`+





                    ` </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-6 mx-auto">
                                <a class="btn btnapp " href="#">Apply <img src="~/images/right-arrow.png" alt=""></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>`
            
           
            if (item.missionType == "TIME") {
                var a = "<div class='dt text-center  position - absolute'>"+
                    "<span class='fsize'>" + "From" + item.value.startDate + "until" + item.Missions.endDate + "</span">+
                     "</div>" 
                $('.cla').eq(i).append(a)
            }
            else {
                var b = `<div class="dt text-center  position-absolute">
                <span class="fsize"> Ongoing Opportunity</span>
            </div>`
                $('.cla').eq(i).append(b)
            }

            if (item.value.missionType == "TIME") {
                var c = `<div class="col">

                <table>
                    <tr>
                        <td rowspan="2"><img src="~/images/Seats-left.png" alt=""></td>
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
                            <td rowspan="2"><img src="~/images/deadline.png" alt=""></td>
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
                var d = `<div class="col">
            <table>
                <tr>
                    <td rowspan="2"><img src="~/images/Already-volunteered.png" alt=""></td>
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
                        <td rowspan="2"><img src="~/images/achieved.png" alt=""></td>
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
            mission.html(items);
        }
    })
});