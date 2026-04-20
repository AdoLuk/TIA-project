const BLOCKS_STORAGE_KEY = "blocks";

let storage = localStorage;

function getBlocks(id) {
    //return Promise.resolve(SAMPLE_BLOCKS); // this is just mock data
    const url = new URL("/api/v1/blocks", window.location.origin);
    if (id != null) url.searchParams.set("block_id", id);
    return fetch(url, {
        method: "GET",
        credentials: "include"
    }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                if (response.status === 401) {
                    throw new Error("Unauthorized - you don't have permission to access this function.");
                }
                throw new Error("Error getting blocks");
            }
            return response.json();
        });
}

function editBlock(id, block) {
    const url = new URL("/api/v1/blocks", window.location.origin);
    if (id != null) url.searchParams.set("block_id", id);
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(block),
        credentials: "include"
    }).then(  // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                if (response.status === 401) {
                    throw new Error("Unauthorized - you don't have permission to access this function.");
                }
                throw new Error("Error editing block");
            }
            return response.json();
        })
}

function addBlock(block) {
    return fetch("/api/v1/blocks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(block)
    });
}

export { getBlocks, editBlock, addBlock };