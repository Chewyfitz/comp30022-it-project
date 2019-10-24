/**This file is responsible for all single document operations in the Photos
 * Collection*/
const general = require('./general_database');
const query = require('./query');

/*Used to reference fields that are stored in the Documents that belong to the
Photos (Sub)Collection*/
const photoFields = {
    reference: "Photo Reference",
    name: "Photo Name",
    dateTime: "Photo DateTime",
    description: "Photo Description",
    height: "Photo pixel height",
    width: "Photo pixel width",
};


/**
 * Adds a new photo owned by a user to the database
 *
 * @param {String} userID - The username of the owner of the photo
 * @param {String} photoReference - The reference to the photo that's being
 *          added to the database
 * @param {Number} height - !SHOULD BE NON NEGATIVE INT! The pixel height of the
 *          referenced image
 * @param {Number} width - !SHOULD BE NON NEGATIVE INT! The pixel width of the
 *          referenced image
 * @param {firebase.Timestamp} [photoDateTime=undefined] - The Timestamp of when
 *          the photo was taken
 * @param {String} description - The description of the photo.
 *
 * @return {String} - Returns the ID of the Photo Document if it was created
 *          successfully. Otherwise it returns undefined
 * */
function addPhoto(userID, photoReference, height=1, width=1, photoDateTime=null, description=null) {
    //Initialisation
    let data = {};
    //Add the appropriate data to be stored in the database
    data[photoFields.reference] = photoReference;
    data[photoFields.dateTime] = photoDateTime;
    data[photoFields.description] = description;
    data[photoFields.height] = height;
    data[photoFields.name] = "";
    data[photoFields.width] = width;
    //Attempt to Create the Document and return its success
    let success = general.addDataToDoc(data, general.photosPath(userID));
    return success;
}

/**
 * !CAUTION!
 * !!DOES NOT DELETE REFERENCES TO THE PHOTO!!
 * Deletes the photo and its associated information
 *
 * @param {String} userID - The user who owns the photo
 * @param {String} photoID - The photo to be deleted
 *
 * @return {Boolean} - True only if the photo and all its associated data was
 *          successfully deleted from the database
 * */
async function deletePhoto(userID, photoID) {
    return await general.deleteDoc(general.photosPath(userID), photoID);
    //TODO Delete references
}

/**
 * Gets all the data of all the photos owned by a user
 *
 * @param {String} userID - The username of the new user who owns the photos
 *
 * @return {Object.<Object>} - Basically a dictionary of dictionaries of the
 *          form PhotoID:Field:Value where field is a photo field
 * */
async function getAllPhotoData(userID) {
    let data = {};
    let allData = await query.getAllDocsInCollection(general.photosPath(userID));
    await allData.forEach(value => {
        data[value.id] = value.data();
    });
    //TODO format the data?
    return data;
}

/**
 * Retrieves the stored data of a Photo
 *
 * @param {String} userID - The owner of the Photo
 * @param {String} photoID - The Photo you're getting the data of
 *
 * @return {firebase.firestore.DocumentData} - If the Data was successfully
 * retrieved it will return the Data, otherwise it will return undefined
 * */
async function getPhotoData(userID, photoID){
    //Attempt to retrieve the Data for the the Photo and return it
    let data = await general.getDataInDoc(general.photosPath(userID), photoID);
    return data;
}

/**
 * Retrieves the stored Timestamp of a photo
 *
 * @param {String} userID - The owner of the photo
 * @param {String} photoID - The Photo you want the Timestamp of
 *
 * @return {firebase.firestore.Timestamp} - If the DateTime was successfully
 *          retrieved it will return the DateTime, otherwise it will return
 *          undefined
 * */
async function getPhotoDateTime(userID, photoID){
    //Initialisation
    let dateTime = undefined;
    //Attempt to retrieve the Data for the User
    let data = await getPhotoData(userID, photoID);
    try {
        //Try to retrieve the value from the data
        dateTime = data[photoFields.dateTime];
    } catch (e) {
        console.log("Error in Photos.js.getPhotoDateTime, - probably trying " +
            "to get the DateTime of a photo that doesn't exist");
        console.log(e);
    }
    return dateTime;
}

/**
 * Returns the pixel height and pixel width of the image referenced in the
 * Photos Document
 *
 * @param {String} userID - The owner of the photo
 * @param {String} photoID - The Photo you want the dimensions of
 *
 * @return {Object} - A dictionary with the dimensions stored in it of the form
 *          {height:value, width:value}
 */
async function getPhotoDimensions(userID, photoID) {
    let dimensions = {};
    let data = await getPhotoData(userID, photoID);
    try {
        dimensions.height = data[photoFields.height];
        dimensions.width = data[photoFields.width];
    } catch (e) {
        console.log("Error in Photos.js.getPhotoDimensions");
        console.log(e);
    }
    return dimensions;
}

