////const missions = Array.from(document.querySelectorAll('.item'));
////const sortSelect = document.getElementById('sort-select');

function Sortby(x) {
    $.ajax({
        url: '/Content',
        type: 'GET',
        data: { sortString: x },
        success: function (result) {
            loadmissions(result.missions)
        },
        error: function () {
            console.log('Error getting missions')
        }
    });
}
const loadmissions = (missions) => {
    console.log(missions)
    $('.missions').empty()
    console.log(missions)
    $.each(missions, function (i, item) {
        var data =

            "< div class='item col-xs-4 col-lg-4'>" +
            "< div class='thumbnail card'>" +
            "< div class='img-event position-relative'>" +

                        "<img class='group list-group-image img-fluid w-100' src = '@item.image?.MediaPath' alt ='unable to load img' />" +
                        "< div class='bottom-left justify-content-center'>" +
                            item.Missions?.Theme.Title +
                        "</div>" +
                        "<div class='bottom-right  opacity-50'> "+
                        "<img src='~/images/heart.png' class='mx-auto d-block p-1' alt=''>" +
                        "</div>" +
                        "<div class='bottom-right2 opacity-50'>" +
                                "<img src='~/images/user.png' class='mx-auto d-block p-1' alt=''>" +
                        "</div>" +
                        "<div class='bottom-right3  opacity-50   '>" +
                                    "<img src='~/images/pin.png' class='mx-auto p-1' alt=''>" +
                        "<span>" + item.Missions?.City.Name + "</span>" +
                        "</div>" + 
                                "</div>" +
                                "<div class='caption card-body'>" +
                                    "<h4 class='group card-title inner list-group-item-heading'>"
                                     + item.Missions.Title + "</h4>" +
                                   " <p class='group inner list-group-item-text sd'>" +
                                     + item.Missions.ShortDescription + "</p>" +
                                    "<div class='row mb'>" +
                                        "<div class='col col-lg-6 col-md-6 col-sm-12'>" + item.Missions.OrganizationName + "</div>" +
                                        "<div class='col col-lg-6 col-md-6 col-sm-12 '>" +
                                            "<img src='~/images/selected-star.png' class='wdimg' alt=''>" +
                                                "<img src='~/images/selected-star.png' class='wdimg' alt=''>" +
                                                   " <img src='~/images/selected-star.png' class='wdimg' alt=''>" +
                                                        "<img src='~/images/star.png' class='wdimg' alt=''>"+
                                                            "<img src='~/images/star.png' class='wdimg' alt=''>" +
                            "</div>" +
                            "</div>" +
                                                        "<div class='position-relative '>" +
                                                            "<hr style='z-index: -1;'>" +
                                                                //if (item.Missions.MissionType=='TIME')
                                                                //{
                                                                //    <div class='dt text-center  position-absolute'>
                                                                //        <span class='fsize'> From  @item.Missions.StartDate.ToString().Substring(0, 10)  until @item.Missions.EndDate.ToString().Substring(0, 10)</span>
                                                                //    </div>
                                                                //}
                                                                //else
                                                                //{
                                                                //    <div class='dt text-center  position-absolute'>
                                                                //        <span class='fsize'> Ongoing Opportunity</span>
                                                                //    </div>

                                                                //}

                                                       "</div>"
                                                       "<div class='row mt-4'>"
                        //                                        @if (item.Missions.MissionType=='TIME')
                        //                                        {
                        //                                            <div class='col'>

                        //                                                <table>
                        //                                                    <tr>
                        //                                                        <td rowspan='2'><img src='~/images/Seats-left.png' alt=''></td>
                        //                                                            <td>10</td>
                        //            </tr>
                        //                                                        <tr>
                        //                                                            <td class='fsize2'> Seats Left</td>
                        //                                                        </tr>
                        //        </table>
                        //    </div>
                        //                                                <div class='col'>
                        //                                                    <table>
                        //                                                        <tr>
                        //                                                            <td rowspan='2'><img src='~/images/deadline.png' alt=''></td>
                        //                                                                <td>09/01/2019 </td>
                        //            </tr>
                        //                                                            <tr>
                        //                                                                <td class='fsize'>Deadline</td>
                        //                                                            </tr>
                        //        </table>
                        //                </div>
                        //            }
                        //                                                    else
                        //                                                    {
                        //                                                        <div class='col'>
                        //                                                            <table>
                        //                                                                <tr>
                        //                                                                    <td rowspan='2'><img src='~/images/Already-volunteered.png' alt=''></td>
                        //                                                                        <td>250</td>
                        //            </tr>
                        //                                                                    <tr>
                        //                                                                        <td class='fsize2'>Already volunteered</td>
                        //                                                                    </tr>
                        //        </table>
                        //</div>
                        //                                                            <div class='col'>
                        //                                                                <table>
                        //                                                                    <tr>
                        //                                                                        <td rowspan='2'><img src='~/images/achieved.png' alt=''></td>
                        //                                                                            <td>
                        //                                                                                <div class='progress'>
                        //                                                                                    <div class='progress-bar bgw' role='progressbar' style='width: 75%'
                        //                                                                                        aria-valuenow='75' aria-valuemin='0' aria-valuemax='100'></div>
                        //                                                                                </div>
                        //                                                                            </td>
                        //            </tr>
                        //                                                                        <tr>
                        //                                                                            <td class='fsize2'>8000 Achieved</td>
                        //                                                                        </tr>
                        //        </table>
                        "</div>"  +

                         

                        "</div>" +

                       " <div class='row'>" +
                               "<div class='col-xs-12 col-md-6 mx-auto'>" +
                                     "<a class='btn btnapp ' href='#'>" + Apply + "<img src='~/images/right-arrow.png' alt=''>"+"</a>" +
                                "</div>" +
                         "</div>" +
                       " </div>" +
                        "</div>" +
               
            "</div>"