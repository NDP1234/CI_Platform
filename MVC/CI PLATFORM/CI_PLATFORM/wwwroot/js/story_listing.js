
let totalStories = document.getElementsByClassName("item");

let searchbar = document.getElementById("search-input");





let cardtitle = document.getElementsByClassName("card-title");

let notfound = document.getElementById("NoMissionFound");



searchbar.addEventListener("input", search_mission);




function search_mission() {
    let count = 0;
    let input = searchbar.value;
    input = input.toLowerCase();

    for (i = 0; i < totalStories.length; i++) {
        if (!cardtitle[i].innerHTML.toLowerCase().includes(input)) {
            totalStories[i].classList.add("hidden");


        }
        else {
            totalStories[i].classList.remove("hidden");
        }
    }



    for (i = 0; i < totalStories.length; i++) {
        if (totalStories[i].classList.contains("hidden")) {
            count++;
        }
    }

    console.log(count, totalStories.length)

    if (count == totalStories.length) {
        notfound.classList.remove('hidden');
       
    }
    else {
        notfound.classList.add('hidden');
   

    }

}