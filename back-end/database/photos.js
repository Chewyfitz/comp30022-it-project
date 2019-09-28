const general = require('./general_database');

/*Fields that are stored in the database*/
const photoFields = {
    reference: "Photo Reference",
    name: "Photo Name",
    dateTime: "Photo DateTime",
    description: "Photo Description"
};


//Adds the photo reference to the user
function addPhoto(userID, photoReference, photoDateTime) {
    let data = {
        Photo_Reference: photoReference,
        Photo_DateTime: photoDateTime,
        Photo_Description: "",
    };
    console.log("written photo");
    general.addDataToDoc(data, general.photosPath(userID));
}

/**/
function updatePhotoDateTime(userID, photoID, dateTime){
    let data = {};
    data[photoFields.dateTime] = dateTime;
    general.updateDataInDoc(data, photosPath(userID), photoID);
}

function updatePhotoDescription(userID, photoID, description){
    let data = {};
    data[photoFields.description] = description;
    general.updateDataInDoc(data, photosPath(userID), photoID);
}

function updatePhotoReference(userID, photoID, reference){
    let data = {};
    data[photoFields.reference] = reference;
    general.updateDataInDoc(data, photosPath(userID), photoID);
}


module.exports = {
    photoFields: photoFields,
    addPhoto:addPhoto,
    updateDateTime: updatePhotoDateTime,
    updatePhotoDescription: updatePhotoDescription,
    updatePhotoReference: updatePhotoReference,
};