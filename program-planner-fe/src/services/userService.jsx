const EVENTS_STORAGE_KEY = "users";

let storage = localStorage;

// function getEvents(id) {
//     //return Promise.resolve(SAMPLE_EVENTS); // this is just mock data
//     const url = new URL("/api/v1/events", window.location.origin);
//     if (id != null) url.searchParams.set("event_id", id);
//     return fetch(url, {
//         method: "GET",
//         credentials: "include"
//     }).then(
//         (response) => {
//             if (!response.ok) { // HTTP status code NOT between 200-299
//                 if (response.status === 401) {
//                     throw new Error("Unauthorized - you don't have permission to access this function.");
//                 }
//                 throw new Error("Error getting events");
//             }
//             return response.json();
//         });
// }

function getUsername(id) {
    const url = new URL("/api/v1/users/username", window.location.origin);
    url.searchParams.set("user_id", id);
    return fetch(url, {
        method: "GET",
        credentials: "include"
    }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                if (response.status === 401) {
                    throw new Error("Unauthorized - you don't have permission to access this function.");
                }
                throw new Error("Error getting username");
            }
            return response.json();
        });
}

// function editEvent(id, event) {
//     const url = new URL("/api/v1/events", window.location.origin);
//     if (id != null) url.searchParams.set("event_id", id);
//     return fetch(url, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(event),
//         credentials: "include"
//     }).then(  // promise is resolved
//         (response) => {
//             if (!response.ok) { // HTTP status code NOT between 200-299
//                 if (response.status === 401) {
//                     throw new Error("Unauthorized - you don't have permission to access this function.");
//                 }
//                 throw new Error("Error editing event");
//             }
//             return response.json();
//         })
// }

// function addEvent(event) {
//     return fetch("/api/v1/events", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(event)
//     });
// }

export { getUsername };