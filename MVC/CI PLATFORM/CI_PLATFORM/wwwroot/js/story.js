// -----------------------------------------------------------------------------------------------------------------  
// for select images or videos and displayed at below      
// -----------------------------------------------------------------------------------------------------------------  
// Global array for storing selected image paths in base64 format
const selectedImagesBase64 = [];

// Get the selectedImage div
const selectedImage = document.querySelector('.selectedImage');

// Handle the change event for the file input element
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function (event) {
    for (const file of event.target.files) {
        // Create a new image element for each selected file
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const newImage = document.createElement(file.type.startsWith('image/') ? 'img' : 'video');
            newImage.src = URL.createObjectURL(file);
            newImage.controls = true;

            // Convert the file to base64 and add it to the selectedImagesBase64 array
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64Image = reader.result;
                selectedImagesBase64.push(base64Image);
            };

            // Create a new remove icon for each selected image
            const removeIcon = document.createElement('span');
            removeIcon.innerHTML = 'x';
            removeIcon.className = 'remove';

            // Add the new image and remove icon to the selectedImage div
            const newDiv = document.createElement('div');
            newDiv.className = 'selectedImageItem';
            newDiv.appendChild(newImage);
            newDiv.appendChild(removeIcon);
            selectedImage.appendChild(newDiv);

            // Add a horizontal line between images
            selectedImage.appendChild(document.createElement('hr'));
        }
    }
    console.log(selectedImagesBase64);
    // Call the function to handle remove icon clicks
    handleRemoveIconClick();
});

// Handle remove icon clicks
function handleRemoveIconClick() {
    const removeIcons = document.querySelectorAll('.selectedImageItem .remove');
    removeIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            // Remove the image path from the selectedImagesBase64 array
            const imageElement = this.previousSibling;
            const index = selectedImagesBase64.indexOf(imageElement.src);
            if (index !== -1) {
                selectedImagesBase64.splice(index, 1);
            }

            // Remove the selected image item from the selectedImage div
            this.parentElement.remove();
        });
    });
}


/*for save draft*/
$("#SaveBtn").on('click', function () {

    (function () {
        'use strict'


        var forms = document.querySelectorAll('.needs-validation s.sysvalidation')
        console.log(forms);

        Array.prototype.slice.call(forms)
            .forEach(function (form) {

                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')

            })
    })()


    var userid = $("#myInputSelect").data('user-id');
    var mission_start_date = $("#myInputSelect option:selected").attr('data-start-date');
    var missionid = $("#myInputSelect").val();


    var storytitle = $("#storyTitle").val();
    var missiontitle = $("#myInputSelect option:selected").text();
    var publisheddate = $("#myStoryDate").val();
    var status = "DRAFT";
    
    var description = CKEDITOR.instances.editor1.getData();

    var videoUrl = $("#myStoryVideo").val();
    let vId = videoUrl.split('v=')[1];
    var url = "https://www.youtube.com/embed/" + vId;
    var pathlist = selectedImagesBase64.concat(paths);
    console.log(pathlist);

    console.log(pathlist)
    console.log("User ID:", userid);
    console.log("Mission ID:", missionid);
    console.log("Story Title:", storytitle);
    console.log("Mission Title:", missiontitle);
    console.log("Published Date:", publisheddate);
    console.log("Description:", description);
    console.log("url:", url);

    var pdate = publisheddate.split(' ');
    var tempdate = pdate[0].split('-');
    var StoryPublishedDate = tempdate[2] + '-' + tempdate[1] + '-' + tempdate[0];

    //for today date
    var todayDate = new Date();
    var day = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();

    // Add leading zeros to day and month if they are single digit
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    var formattedDateOfToday = day + '-' + month + '-' + year;

    //for mission StartDate date
    var TempStartDate = mission_start_date.split(' ');
    var tempvarforStartDate = TempStartDate[0].split('-');
    var startDateOfMission = tempvarforStartDate[0] + '-' + tempvarforStartDate[1] + '-' + tempvarforStartDate[2];

    var pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;

    if (pattern.test(publisheddate)) {
        $('#myStoryDate').removeClass('is-invalid');
    }
    else {
        $('#myStoryDate').addClass('is-invalid').siblings('.invalid-feedback').text('Please select valid date');
    }

    var dateFormOfStartDate = new Date(startDateOfMission);
    var dateFormOfChoosenDate = new Date(StoryPublishedDate);
    var dateFormOfToday = new Date(formattedDateOfToday);

    if (dateFormOfChoosenDate < dateFormOfStartDate || dateFormOfChoosenDate > dateFormOfToday) {
        $('#myStoryDate').addClass('is-invalid').siblings('.invalid-feedback').text('Please select valid date');
        console.log("hitted");
    }
    else {
        $('#myStoryDate').removeClass('is-invalid');
    }
    

    

    if (pathlist.length > 0 && $('.is-invalid').length === 0) {
        $.ajax({
            type: "POST",
            url: "/StoryRelated/DraftStory",


            data:
            {
                userID: userid,
                missionId: missionid,
                title: storytitle,
                publishedAt: publisheddate,
                description: description,
                status: status,
                pathlist: pathlist,
                url: url

            },
            success: function (data) {
                location.reload();
                alert("data successfully stored as draft");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('failed while storing: ' + textStatus + ', ' + errorThrown);

            }

        });
    }
  
});

//function for  DateFormatting
function DateFormattingforyyyymmdd(dateStr) {
    var dateParts = dateStr.split(" ");
    var date = dateParts[0].split("-");
    var formattedDate = date[2] + "-" + date[1] + "-" + date[0];
    return formattedDate;
}

