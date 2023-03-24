console.log("hello");
$("#SaveBtn").on('click', function () {
    var userid = $("#myInputSelect").data('user-id');
    var missionid = $("#myInputSelect").val();
    var storytitle = $("#storyTitle").val();
    var missiontitle = $("#myInputSelect option:selected").text();
    var publisheddate = $("#myStoryDate").val();
    var status = "DRAFT";
    var description = CKEDITOR.instances.editor1.editable().getText();

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

        },
        success: function (data) {

            alert("data successfully stored as draft");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('failed while storing: ' + textStatus + ', ' + errorThrown);

        }

    });
});

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