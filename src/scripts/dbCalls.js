const baseURL = "http://localhost:8088/";
const dbCalls = {
    addNewDestination: function (obj) {
        return fetch(`${baseURL}places`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    getPlaces: function () {
        return fetch(`${baseURL}places?_embed=interests`)
            .then(response => response.json())
    },
    getSinglePlace: function (placeId) {
        return fetch(`${baseURL}places/${placeId}`)
            .then(response => response.json())
    },
    editPlace: function (placeId, obj) {
        return fetch(`${baseURL}places/${placeId}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    deletePlace: function (placeId) {
        return fetch(`${baseURL}places/${placeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
    addNewInterest: function (obj) {
        return fetch(`${baseURL}interests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    getSingleInterest: function (interestId) {
        return fetch(`${baseURL}interests/${interestId}?_expand=place`)
            .then(response => response.json())
    },
    getAllInterests: function () {
        return fetch(`${baseURL}interests?_expand=place`)
            .then(response => response.json())
    },
    editInterest: function (interestId, obj) {
        return fetch(`${baseURL}interests/${interestId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    deleteInterest: function (interestId) {
        return fetch(`${baseURL}interests/${interestId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    }
}

export default dbCalls;


