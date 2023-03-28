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
            newImage.controls = true; // show controls for video element

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

//For disable the submit button if story is not saved as draft in database 


    var missionSelect = document.getElementById("myInputSelect");
    missionSelect.addEventListener("change", function () {
        var userid = $("#myInputSelect").data('user-id');
        var missionid = $("#myInputSelect").val();

        $.ajax({
            type: "GET",
            url: "/isStoryExist",
            data: {
                missionId: missionid,
                userId: userid,
            },
            success: function (data) {
                if (data.isStoryExist) {
                    
                    console.log("Story exists in DRAFT status");
                    $("#submitBtn").removeClass('btn-primary');
                    $("#submitBtn").prop("disabled", false);
                    $("#SaveBtn").prop("disabled", false);
                } else {
                    
                    console.log("No story exists or story exists in PUBLISHED status");
                    $("#submitBtn").addClass('btn-primary');
                    $("#submitBtn").prop("disabled", true);
                    $("#SaveBtn").prop("disabled", false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('failed while storing: ' + textStatus + ', ' + errorThrown);
            }
        });
    });
