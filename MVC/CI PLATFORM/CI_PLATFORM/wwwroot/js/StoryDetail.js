function openNav() {
    document.getElementById("mySidebar1").style.width = "250px";
    document.getElementById("main1").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar1").style.width = "0";
    document.getElementById("main1").style.marginLeft = "0";
}
function openNav2() {
    document.getElementById("mySidebar2").style.width = "250px";
    document.getElementById("main2").style.marginLeft = "250px";
}

function closeNav2() {
    document.getElementById("mySidebar2").style.width = "0";
    document.getElementById("main2").style.marginLeft = "0";
}


function showView(viewName) {
    $('.all-view').addClass('d-none')

    if (viewName == 'grid') {
        $('#products').removeClass("d-none")
    }
    else if (viewName == "list") {
        $('#myListView').removeClass("d-none")
    }
}

function show(image_id) {
    console.log("run");

    document.getElementById('id12')
        .style.display = "none";
    document.getElementById('id1')
        .style.display = "none";
    document.getElementById('id2')
        .style.display = "none";
    document.getElementById('id3')
        .style.display = "none";
    document.getElementById('id4')
        .style.display = "none";
    document.getElementById('id5')
        .style.display = "none";
    document.getElementById('id6')
        .style.display = "none";
    document.getElementById(image_id)
        .style.display = "block";



}
let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})




//for recommanded to coworker
$("#RecommandationBtn button").on('click', function () {
    console.log("click");
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
            toastr.success(' Mail sent successfully ');
        },
    });
})
//for displaying images in story carousal
function displayImage(img) {
    var selectedImage = document.getElementById("selectedImage");
    var videoFrame = document.getElementById("video1");
    selectedImage.classList.remove("d-none");
    videoFrame.classList.add("d-none");

    selectedImage.src = img.src;
}

//for displaying VIDEO in story carousal
function displayVideo(img) {

    var selectedImage = document.getElementById("selectedImage");
    var videoFrame = document.getElementById("video1");
    selectedImage.classList.add("d-none");
    videoFrame.classList.remove("d-none");
    videoFrame.classList.add("d-block");
    var videoUrl = $('#ivideo').data('url');
    console.log(videoUrl);

    videoFrame.src = videoUrl;
    console.log(selectedImage);
    console.log(videoFrame);

}