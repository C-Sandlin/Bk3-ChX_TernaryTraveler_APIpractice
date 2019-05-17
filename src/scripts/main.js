/* fix doubled entries due to window onload;refactor.then(places =>) thing;*/



import dbCalls from "./dbCalls";
import placesOps from "./placesOps";
import poiOps from "./poiOps";
import renderingOps from "./rendering";

const infoContainer = document.querySelector("#information-container");
const allDestinations = document.querySelector("#clickDown-container");
const mainDiv = document.querySelector("#mainDiv");

console.log("NEED TO ADD BUTTON TO ADD NEW DESTINATION, NEED BUTTON TO ADD NEW POI.");
console.log("NEED TO CREATE LANDING PAGE WITH FULL IMAGE AND FLOATING TEXT");
console.log("INCORPORATE MODALS INTO DESIGN");


// LOAD ALL DESTINATIONS ON PAGE LOAD //
allDestinations.addEventListener("click", (e) => {
    const informationContainer = document.querySelector("#information-container");
    informationContainer.innerHTML = "";
    renderingOps.renderAllThingsToDom();
    window.scroll({
        top: 1080,
        left: 0,
        behavior: 'smooth'
    });
});


// PULL UP ADD NEW DESTINATION FORM//
infoContainer.addEventListener("click", () => {
    if (event.target.classList.contains("add-location-btn")) {
        placesOps.placesForm();
    }
})

// SUBMIT NEW DESTINATION //
infoContainer.addEventListener("click", () => {
    if (event.target.id === "new-destination-submit") {
        const obj = placesOps.createEditedDestinationObj();
        dbCalls.addNewDestination(obj);
        renderingOps.renderAllThingsToDom();
    }
})

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
            renderingOps.renderAllThingsToDom();
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
                renderingOps.renderAllThingsToDom();
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
            renderingOps.renderAllThingsToDom();
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
                renderingOps.renderAllThingsToDom();
            })
        }
    }
});

// PULL UP ADD NEW POI FORM//
infoContainer.addEventListener("click", () => {
    if (event.target.classList.contains("add-poi-btn")) {
        poiOps.poiForm();
    }
})

// SUBMIT NEW POI //
infoContainer.addEventListener("click", () => {
    if (event.target.id === "new-poi-submit") {
        const obj = poiOps.createEditedPOIObj();
        dbCalls.addNewInterest(obj)
        renderingOps.renderAllThingsToDom();
    }
})
