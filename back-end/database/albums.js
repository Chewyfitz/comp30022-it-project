/**This file is responsible for all single document operations in the Albums
 * Collection*/

const general = require('./general_database');
<<<<<<< HEAD
=======
const query = require('./query');
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff

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
function addAlbum(userID, name) {
    //Initialisation
    let data = {};
    //Add the appropriate data to be stored in the database
    data[albumFields.name] = name;
    data[albumFields.template] = 0;
    data[albumFields.view] = 'Overview';
    //Attempt to Create the Document and return its success
<<<<<<< HEAD
    let success = general.addDataToDoc(data, general.albumsPath(userID), name);
    return success;
=======
    let docID = general.addDataToDoc(data, general.albumsPath(userID), name);
    return docID;
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
}

/**
 * Updates the stored name for an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are updating the name in
<<<<<<< HEAD
 * @param {String} [name=null] - The new name of the album
=======
 * @param {String} [name=undefined] - The new name of the album
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
 *
 * @return {Boolean} - True only if the albums name was successfully
 *                     updated in the database
 * */
<<<<<<< HEAD
function updateAlbumName(userID, albumID, name=null) {
    //Initialisation
    let data = {};
    //If there is a name, then add it to the data that will be updated
    if(name != null){
=======
function updateAlbumName(userID, albumID, name=undefined) {
    //Initialisation
    let data = {};
    //If there is a name, then add it to the data that will be updated
    if(name){
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
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
<<<<<<< HEAD
 * @param {String} [template=null] - The new template of the album
=======
 * @param {String} [template=undefined] - The new template of the album
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
 *
 * @return {Boolean} - True only if the albums template was successfully
 *                     updated in the database
 * */
function updateAlbumTemplate(userID, albumID, template=0) {
    //Initialisation
    let data = {};
    //If there is a template, then add it to the data that will be updated
<<<<<<< HEAD
    if(template != null){
=======
    if(template){
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
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
<<<<<<< HEAD
 * @param {String} [view=null] - The new name of the album
=======
 * @param {String} [view=undefined] - The new name of the album
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
 *
 * @return {Boolean} - True only if the albums view was successfully
 *                     updated in the database
 * */
<<<<<<< HEAD
function updateAlbumView(userID, albumID, view=null){
    //Initialisation
    let data = {};
    //If there is a view, then add it to the data that will be updated
    if(view != null){
=======
function updateAlbumView(userID, albumID, view=undefined){
    //Initialisation
    let data = {};
    //If there is a view, then add it to the data that will be updated
    if(view){
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
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
<<<<<<< HEAD
 *                                             null
=======
 *                                             undefined
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
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
<<<<<<< HEAD
 *                    name as a String, otherwise it will return null
 * */
function getAlbumName (userID, albumID){
    let name = null;
=======
 *                    name as a String, otherwise it will return undefined
 * */
function getAlbumName (userID, albumID){
    let name = undefined;
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
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
 * @return {int} - If the template was successfully retrieved it will return
<<<<<<< HEAD
 *                    the template as an int, otherwise it will return null
 * */
function getAlbumTemplate (userID, albumID){
    let template = null;
=======
 *                    the template as an int, otherwise it will return undefined
 * */
function getAlbumTemplate (userID, albumID){
    let template = undefined;
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
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
<<<<<<< HEAD
 *                    view as a String, otherwise it will return null
 * */
function getAlbumView (userID, albumID){
    let view = null;
=======
 *                    view as a String, otherwise it will return undefined
 * */
function getAlbumView (userID, albumID){
    let view = undefined;
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
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

<<<<<<< HEAD
=======
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

>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
/**Exports the functions and values that are intended to be used by
 * database.js*/
module.exports = {
    albumFields: albumFields,
    addAlbum: addAlbum,
<<<<<<< HEAD
=======
    getAllAlbumNames: getAllAlbumNames,
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
    getAlbumData: getAlbumData,
    getAlbumName: getAlbumName,
    getAlbumTemplate: getAlbumTemplate,
    getAlbumView: getAlbumView,
    updateAlbumName: updateAlbumName,
    updateAlbumTemplate: updateAlbumTemplate,
    updateAlbumView: updateAlbumView,
};