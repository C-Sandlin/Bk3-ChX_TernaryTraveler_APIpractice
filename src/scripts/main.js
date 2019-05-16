/* fix doubled entries due to window onload;refactor.then(places =>) thing;*/



import dbCalls from "./dbCalls";
import placesOps from "./placesOps";
import poiOps from "./poiOps";

const infoContainer = document.querySelector("#information-container");
const homeLink = document.querySelector("#home-link");
const mainDiv = document.querySelector("#mainDiv");


// LOAD ALL DESTINATIONS ON PAGE LOAD //
homeLink.addEventListener("click", (e) => {
    const informationContainer = document.querySelector("#information-container");
    informationContainer.innerHTML = "";
    renderAllThingsToDom();
});

// RENDER ALL THINGS TO DOM (PLACES and POIs) //
function renderAllThingsToDom() {
    infoContainer.innerHTML = "";
    dbCalls.getPlaces()
        .then(places => {
            const placesArray = places;
            placesArray.forEach(place => {
                placesOps.renderPlaces(place);
                place.interests.forEach(interest => {
                    const destination = interest.placeId;
                    poiOps.renderPOI(interest, destination);
                })
            })
        })
};

// POPULATE EDIT DESTINATION FORM //
infoContainer.addEventListener("click", (e) => {
    let itemArray = e.target.id.split("--");
    let targetId = itemArray[1];
    console.log(e.target.id);
    console.log("targetId", targetId);

    if (e.target.classList.contains("edit-location-btn")) {
        placesOps.placesForm();
        placesOps.populateForm(targetId);
    }
});

// SUBMIT EDITED DESTINATION //
infoContainer.addEventListener("click", (e) => {
    if (e.target.id === "edited-destination-submit") {
        const obj = placesOps.createEditedDestinationObj();
        let targetId = obj.id;
        dbCalls.editPlace(targetId, obj).then(() => {
            renderAllThingsToDom();
        })
    }
});

// DELETE DESTINATIONS //
infoContainer.addEventListener("click", (e) => {
    let itemArray = e.target.id.split("--");
    let targetId = itemArray[1];

    if (e.target.classList.contains("delete-location-btn")) {
        if (confirm("Are you sure you want to delete this Destination?") == true) {
            dbCalls.deletePlace(targetId).then(() => {
                renderAllThingsToDom();
            })
        }
    }
})


// POPULATE EDIT POI FORM //
infoContainer.addEventListener("click", (e) => {
    let itemArray = e.target.id.split("--");
    let targetId = itemArray[1];
    console.log(e.target.id);
    console.log("targetId", targetId);

    if (e.target.classList.contains("edit-interest-btn")) {
        console.log(targetId);
        poiOps.poiForm();
        poiOps.populatePoiForm(targetId);
    }
});

// SUBMIT EDITED POI //
infoContainer.addEventListener("click", (e) => {
    if (e.target.id === "edited-poi-submit") {

        const obj = poiOps.createEditedPOIObj();
        console.log(obj)
        let targetId = obj.id;
        dbCalls.editInterest(targetId, obj).then(() => {
            renderAllThingsToDom();
        })
    }
});

// DELETE POI //
infoContainer.addEventListener("click", (e) => {
    let itemArray = e.target.id.split("--");
    let targetId = itemArray[1];

    if (e.target.classList.contains("delete-interest-btn")) {
        if (confirm("Are you sure you want to delete this Point of Interest?") == true) {
            dbCalls.deleteInterest(targetId).then(() => {
                renderAllThingsToDom();
            })
        }
    }
});
