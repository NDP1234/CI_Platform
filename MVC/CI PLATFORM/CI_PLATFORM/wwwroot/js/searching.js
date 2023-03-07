
let totalMissions = document.getElementsByClassName("item");

let searchbar = document.getElementById("search-input");

let searchsmall = document.getElementById("search_small");

let cardtitle = document.getElementsByClassName("card-title");  

let notfound = document.getElementById("NoMissionFound");

let missiondata = document.getElementById("mission-list");

searchbar.addEventListener("input", search_mission);
searchsmall.addEventListener("input", search_mission);



function search_mission() {
    let count = 0;
    let input = searchbar.value || searchsmall.value;
    input = input.toLowerCase();

    for (i = 0; i < totalMissions.length; i++) {
        if (!cardtitle[i].innerHTML.toLowerCase().includes(input)) {
            totalMissions[i].classList.add("hidden");


        }
        else {
            totalMissions[i].classList.remove("hidden");
        }
    }


    for (i = 0; i < totalMissions.length; i++) {
        if (totalMissions[i].classList.contains("hidden")) {
            count++;
        }
    }

    console.log(count, totalMissions.length)

    if (count == totalMissions.length) {
        notfound.classList.remove('hidden');
        missiondata.classList.add('hidden');
    }
    else {
        notfound.classList.add('hidden');
        missiondata.classList.remove('hidden');

    }

}