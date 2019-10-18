/**This file is responsible for all single document operations in the Albums
 * Collection*/

const general = require('./general_database');
const query = require('./query');

/*Used to reference fields that are stored in the Documents that belong to the
Albums (Sub)Collection*/
const albumFields = {
    name: "Album Name",
    template: "Album Template",
    view: "Album View"
};

/**
 * Adds a new album owned by a user to the database
 *
 * @param {String} userID - The username of the owner of the album
 * @param {String} name - The name of the album that's being added to the
 *                        database CAUTION: CURRENTLY USED AS DOCUMENT
 *                        KEY FOR TESTING PURPOSES
 *
 * @return {Boolean} - True only if the new album was successfully added to the
 *                     database
 * */
//TODO Add sneaky key overwrite
function addAlbum(userID, name) {
    //Initialisation
    let data = {};
    //Add the appropriate data to be stored in the database
    data[albumFields.name] = name;
    data[albumFields.template] = 0;
    data[albumFields.view] = 'Overview';
    //Attempt to Create the Document and return its success
    let docID = general.addDataToDoc(data, general.albumsPath(userID));
    return docID;
}

/**
 * !CAUTION!
 * !COULD POTENTIALLY RESULT IN A LARGE STACK!
 * !!DOES NOT DELETE REFERENCES TO THE ALBUM!!
 * Deletes the Album and ALL of its associated data.
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are updating the name in
 *
 * @return {Boolean} - True only if the photo's DateTime was successfully
 *                     updated in the database
 * */
async function deleteAlbum(userID, albumID) {
    return await general.deleteDoc(general.albumsPath(userID), albumID);
}

/**
 * Updates the stored name for an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are updating the name in
 * @param {String} [name=undefined] - The new name of the album
 *
 * @return {Boolean} - True only if the albums name was successfully
 *                     updated in the database
 * */
function updateAlbumName(userID, albumID, name=undefined) {
    //Initialisation
    let data = {};
    //If there is a name, then add it to the data that will be updated
    if(name){
        data[albumFields.name] = name;
    }
    //Attempt to update the Document and return its success
    let success = general.updateDataInDoc(data, albumsPath(userID), albumID);
    return success;
}

/**
 * Updates the stored template for an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are updating the name in
 * @param {String} [template=undefined] - The new template of the album
 *
 * @return {Boolean} - True only if the albums template was successfully
 *                     updated in the database
 * */
function updateAlbumTemplate(userID, albumID, template=0) {
    //Initialisation
    let data = {};
    //If there is a template, then add it to the data that will be updated
    if(template){
        data[albumFields.template] = template;
    }
    //Attempt to update the Document and return its success
    let success = general.updateDataInDoc(data, albumsPath(userID), albumID);
    return success;
}

/**
 * Updates the stored view for an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are updating the name in
 * @param {String} [view=undefined] - The new name of the album
 *
 * @return {Boolean} - True only if the albums view was successfully
 *                     updated in the database
 * */
function updateAlbumView(userID, albumID, view=undefined){
    //Initialisation
    let data = {};
    //If there is a view, then add it to the data that will be updated
    if(view){
        data[albumFields.view] = view;
    }
    //Attempt to update the Document and return its success
    let success = general.updateDataInDoc(data, general.albumsPath(userID), albumID);
    return success;
}

/**
 * Gets the stored data of an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are getting the data from
 *
 * @return {firebase.firestore.DocumentData} - If the Data was successfully
 *                                             retrieved it will return the
 *                                             Data, otherwise it will return
 *                                             undefined
 * */
async function getAlbumData(userID, albumID) {
    //Attempt to retrieve the Data for the the album and return it
    let data = await general.getDataInDoc(general.albumsPath(userID), albumID);
    return data;
}

/**
 * Gets the stored name of an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are getting the name from
 *
 * @return {String} - If the name was successfully retrieved it will return the
 *                    name as a String, otherwise it will return undefined
 * */
function getAlbumName (userID, albumID){
    let name = undefined;
    let data = getAlbumData(userID, albumID);
    try {
        //Try to retrieve the value from the data
        name = data[albumFields.name];
    } catch (e) {
        console.log("Error in Albums.js.getAlbumName, - probably trying " +
            "to get the name of a album that doesn't exist");
        console.log(e);
    }
    return name;
}

/**
 * Gets the stored template of an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are getting the template from
 *
 * @return {Number} - WILL BE A NON NEGATIVE INT! If the template was successfully retrieved it will return
 *                    the template as an int, otherwise it will return undefined
 * */
function getAlbumTemplate (userID, albumID){
    let template = undefined;
    let data = getAlbumData(userID, albumID);
    try {
        //Try to retrieve the value from the data
        template = data[albumFields.template];
    } catch (e) {
        console.log("Error in Albums.js.getAlbumTemplate, - probably trying " +
            "to get the template of a album that doesn't exist");
        console.log(e);
    }
    return template;
}

/**
 * Gets the stored view of an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are getting the view from
 *
 * @return {String} - If the name was successfully retrieved it will return the
 *                    view as a String, otherwise it will return undefined
 * */
function getAlbumView (userID, albumID){
    let view = undefined;
    let data = getAlbumData(userID, albumID);
    try {
        //Try to retrieve the value from the data
        view = data[albumFields.view];
    } catch (e) {
        console.log("Error in Albums.js.getAlbumView, - probably trying " +
            "to get the view of a album that doesn't exist");
        console.log(e);
    }
    return view;
}

/**
 * Gets all the names of the albums owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 *
 * @return {Object} - basically a dictionary with the album ID as the key and
 *                    the album name as the value.
 * */
async function getAllAlbumNames(userID) {
    let names = {};
    let allData = await query.getAllDocsInCollection(general.albumsPath(userID));
    await allData.forEach(value => {
        names[value.id] = value.data()[albumFields.name];
    });
    return names;
}

/**Exports the functions and values that are intended to be used by
 * database.js*/
module.exports = {
    albumFields,
    addAlbum,
    deleteAlbum,
    getAllAlbumNames,
    getAlbumData,
    getAlbumName,
    getAlbumTemplate,
    getAlbumView,
    updateAlbumName,
    updateAlbumTemplate,
    updateAlbumView,
};