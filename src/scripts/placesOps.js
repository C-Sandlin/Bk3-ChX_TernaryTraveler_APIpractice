import dbCalls from "./dbCalls";
import poi from "./poiOps";


const placesOps = {
    renderPlaces: function (place) {
        const informationContainer = document.querySelector("#information-container");
        informationContainer.innerHTML += `
            <div id="location-container--${place.id}" class="location-card">
            <div class="places-action-container">
                <i class="fas fa-pen edit-location-btn" id="location-edit-btn--${place.id}"></i>
                <i class="far fa-times-circle delete-location-btn" id="location-delete-btn--${place.id}"></i>
            </div>
            <div id="info-container">
                <h2>${place.name}</h2>
                <p class="visa-req">Visa required: ${place.visa_required}</p>
                <div class="all-poi-container" id="all-poi-container-${place.id}">
                </div>
            </div>
        </div>
        `
    },
    placesForm() {
        const informationContainer = document.querySelector("#information-container");
        informationContainer.innerHTML = `
        <div class="edit-container">
            <input type="text" id="locationId" class="hidden" placeholder="">
            <p>Destination:</p>
            <input type="text" id="locationName" class="" placeholder="Enter a Location Name">
            <p>Visa Required:</p>
            <input type="radio" id="visaReqs-true" class="" value="true" name="visa" label="True">True
            <input type="radio" id="visaReqs-false" class="" value="false" name="visa" label="False">False
            <br>
            <input id="new-destination-submit" type="submit" value="Submit">
        </div>
        `;
    },
    populateForm: function (placeId) {
        const locationId = document.querySelector("#locationId");
        const name = document.querySelector("#locationName");
        const visa1 = document.querySelector("#visaReqs-true");
        const visa2 = document.querySelector("#visaReqs-false");

        const submitBtn = document.querySelector("#new-destination-submit");
        submitBtn.setAttribute("id", "edited-destination-submit");

        dbCalls.getSinglePlace(placeId).then(results => {
            for (let key in results) {
                if (results.hasOwnProperty(key)) {
                    locationId.value = results.id;
                    console.log("locationId:", locationId.value);
                    name.value = results.name;
                    if (results.visa_required == true) {
                        visa1.checked = true;
                    }
                    if (results.visa_required == false) {
                        visa2.checked = true;
                    }
                }
            }
        })
    },
    createEditedDestinationObj: function (placeId) {
        const locationId = document.querySelector("#locationId");
        const name = document.querySelector("#locationName");
        const visa = document.querySelector("input[name='visa']") === "true";
        const visa1 = document.querySelector("#visaReqs-true");
        const visa2 = document.querySelector("#visaReqs-false");

        if (visa1.checked) {
            visa.value = true;
        }
        if (visa2.checked) {
            visa.value = false;
        }
        console.log("visa status", visa.value);
        const editedObj = {
            id: Number(locationId.value),
            name: name.value,
            visa_required: visa.value
        }
        console.log("editedObj", editedObj);
        return editedObj;
    }
}

export default placesOps;

