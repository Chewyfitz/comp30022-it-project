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
    general.addDataToDoc(data, photosPath(userID));
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
    photosPath: function () {photosPath();},
    addPhoto: function (userID, photoReference, photoDateTime) {addPhoto(userID, photoReference, photoDateTime);},
    updateDateTime: function (userID, photoID, dateTime) {updatePhotoDateTime(userID, photoID, dateTime);},
    updatePhotoDescription: function (userID, photoID, description) {updatePhotoDescription(userID, photoID, description)},
    updatePhotoReference: function (userID, photoID, reference) {updatePhotoReference(userID, photoID, reference);},
};