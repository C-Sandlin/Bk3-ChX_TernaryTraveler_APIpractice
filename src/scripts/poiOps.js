import dbCalls from "./dbCalls";


const poi = {
    renderPOI: function (interest, parentId) {
        const poiContainer = document.querySelector(`#all-poi-container-${parentId}`);
        poiContainer.innerHTML += `
            <div id="poi-container--${interest.id}" class="poi-card">
            <div class="poi-action-container">
                <i class="fas fa-plus add-poi-btn" id="add-poi-btn--${interest.id}"></i>
                <i class="fas fa-pen edit-interest-btn" id="interest-edit-btn--${interest.id}"></i>
                <i class="far fa-times-circle delete-interest-btn" id="interest-delete-btn--${interest.id}"></i>
            </div>
            <div class="all-other-info">
                <div class="poi-img-container">
                    <img class="poi-image" src="${interest.url}">
                </div>
                <div class="poi-info-container">
                    <h4>${interest.name}</h4>
                    <p class="poi-cost">$${interest.cost}</p>
                    <p class="poi-desc">${interest.description}</p>
                    <p class="poi-review">${interest.review}</p>
                </div>
            </div>
        </div>
        `
    },
    poiForm: function () {
        const informationContainer = document.querySelector("#information-container");
        informationContainer.innerHTML = `
        <div class="edit-poi-container">
            <input type="text" id="poiId2" class="hidden" placeholder="" value="">
            <select id="placeId-dropdown">
            </select>
            <input type="text" id="poiName" class="" placeholder="Enter the Name for the Point Of Interest">
            <input type="text" id="poiCost" placeholder="$0.00">
            <textArea id="poiDesc" class="" placeholder="Description"></textArea>
            <textArea id="poiReview" class="" placeholder="Review"></textArea>
            <input type="text" id="poiURL" placeholder="http://www.">
            <input id="new-poi-submit" type="submit" value="Submit">
        </div>
        `;

        const selectMenu = document.querySelector("#placeId-dropdown");

        dbCalls.getPlaces().then(results => {
            results.forEach(result => {
                console.log("result.id", result.id);
                selectMenu.innerHTML += `
                <option value=${result.id}>${result.name}</option>
                `;
            })
        })
    },
    populatePoiForm: function (poiId) {
        const poiId2 = document.querySelector("#poiId2");
        const poiDropdown = document.querySelector("#placeId-dropdown");
        const poiName = document.querySelector("#poiName");
        const poiCost = document.querySelector("#poiCost");
        const poiDesc = document.querySelector("#poiDesc");
        const poiURL = document.querySelector("#poiURL");
        const poiReview = document.querySelector("#poiReview");

        //good to go
        const submitBtn = document.querySelector("#new-poi-submit");
        submitBtn.setAttribute("id", "edited-poi-submit");

        dbCalls.getSingleInterest(poiId).then(results => {
            for (let key in results) {
                if (results.hasOwnProperty(key)) {
                    poiId2.value = results.id;
                    console.log("poiId2Val", poiId2.value);
                    poiDropdown.value = results.place.name;
                    poiName.value = results.name;
                    poiCost.value = results.cost;
                    poiDesc.value = results.description;
                    poiURL.value = results.url;
                    poiReview.value = results.review;
                }
            }
        })
    },
    createEditedPOIObj: function () {
        const poiId2 = document.querySelector("#poiId2");
        const poiDropdown = document.querySelector("#placeId-dropdown");
        const poiName = document.querySelector("#poiName");
        const poiCost = document.querySelector("#poiCost");
        const poiDesc = document.querySelector("#poiDesc");
        const poiURL = document.querySelector("#poiURL");
        const poiReview = document.querySelector("#poiReview");

        const editedPoiObj = {
            id: Number(poiId2.value),
            placeId: Number(poiDropdown.value),
            name: poiName.value,
            description: poiDesc.value,
            cost: poiCost.value,
            review: poiReview.value,
            url: poiURL.value
        }
        return editedPoiObj;
    }
}


export default poi;