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
 * @param {String} albumID - The Album the Album Position it in
 * @param {String} photoID - The photo to be stored in the album position
 * @param {String} [caption=null] - The caption of this position in the album
 *
 * @return {String} - True only if the new album position was successfully
 *          added to the database, otherwise it returns undefined
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
 * USE AT OWN RISK - UNTESTED
 * Adds new album positions to an album that is owned by a user to the database
 *
 * @param {String} userID - The username of the owner of the album
 * @param {String} albumID - The album the Album Positions are being added tp
 * @param {Array.<Object>} photoInfoList - List of photos to be stored in the
 *          album positions of the form {photoID: String, caption: String}
 * @return {Boolean} - True only if the new album positions were all
 *          successfully added to the database
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
        data[albumPositionFields.caption] = photoInfoList[i].caption || null;
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

/**
 * !CAUTION!
 * !COULD POTENTIALLY RESULT IN A LARGE STACK!
 * !!DOES NOT DELETE REFERENCES TO THE ALBUM PAGE!!
 * Deletes the Album Position and its associated data.
 *
 * @param {String} userID - The username of the user who owns the Album
 * @param {String} albumID - The Album that the Album Position is in
 * @param {Number} position - !SHOULD BE NON NEGATIVE INT! The Album Position
 *          that you are deleting
 *
 * @return {Boolean} - True only if the Album Position and its associated data
 *          was successfully deleted from the database
 * */
async function deleteAlbumPosition(userID, albumID, position) {
    //TODO Carefully consider the logic used to delete and move this data
    let transaction = general.db.runTransaction(t => deleteAlbumPositionCallBack(userID, albumID, position, t));
    return await transaction.then(resVal=>{return true}, rejVal=>{return false});
}

/**
 *
 * @param userID
 * @param albumID
 * @param position
 * @param {firebase.firestore.Transaction} t
 * @returns {Promise<unknown[]>}
 */
async function deleteAlbumPositionCallBack(userID, albumID, position, t){
    let data;
    let docRefs = [];
    let docs = [];
    let promises = [];
    let size;

    size = await query.getNumDocsInCollection(general.albumPositionsPath(userID, albumID));

    for(let i=position; i<size; i++){
        docRefs.push(general.db.collection(general.albumPositionsPath(userID, albumID)).doc(i.toString()));
    }

    for(let i=0; i<docRefs.length; i++){
        docs.push(await t.get(docRefs[i]));
    }

    await Promise.all(docs);

    for(let i=0; i<docRefs.length-1; i++){
        promises.push(t.update(docRefs[i], docs[i+1].data()));
    }
    promises.push(t.delete(docRefs[docRefs.length-1]));
    return Promise.all(promises);
}

/**
 * Gets the stored caption of an album position in an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The Album that the Album Position is in
 * @param {Number} position - !SHOULD BE NON NEGATIVE INT! The Album Position
 *          that you want the caption of
 *
 * @return {string} - If the caption was successfully retrieved it will return
 * the caption as a String, otherwise it will return undefined
 * */
async function getAlbumPositionCaption(userID, albumID, position) {
    //Initialisation
    let caption = undefined;
    let data = await getAlbumPositionData(userID, albumID, position);
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
 * @param {String} albumID - The Album the Album Position is in
 * @param {Number} position - !SHOULD BE NON NEGATIVE INT! The Album Position
 *          you are getting the data of
 *
 * @return {firebase.firestore.DocumentData} - If the Data was successfully
 *          retrieved it will return the Data, otherwise it will return
 *          undefined
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
 * @param {String} albumID - The Album the Album Position is in
 * @param {Number} position - !SHOULD BE NON NEGATIVE INT! The Album Position
 *          you are getting the Photo Document Reference of
 *
 * @return {firebase.firestore.DocumentReference} - If the photo document
 *          reference was successfully retrieved it will return the photo
 *          reference as a firebase.firestore.DocumentReference, otherwise it
 *          will return undefined
 * */
async function getAlbumPositionPhotoDocRef(userID, albumID, position) {
    //Initialisation
    let photoDocRef = undefined;
    let data = await getAlbumPositionData(userID, albumID, position);
    try {
        //Try to retrieve the value from the data
        photoDocRef = data[albumPositionFields.photo];
    } catch (e) {
        console.log("Error in AlbumPositions.js.getAlbumPageCaption, - " +
            "probably trying to get the photoDocRef of an album position that " +
            "doesn't exist");
        console.log(e);
    }
    return photoDocRef;
}

/**
 * Updates the stored caption for an album position of an album that is owned by
 * a user in the database
 *
 * @param {String} userID - The username of the owner of the album
 * @param {String} albumID - The key of the document for the album
 * @param {Number} position - !SHOULD BE NON NEGATIVE INT! The Album Position you
 *          are updating the caption of
 * @param {String} caption - The new value of caption
 *
 * @return {Boolean} - True only if the album position was successfully updated
 *          in the database
 * */
async function updateAlbumPositionCaption(userID, albumID, position, caption=undefined) {
    //Initialisation
    let success = false;
    let data = {};
    //Add the appropriate data to be updated in the database
    data[albumPositionFields.caption] = caption;
    //Attempt to Create the Document and return its success
    success = await general.updateDataInDoc(data, general.albumPositionsPath(userID, albumID), position);
    return success;
}

/**
 * Updates the stored photo document reference for an album position of an album
 * that is owned by a user in the database
 *
 * @param {String} userID - The username of the owner of the album
 * @param {String} albumID - The key of the document for the album
 * @param {Number} position - !SHOULD BE NON NEGATIVE INT! The Album Position
 *          you are updating the Photo Document Reference of
 * @param {String} photoID - The ID of the new photo for this position
 *
 * @return {Boolean} - True only if the album position was successfully updated
 *          in the database
 * */
function updateAlbumPositionPhoto(userID, albumID, position, photoID) {
    //Initialisation
    let success = false;
    let data = {};
    //Add the appropriate data to be updated in the database
    data[albumPositionFields.photo] = general.db.collection(general.photosPath(userID)).doc(photoID);
    //Attempt to Create the Document and return its success
    success = general.updateDataInDoc(data, general.albumPositionsPath(userID, albumID), position.toString());
    return success;
}

/**
 * //TODO JSDOC
 *
 * @param {String} userID
 * @param {String} albumID
 * @param {Object} permutation - A dictionary where the key is the original
 *              position and the value is the new position.
 */
async function updateAlbumPositionOrder(userID, albumID, permutation){
    let transaction = general.db.runTransaction(t => updateAlbumPositionOrderCallBack(userID, albumID, permutation, t));
    return await transaction.then(resVal => {return true;}, rejVal => {console.log(rejVal); return false});
}

/**
 *
 * @param userID
 * @param albumID
 * @param {Object} permutation
 * @param {firebase.firestore.Transaction} t
 * @returns {Promise<void>}
 */
async function updateAlbumPositionOrderCallBack(userID, albumID, permutation, t){
    let docRefs = {};
    let data = {};
    let keys = Object.keys(permutation);
    let promises = [];
    let a = [];
    keys.forEach(key => {
        docRefs[key] = general.db.collection(general.albumPositionsPath(userID, albumID)).doc(key.toString());
    });
    keys.forEach(key => {
        a.push(t.get(docRefs[permutation[key]]).then(value => {
            data[key] = value.data();
        }));
    });
    await Promise.all(a);
    keys.forEach(key => {
        promises.push(t.update(docRefs[key], data[key]));
    });
    return Promise.all(promises);
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
    updateAlbumPositionOrder,
    updateAlbumPositionPhoto,
};