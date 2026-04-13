const BLOCKS_STORAGE_KEY = "blocks";

let storage = localStorage;

function getBlocks() {
    //return Promise.resolve(SAMPLE_BLOCKS); // this is just mock data
    
    return fetch("/api/v1/blocks").then(  // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting blocks");
            }
            return response.json();
        }).catch((error) => {               // promise is rejected  
            // Better way would be to throw error here and let the 
            // client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting blocks");
            //console.error(error);
            return [];
        });/**/
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


function clearBlocks() {
    return storage.removeItem(BLOCKS_STORAGE_KEY);
}

export { getBlocks, clearBlocks };