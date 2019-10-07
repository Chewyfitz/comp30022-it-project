const database = require('../database.js');

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
    success = database.addPhoto(user, image, photoDateTime);
    return success;
}

// TODO: Implement Deletions
async function deletePhotoById(user, image){
    console.log("Err: Incomplete Function deletePhotoById");
}

module.exports = {
    getImageById,
    getImageRefById,
    addPhotoToUser,
    deletePhotoById
}