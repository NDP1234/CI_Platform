﻿// -----------------------------------------------------------------------------------------------------------------  
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
    var userid = $("#myInputSelect").data('user-id');
    var missionid = $("#myInputSelect").val();
    var storytitle = $("#storyTitle").val();
    var missiontitle = $("#myInputSelect option:selected").text();
    var publisheddate = $("#myStoryDate").val();
    var status = "DRAFT";
    var description = CKEDITOR.instances.editor1.editable().getText();

    var pathlist = selectedImagesBase64;
    
    console.log(pathlist)
    console.log("User ID:", userid);
    console.log("Mission ID:", missionid);
    console.log("Story Title:", storytitle);
    console.log("Mission Title:", missiontitle);
    console.log("Published Date:", publisheddate);
    console.log("Description:", description);

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
            pathlist: pathlist

        },
        success: function (data) {

            alert("data successfully stored as draft");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('failed while storing: ' + textStatus + ', ' + errorThrown);

        }

    });
});

/*for submit story*/
$("#submitBtn").on('click', function () {
    var userid = $("#myInputSelect").data('user-id');
    var missionid = $("#myInputSelect").val();
    var storytitle = $("#storyTitle").val();
    var missiontitle = $("#myInputSelect option:selected").text();
    var publisheddate = $("#myStoryDate").val();
    var status = "PUBLISHED";
    var description = CKEDITOR.instances.editor1.editable().getText();
 
    console.log("User ID:", userid);
    console.log("Mission ID:", missionid);
    console.log("Story Title:", storytitle);
    console.log("Mission Title:", missiontitle);
    console.log("Published Date:", publisheddate);
    console.log("Description:", description);

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


        },
        success: function (data) {
         
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
            }
            else if (data.status == "PUBLISHED") {
                $("#submitBtn").prop("disabled", true);
                $("#SaveBtn").prop("disabled", true);
            }
            else {
                $("#submitBtn").prop("disabled", true);
                $("#SaveBtn").prop("disabled", false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('failed while storing: ' + textStatus + ', ' + errorThrown);
            $("#submitBtn").prop("disabled", true);
            $("#SaveBtn").prop("disabled", false);
        }
    });
});

//for getting data if draft is exist or not
$(document).ready(function () {
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

                    CKEDITOR.instances.editor1.editable().setText(data[0].description);
                    $("#storyTitle").val(data[0].title);
                    /*$("#myStoryDate").val(data[0].publishedAt);*/
                    var publishedDate = data[0].publishedAt;
                    var yyyymmdd = formatedate(publishedDate);
                    $("#myStoryDate").val(yyyymmdd);
                    var paths = data[0].paths;
                    var imagesHtml = '';
                    for (var i = 0; i < paths.length; i++) {
                        imagesHtml += '<img class="selectedImageItem" src="' + paths[i] + '" />';
                        
                    }
                    $(".selectedImage").html(imagesHtml);
                    
                }
                else {
                    CKEDITOR.instances.editor1.editable().setText('');
                    $("#storyTitle").val('');
                    $("#myStoryDate").val('');
                    $(".selectedImage").html('');
                    //alert('there  is no any drfts is stored with this storyid and userid so you can save draft at now');
                }

            },
            error: function () {
               
                alert('there  is no any drfts is stored with this storyid and userid so you can save draft at now');
                
            }
            
        });
    });
});

/*function that converts datetime to yyyy-mm-dd format*/
function formatedate(datetime){
    const inputDateStr = datetime;
    const date = new Date(inputDateStr);

    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    const outputDateStr = `${year}-${month}-${day}`;
    console.log(outputDateStr); 
    return outputDateStr;

}
console.log("jdfdsjf")
//for recommended to co-worker functionality
$("#RecommandationBtn").on('click', function () {
    cosole.log("click");
    var udetails = $(this).attr('value');
    var arr = udetails.split(" ");
    var Recommanded = {
        SId: arr[0],
        FromUid: arr[1],
        Uid: arr[2],
        Uemail: arr[3]
    };
    console.log(Recommanded);
    var url = "/StoryRelated/RecommandToCoWorker?Recommanded=" + JSON.stringify(Recommanded);

    $.ajax({
        url: url,
        success: function (data) {
            window.location.reload();
        },
    });
})