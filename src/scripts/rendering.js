import dbCalls from "./dbCalls";
import placesOps from "./placesOps";
import poiOps from "./poiOps";

const infoContainer = document.querySelector("#information-container");

const renderingOps = {
    renderAllThingsToDom: function () {
        infoContainer.innerHTML = "";
        renderingOps.renderAddButtons();
        dbCalls.getPlaces()
            .then(places => {
                Promise.all(places)
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
            })
    },
    renderAddButtons: function () {
        infoContainer.innerHTML = `
            <div id="add-buttons-container">
                    <button class="add-poi-btn" id="">Add New POI</button>
                    <button class="add-location-btn" id="">Add New Destination</button>
            </div>
        `;
    }
}

export default renderingOps;