// ============================================================================
// Libraries
const database = require('../database.js');

// Google Cloud Vision to label images (not yet implemented)
var vision = require('@google-cloud/vision');

// Google Cloud Storage to store uploaded images
const { Storage } = require('@google-cloud/storage');
// config is the result of some extra code to parse a JSON environment variable
var config = require('../config/gcsConfig');

const gcs = new Storage(config);

// ============================================================================
// Functions

async function getImageById(user, imageId){
    console.log("getImageById: "+imageId);
    photoData = await database.getPhotoData(user, imageId);
    return photoData;
}

async function getImageRefById(user, imageId){
    // Retrieve the image URL/reference from the database
    console.log("getImageRefById: "+imageId);
    photoData = await database.getPhotoData(user, imageId);
    return photoData.reference;
}

/**
 * Add a new photo to a given user.
 * This might need extra processing, deal with that when required. 
 * @param {String} user - the username of the owner of the image
 * @param {String} image - url/reference to the image that's being added
 * @param {String} photoDateTime - datetime as string
 */
async function addPhotoToUser(user, image, photoDateTime = null){
    // ... pretty much just call the database function
    success = database.addPhoto(user, image, photoDateTime);
    return success;
}

// TODO: add photoDateTimes
// TODO: change successes to document IDs
async function addPhotosToUser(user, images){
    var successes = []
    // Iterate through each image and add it individually
    images.foreach(image => {
        // Return a success status for each image attempt
        successes.push(await addPhotoToUser(user, image));
    });
    return successes;
}

// TODO: Implement Deletions
async function deletePhotoById(user, image){
    console.log("Err: Incomplete Function deletePhotoById");
}

// Thanks to Rowan for figuring out how all this works!
async function uploadPhotos(files){
    // Set the information for the uploaded file
    var bucket = gcs.bucket('gs://'+process.env.PROJECTID+'.appspot.com');
    // filename -- include username?
    const gcsname = `${Date.now()}-${files[0].originalname}`
    const file = bucket.file(gcsname); // Prepare the file
    const stream = file.createWriteStream({ // Set the stream config
        metadata: {
            contentType: files[0].mimetype
        },
        resumable: false
    });
    // If the upload stream errors, log it.
    stream.on('error', err => {
        files[0].cloudStorageError = err;
        console.log(err);
    });
    // If the stream finishes, we can return a URI
    stream.on('finish', async () => {
        return file.makePublic().then( async () => {
            // If there are more images we'll deal with those before we return
            if(files.length > 1){
                console.log("extra photo");
                // Remove the head of the list
                files = files.slice(1);
                // call createPhoto recursively
                extras = await createPhoto(files);
            } else {
                extras = []
            }
            // Concatenate any extra images and return the list
            return [`https://storage.googleapis.com/${bucket.name}/${gcsname}`].concat(extras);
        });
    }).catch( err => {
        console.error("ERROR: ", err);
    });
    stream.end(files[0].buffer);
}

module.exports = {
    addPhotoToUser,
    addPhotosToUser,
    deletePhotoById,
    getImageById,
    getImageRefById,
    uploadPhotos
}