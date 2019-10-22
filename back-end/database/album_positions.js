/**This file is responsible for all single document operations in the AlbumPages
 * Collection*/

const general = require('./general_database');
const query = require('./query');

/*Used to reference fields that are stored in the Documents that belong to the
AlbumPages (Sub)Collection*/
const albumPositionFields = {
    caption: "Photo caption for Album",
    photo: "Photo Reference",
};


/**
 * Adds a new album position of an album that is owned by a user to the database
 *
 * @param {String} userID - The username of the owner of the album
 * @param {String} albumID - The key of the document for the album
 * @param {String} photoID - The photo to be stored in the album position
 * @param {String} caption - The caption of this position in the album
 *
 * @return {Boolean} - True only if the new album position was successfully
 *                     added to the database
 * */
async function addAlbumPosition(userID, albumID, photoID, caption=null) {
    //Initialisation
    let data = {};
    //Finds what the position in the album is needed next
    let position = await query.getNumDocsInCollection(general.albumPositionsPath(userID, albumID));
    //Add the appropriate data to be stored in the database
    data[albumPositionFields.photo] = general.getDocRef(general.photosPath(userID), photoID);
    data[albumPositionFields.caption] = caption;
    //Attempt to Create the Document and return its success
    let docID = await general.addDataToDoc(data, general.albumPositionsPath(userID, albumID), position.toString());
    return docID
}

/**
 * USE AT OWN RISK
 * Adds a new album position of an album that is owned by a user to the database
 *
 * @param {String} userID - The username of the owner of the album
 * @param {String} albumID - The key of the document for the album
 * @param {Array.<Object>} photoInfoList - List of photos to be stored in the album position
 * @return {Boolean} - True only if the new album position was successfully
 *                     added to the database
 * */
async function addManyAlbumPosition(userID, albumID, photoInfoList) {
    //Finds what the position in the album is needed next
    let position = await query.getNumDocsInCollection(general.albumPositionsPath(userID, albumID));
    let promises = [];
    let success;
    for(i=0; i<photoInfoList.length; i++){
        let data = {};
        //Add the appropriate data to be stored in the database
        data[albumPositionFields.photo] = general.getDocRef(general.photosPath(userID), photoInfoList[i].photoID);
        //TODO VALUE CHECK
        data[albumPositionFields.caption] = photoInfoList[i].caption;
        promises = general.addDataToDoc(data, general.albumPositionsPath(userID, albumID), (position+i).toString());
    }
    Promise.all(promises).then(resVal => {
        success = true;
    }, rejVal => {
        success = false;
        //TODO error handling
    });
    return success;
}

/**!NOT YET IMPLEMENTED!
 * !CAUTION!
 * !!DOES NOT DELETE REFERENCES TO THE ALBUM PAGE!!
 * !!!ONLY DELETES THE LAST PAGE!!!
 * Deletes the Album Position and its associated data.
 *
 * @param {String} userID - The username of the user who owns the Album
 * @param {String} albumID - The ID of the album
 * @param {Number} position - SHOULD BE NON NEGATIVE INT! The key of the document in the AlbumPages
 *                           Collection that we are getting the data of
 *
 * @return {Boolean} - True only if the Album Position was successfully deleted
 *                     from the database
 * */
async function deleteAlbumPosition(userID, albumID, position) {
    //TODO Carefully consider the logic used to delete and move this data
    return false;
}

/**
 * Gets the stored caption of an album position in an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are getting the data from
 * @param {Number} position - SHOULD BE NON NEGATIVE INT! The key of the document in the AlbumPages
 *                           Collection that we are getting the data of
 *
 * @return {string} - If the caption was successfully retrieved it will return
 * the caption as a String, otherwise it will return undefined
 * */
async function getAlbumPositionCaption(userID, albumID, position) {
    //Initialisation
    let caption = undefined;
    let data = getAlbumPositionData(userID, albumID, position);
    try {
        //Try to retrieve the value from the data
        caption = data[albumPositionFields.caption];
    } catch (e) {
        console.log("Error in AlbumPositions.js.getAlbumPageCaption, - " +
            "probably trying to get the caption of an album position that " +
            "doesn't exist");
        console.log(e);
    }
    return caption;
}

