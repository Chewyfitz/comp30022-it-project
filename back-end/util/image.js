<<<<<<< HEAD
const database = require('../database.js');

=======
// ============================================================================
// Libraries
const database = require('../database.js');

// Google Cloud Vision to label images (not yet implemented)
var vision = require('@google-cloud/vision');

// Google Cloud Storage to store uploaded images
const { Storage } = require('@google-cloud/storage');
// config is the result of some extra code to parse a JSON environment variable
var config = require('../config/gcsConfig');

const gcs = new Storage(config());

// ============================================================================
// Functions

>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
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
<<<<<<< HEAD
=======
    // ... pretty much just call the database function
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
    success = database.addPhoto(user, image, photoDateTime);
    return success;
}

<<<<<<< HEAD
=======
// TODO: add photoDateTimes
// TODO: change successes to document IDs
async function addPhotosToUser(user, images){
    var successes = []
    console.log("addPhotosToUser: "+images);
    // Iterate through each image and add it individually
    for(i in images){
        console.log(`image: ${images[i]}`);
        await addPhotoToUser(user, images[i]).then(imageref => {
            // return an id for each image input attempt
            successes.push(imageref);
        })
    }

    return successes;
}

>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
// TODO: Implement Deletions
async function deletePhotoById(user, image){
    console.log("Err: Incomplete Function deletePhotoById");
}

<<<<<<< HEAD
module.exports = {
    getImageById,
    getImageRefById,
    addPhotoToUser,
    deletePhotoById
=======
// Thanks to Rowan for figuring out how all this works!
async function uploadPhotos(files){
    // Set the information for the uploaded file
    var bucket = gcs.bucket(`gs://${process.env.PROJECTID}.appspot.com`);
    var strings = [];
    for(i in files){
        // filename -- include username?
        const gcsname = `${Date.now()}-${files[i].originalname}`;
        const file = bucket.file(gcsname); // prepare the file
        const stream = file.createWriteStream({ // Set the stream config
            metadata: {
                contentType: files[i].mimetype
            },
            resumable: false
        });
        // Log any errors in the upload stream
        stream.on('error', err => {
            // Not sure what this does
            files[i].cloudStorageError = err;
            console.error(err);
        });

        // add the reference for the file to the list
        const uri = `https://storage.googleapis.com/${bucket.name}/${gcsname}`
        strings[i] = uri;
        console.log(`URI ${i}: ${uri}`);

        // make the file public when the stream finishes
        stream.on('finish', async () => {
            file.makePublic();
        });

        // end the stream
        stream.end(files[i].buffer);
    }

    // Return the list of URIs
    return strings;
}

module.exports = {
    addPhotoToUser,
    addPhotosToUser,
    deletePhotoById,
    getImageById,
    getImageRefById,
    uploadPhotos
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
}