/*for submit story*/
$("#submitBtn").on('click', function () {
    var userid = $("#myInputSelect").data('user-id');
    var missionid = $("#myInputSelect").val();
    var storytitle = $("#storyTitle").val();
    var missiontitle = $("#myInputSelect option:selected").text();
    var publisheddate = $("#myStoryDate").val();
    var status = "PUBLISHED";
    
    var description = CKEDITOR.instances.editor1.getData();
    var videoUrl = $("#myStoryVideo").val();
    console.log(videoUrl);
    var vId = videoUrl.split('v=')[1];
    var url = "https://www.youtube.com/embed/" + vId;



    console.log("User ID:", userid);
    console.log("Mission ID:", missionid);
    console.log("Story Title:", storytitle);
    console.log("Mission Title:", missiontitle);
    console.log("Published Date:", publisheddate);
    console.log("Description:", description);
    console.log("url:", url);

    (function () {
        'use strict'


        var forms = document.querySelectorAll('.needs-validation.sysvalidation')
        console.log(forms);

        Array.prototype.slice.call(forms)
            .forEach(function (form) {

                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')

            })
    })()

    

    $.ajax({
        type: "POST",
        url: "/StoryRelated/SubmitStory",
        data:
        {
            userID: userid,
            missionId: missionid,
            title: storytitle,
            publishedAt: publisheddate,
            description: description,
            status: status,
            url: url

        },
        success: function (data) {
            location.reload();
            alert("data is successfully stored");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('failed while storing: ' + textStatus + ', ' + errorThrown);
        }

    });
});

//for appear or disappear perticular buttons
var missionSelect = document.getElementById("myInputSelect");
missionSelect.addEventListener("change", function () {
    var userid = $("#myInputSelect").data('user-id');
    var missionid = $("#myInputSelect").val();

    $.ajax({
        type: "GET",
        url: "/StoryRelated/isStoryExist",
        data: {
            missionId: missionid,
            userId: userid,
        },
        success: function (data) {
            console.log(data);
            if (data.status == "DRAFT") {
                $("#submitBtn").prop("disabled", false);
                $("#SaveBtn").prop("disabled", false);
                $("#previewbtn").prop("disabled", false);
            }
            else if (data.status == "PUBLISHED") {
                $("#submitBtn").prop("disabled", true);
                $("#SaveBtn").prop("disabled", true);
                $("#previewbtn").prop("disabled", true);
                
                alert("there is alredy submitted story for this mission ")
            }
            else {
                $("#submitBtn").prop("disabled", true);
                $("#SaveBtn").prop("disabled", false);
                $("#previewbtn").prop("disabled", true);
                alert("please save the draft before submit");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#submitBtn").prop("disabled", true);
            $("#SaveBtn").prop("disabled", false);
            $("#previewbtn").prop("disabled", true);
            console.log('failed while storing: ' + textStatus + ', ' + errorThrown);

            alert("please save the draft before submit");
        }
    });
});
var paths = [];
//for getting data if draft is exist or not
$(document).ready(function () {
    // Define the paths array outside the $.ajax() call
    $('#myInputSelect').change(function () {
        var userId = $(this).data('user-id');
        var missionId = $(this).val();
        $.ajax({
            url: '/StoryRelated/GetStoryDraft',
            type: 'GET',
            data: { userId: userId, missionId: missionId },
            success: function (data) {
                // handle the returned data here
                if (data.length > 0) {
                    console.log(data);

                   
                    CKEDITOR.instances.editor1.setData(data[0].description);
                    $("#storyTitle").val(data[0].title);
                    var publishedDate = data[0].publishedAt;
                    var yyyymmdd = formatedate(publishedDate);
                    $("#myStoryDate").val(yyyymmdd);

                    paths = data[0].paths;

                    var videoURLs = [];

                    // Loop through each path in the paths array
                    for (var i = 0; i < paths.length; i++) {


                        if (paths[i].includes("https://www.youtube.com/embed/")) {

                            // Extract the video ID(token) from the link using a regular expression
                            var videoID = paths[i].match(/https:\/\/www.youtube.com\/embed\/(.*)/)[1];

                            // create the video URL using the video ID
                            var videoURL = "https://www.youtube.com/watch?v=" + videoID;

                            // Add the video URL to the videoURLs array
                            videoURLs.push(videoURL);
                        }
                    }


                    $("#myStoryVideo").val(videoURLs);


                    //filter the path which not contains link of video
                    paths = paths.filter(function (path) {
                        return !path.includes("https://www.youtube.com/embed/");
                    });

                    var imagesHtml = '';
                    for (var i = 0; i < paths.length; i++) {
                        imagesHtml += '<div class="selectedImageItem"><img src="' + paths[i] + '" /><span class="removeImageIcon" data-index="' + i + '">x</span></div>';

                    }
                    $(".selectedImage").html(imagesHtml);

                }
                else {
                    CKEDITOR.instances.editor1.setData('')
                    
                    $("#storyTitle").val('');
                    $("#myStoryDate").val('');
                    $(".selectedImage").html('');
                    $("#myStoryVideo").val('');

                }

            },
            error: function () {

                alert('there  is no any drfts is stored with this storyid and userid so you can save draft at now');

            }

        });
    });
    console.log(paths)
    $(document).on('click', '.removeImageIcon', function () {
        var index = $(this).data('index');
        paths.splice(index, 1); // Remove the element from the array
        $(this).closest('.selectedImageItem').remove(); // Remove the corresponding image tag
        console.log(paths);
    });
});


/*function that converts datetime to yyyy-mm-dd format*/
function formatedate(datetime) {
    const inputDateStr = datetime;
    const date = new Date(inputDateStr);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const outputDateStr = `${year}-${month}-${day}`;
    console.log(outputDateStr);
    return outputDateStr;

}