/**
 * Retrieves the stored description of a photo
 *
 * @param {String} userID - The owner of the photo
 * @param {String} photoID - The Photo you want the description of
 *
 * @return {String} - If the description was successfully retrieved it will
 *          return the description as a String, otherwise it will return
 *          undefined
 * */
async function getPhotoDescription(userID, photoID){
    //Initialisation
    let description = undefined;
    //Attempt to retrieve the Data for the User
    let data = await getPhotoData(userID, photoID);
    try {
        //Try to retrieve the value from the data
        description = data[photoFields.description];
    } catch (e) {
        console.log("Error in Photos.js.getPhotoDescription, - probably " +
            "trying to get the description of a photo that doesn't exist");
        console.log(e);
    }
    return description;
}

/**
 * Retrieves the stored photo reference of a photo
 *
 * @param {String} userID - The owner of the photo
 * @param {String} photoID - The Photo you wan the Image reference of
 *
 * @return {String} - If the reference was successfully retrieved it will return
 *          it as a string, otherwise it will return undefined
 * */
async function getPhotoReference(userID, photoID){
    //Initialisation
    let ref = undefined;
    //Attempt to retrieve the Data for the User
    let data = await getPhotoData(userID, photoID);
    try {
        //Try to retrieve the value from the data
        ref = data[photoFields.reference];
    } catch (e) {
        console.log("Error in Photos.js.getPhotoReference, - probably trying " +
            "to get the reference of a photo that doesn't exist");
        console.log(e);
    }
    return ref;
}

/**
 * Updates the stored DateTime for a photo owned by a user
 *
 * @param {String} userID - The username of the new user who owns the photo
 * @param {String} photoID - The photo you are updating the Timestamp of
 * @param {firebase.Timestamp} [dateTime=undefined] - The DateTime of when the
 *          photo was taken
 *
 * @return {Boolean} - True only if the photo's DateTime was successfully
 *          updated in the database
 * */
function updatePhotoDateTime(userID, photoID, dateTime){
    //Initialisation
    let data = {};
    //Add the data that will be updated
    data[photoFields.dateTime] = dateTime;
    //Attempt to update the Document and return its success
    let docID = general.updateDataInDoc(data, general.photosPath(userID), photoID);
    return docID;
}

/**
 * Updates the stored dimension information about the referenced image in a
 * Photos Document
 *
 * @param {String} userID - The username of the owner of the photo
 * @param {String} photoID - The photo you want to update the Dimensions of
 * @param {Number} height - The pixel height of the referenced image
 * @param {Number} width - The pixel width of the referenced image
 *
 * @returns {Boolean} - True only if the photo's Dimensions were successfully
 *          updated in the database
 */
function updatePhotoDimensions(userID, photoID, height=undefined, width=undefined) {
    let data = {};
    if(height){
        data[photoFields.height] = height;
    }
    if(width){
        data[photoFields.width] = width;
    }
    let success = general.updateDataInDoc(data, general.photosPath(userID), photoID);
    return success;
}

/**
 * Updates the stored description for a photo owned by a user
 *
 * @param {String} userID - The username of the new user who owns the photo
 * @param {String} photoID - The photo you want to updated the description of
 * @param {String} description - The new description of the photo
 *
 * @return {Boolean} - True only if the photo's description was successfully
 *          updated in the database
 * */
function updatePhotoDescription(userID, photoID, description){
    //Initialisation
    let data = {};
    //If there is a password, then add it to the data that will be updated
    data[photoFields.description] = description;
    //Attempt to update the Document and return its success
    let success = general.updateDataInDoc(data, general.photosPath(userID), photoID);
    return success;
}

/**
 * Updates the stored reference for a photo owned by a user
 *
 * @param {String} userID - The username of the new user who owns the photo
 * @param {String} photoID - The photo you want to update the image reference of
 * @param {String} reference - The new reference for the photo
 *
 * @return {Boolean} - True only if the photo's Image Reference was successfully
 *          updated in the database
 * */
function updatePhotoReference(userID, photoID, reference){
    //Initialisation
    let data = {};
    //If there is a password, then add it to the data that will be updated
    data[photoFields.reference] = reference;
    //Attempt to update the Document and return its success
    let success = general.updateDataInDoc(data, general.photosPath(userID), photoID);
    return success;
}


/**Exports the functions and values that are intended to be used by
 * database.js*/
module.exports = {
    photoFields,
    addPhoto,
    deletePhoto,
    getAllPhotoData,
    getPhotoData,
    getPhotoDateTime,
    getPhotoDimensions,
    getPhotoDescription,
    getPhotoReference,
    updatePhotoDateTime,
    updatePhotoDescription,
    updatePhotoDimensions,
    updatePhotoReference,
};