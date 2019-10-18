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
    description: "Photo Description"
};


/**
 * Adds a new photo owned by a user to the database
 *
 * @param {String} userID - The username of the owner of the photo
 * @param {String} photoReference - The reference to the photo that's being
 *                                  added to the database
 * @param {String} [photoDateTime=undefined] - The DateTime of when the photo was
 *                                        taken
 *
 * @return {Boolean} - True only if the new photo was successfully added to the
 *                     database
 * */
function addPhoto(userID, photoReference, photoDateTime=null) {
    //Initialisation
    let data = {};
    //Add the appropriate data to be stored in the database
    data[photoFields.reference] = photoReference;
    data[photoFields.dateTime] = photoDateTime;
    data[photoFields.description] = "";
    data[photoFields.name] = "";
    //Attempt to Create the Document and return its success
    let success = general.addDataToDoc(data, general.photosPath(userID));
    return success;
}

/**
 * !CAUTION! !!DOES NOT DELETE REFERENCES TO THE PHOTO!! Deletes the photo and
 * its associated information that is owned by a user
 *
 * @param {String} userID - The username of the user who owns the photo
 * @param {String} photoID - The key of the document in the Photos Collection
 *                           that we are updating the DateTime in
 *
 * @return {Boolean} - True only if the photo was successfully deleted from the
 *                     database
 * */
async function deletePhoto(userID, photoID) {
    return await general.deleteDoc(general.usersPath(), photoID);
}

/**
 * Gets all the data of the photos owned by a user
 *
 * @param {String} userID - The username of the new user who owns the photos
 *
 * @return {Object} - basically a dictionary with the Photos Key as the key and
 *                    the photo data (as another dictionary like object as the
 *                    value.
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
 * Retrieves the stored Password for a user matches the provided one
 *
 * @param {String} userID - The username of the new user who's password is being
 *                          checked
 * @param {String} photoID - The key of the document in the Photos Collection
 *                           that we are getting the data from
 *
 * @return {firebase.firestore.DocumentData} - If the Data was successfully
 *                                             retrieved it will return the
 *                                             Data, otherwise it will return
 *                                             undefined
 * */
async function getPhotoData(userID, photoID){
    //Attempt to retrieve the Data for the the Photo and return it
    let data = await general.getDataInDoc(general.photosPath(userID), photoID);
    return data;
}

/**
 * Retrieves the stored DateTime of a photo
 *
 * @param {String} userID - The owner of the photo
 * @param {String} photoID - The key of the document in the Photos Collection
 *                           that we are getting the DateTime from
 *
 * @return {firebase.firestore.Timestamp} - If the DateTime was successfully
 *                                         retrieved it will return the
 *                                         DateTime, otherwise it will return
 *                                         undefined\
 * */
function getPhotoDateTime(userID, photoID){
    //Initialisation
    let dateTime = undefined;
    //Attempt to retrieve the Data for the User
    let data = getPhotoData(userID, photoID);
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
 * Retrieves the stored description of a photo
 *
 * @param {String} userID - The owner of the photo
 * @param {String} photoID - The key of the document in the Photos Collection
 *                           that we are getting the description from
 *
 * @return {String} - If the description was successfully retrieved it will
 *                    return the description as a String, otherwise it will
 *                    return undefined
 * */
function getPhotoDescription(userID, photoID){
    //Initialisation
    let description = undefined;
    //Attempt to retrieve the Data for the User
    let data = getPhotoData(userID, photoID);
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
 * @param {String} photoID - The key of the document in the Photos Collection
 *                           that we are getting the photo reference from
 *
 * @return {String} - If the reference was successfully retrieved it will return
 *                    it as a string, otherwise it will return undefined*/
function getPhotoReference(userID, photoID){
    //Initialisation
    let ref = undefined;
    //Attempt to retrieve the Data for the User
    let data = getPhotoData(userID, photoID);
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
 * @param {String} photoID - The key of the document in the Photos Collection
 *                           that we are updating the DateTime in
 * @param {String} [dateTime=undefined] - The DateTime of when the photo was
 *                                        taken
 *
 * @return {Boolean} - True only if the photo's DateTime was successfully
 *                     updated in the database
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
 * Updates the stored description for a photo owned by a user
 *
 * @param {String} userID - The username of the new user who owns the photo
 * @param {String} photoID - The key of the document in the Photos Collection
 *                           that we are updating the DateTime in
 * @param {String} description - The new description of the photo
 *
 * @return {Boolean} - True only if the photo's description was successfully
 *                     updated in the database
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
 * @param {String} photoID - The key of the document in the Photos Collection
 *                           that we are updating the DateTime in
 * @param {String} reference - The new reference for the photo
 *
 * @return {Boolean} - True only if the photo's description was successfully
 *                     updated in the database
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
    getPhotoDescription,
    getPhotoReference,
    updatePhotoDateTime,
    updatePhotoDescription,
    updatePhotoReference,
};