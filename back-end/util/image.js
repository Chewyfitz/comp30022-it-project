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

// TODO: Implement Uploads
async function uploadPhotoToUser(user, image){
    console.log("Err: Incomplete Function uploadPhotoToUser");
}

// TODO: Implement Deletions
async function deletePhotoById(user, image){
    console.log("Err: Incomplete Function deletePhotoById");
}

module.exports = {
    getImageById,
    getImageRefById,
    uploadPhotoToUser,
    deletePhotoById
}