/**
 * Gets the stored data of an album position in an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are getting the data from
 * @param {Number} position - SHOULD BE NON NEGATIVE INT! The key of the document in the AlbumPages
 *                           Collection that we are getting the data of
 *
 * @return {firebase.firestore.DocumentData} - If the Data was successfully
 *                                             retrieved it will return the
 *                                             Data, otherwise it will return
 *                                             undefined
 * */
async function getAlbumPositionData(userID, albumID, position) {
    //Attempt to retrieve the Data for the the album position and return it
    let data = await general.getDataInDoc(general.albumPositionsPath(userID, albumID), position);
    return data;
}

/**
 * Gets the stored photo document reference of an album position in an album
 * owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are getting the data from
 * @param {Number} position - SHOULD BE NON NEGATIVE INT! The key of the document in the AlbumPages
 *                           Collection that we are getting the data of
 *
 * @return {firebase.firestore.DocumentReference} - If the photo document
 *                                               reference was successfully
 *                                            retrieved it will return the photo
 *                                         reference as a
 *                                      firebase.firestore.DocumentReference,
 *                                   otherwise it will return undefined
 * */
async function getAlbumPositionPhotoDocRef(userID, albumID, position) {
    //Initialisation
    let caption = undefined;
    let data = getAlbumPositionData(userID, albumID, position);
    try {
        //Try to retrieve the value from the data
        caption = data[albumPositionFields.caption];
    } catch (e) {
        console.log("Error in AlbumPositions.js.getAlbumPageCaption, - " +
            "probably trying to get the caption of an album position that " +
            "doesn't exist");
        console.log(e);
    }
    return caption;
}

/**
 * Updates the stored caption for an album position of an album that is owned by
 * a user in the database
 *
 * @param {String} userID - The username of the owner of the album
 * @param {String} albumID - The key of the document for the album
 * @param {Number} position - SHOULD BE NON NEGATIVE INT! The key of the document in the AlbumPositions
 *                           Collection that we are updating the caption of
 * @param {String} caption - The new value of caption
 *
 * @return {Boolean} - True only if the album position was successfully updated
 *                     in the database
 * */
async function updateAlbumPositionCaption(userID, albumID, position, caption=undefined) {
    //Initialisation
    let success = false;
    let data = {};
    //Add the appropriate data to be updated in the database
    data[albumPositionFields.caption] = caption;
    //Attempt to Create the Document and return its success
    success = await general.updateDataInDoc(data, general.albumPositionsPath(userID, albumsID), position);
    return success;
}

/**
 * Updates the stored photo document reference for an album position of an album
 * that is owned by a user in the database
 *
 * @param {String} userID - The username of the owner of the album
 * @param {String} albumID - The key of the document for the album
 * @param {Number} position - SHOULD BE NON NEGATIVE INT! The key of the document in the AlbumPositions
 *                          Collection that we are updating the caption of
 * @param {firebase.firestore.DocumentReference} photoDocRef - The new reference to
 *                                                          the photo
 *
 * @return {Boolean} - True only if the album position was successfully updated
 *                     in the database
 * */
function updateAlbumPositionPhoto(userID, albumsID, position, photoDocRef) {
    //Initialisation
    let success = false;
    let data = {};
    //Add the appropriate data to be updated in the database
    data[albumPositionFields.photo] = photoDocRef;
    //Attempt to Create the Document and return its success
    success = general.updateDataInDoc(data, general.albumPositionsPath(userID, albumsID), position);
    return success;
}


/**Exports the functions and values that are intended to be used by
 * database.js*/
module.exports = {
    albumPositionFields,
    addAlbumPosition,
    addManyAlbumPosition,
    deleteAlbumPosition,
    getAlbumPositionCaption,
    getAlbumPositionData,
    getAlbumPositionPhotoDocRef,
    updateAlbumPositionCaption,
    updateAlbumPositionPhoto,
};