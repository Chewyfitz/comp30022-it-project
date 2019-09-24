var general = require('./general_database');

/*Name of the collections the database stores*/
const photoCollection = 'Photos';

/*Fields that are stored in the database*/
//Photos
const photoFields = {
    reference: "Photo Reference",
    name: "Photo Name",
    dateTime: "Photo DateTime",
    description: "Photo Description"
};
const userCollection = require('./users').userCollection;

/*Functions for generating database navigation paths*/
function photosPath(userID) {
    return userCollection+'/'+userID+'/'+photoCollection}

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

module.exports = {
    photoCollection: photoCollection,
    photoFields: photoFields,
    photosPath: function () {photosPath();},
    addPhoto: function (userID, photoReference, photoDateTime) {addPhoto(userID, photoReference, photoDateTime);},
}