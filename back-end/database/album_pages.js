/**This file is responsible for all single document operations in the AlbumPages
 * Collection*/

const general = require('./general_database');
const album = require('./albums');

/*Used to reference fields that are stored in the Documents that belong to the
AlbumPages (Sub)Collection*/
const albumPageFields = {
    template: "Page Template",
};

/**
 * Adds a new album page of an album that is owned by a user to the database
 * NOTE: This should only be done to note the significance of particular pages
 * that deviate from the albums template
 *
 * @param {String} userID - The username of the owner of the album
 * @param {String} albumID - The key of the document for the album
 * @param {int} pageNumber - The key of the document in the AlbumPages
 *                           Collection that we are creating
 * @param {int} template - The template specific to this album page
 *
 * @return {Boolean} - True only if the new album page was successfully added to
 *                     the database
 * */
async function addAlbumPage(userID, albumID, pageNumber, template) {
    //Initialisation
    let docID = undefined;
    //If the template is different to the albums
    if(template != album.getAlbumTemplate(userID, albumID)) {
        //Add the appropriate data to be stored in the database
        let data = {};
        data[albumPageFields.template] = template;
        //Attempt to Create the Document and record its success
        docID = await general.addDataToDoc(data, general.albumPagesPath(userID, albumID), pageNumber.toString());
    //There's no point taking up database storage
    } else {
        console.log("Please only create album pages in the data base if you are changing the template of one");
    }
    //Return the success of the creation
    return docID;
}

/**
 * Updates the stored template for an album page of an album that is owned by a
 * user in the database
 *
 * @param {String} userID - The username of the owner of the album
 * @param {String} albumID - The key of the document for the album
 * @param {int} pageNumber - The key of the document in the AlbumPages
 *                           Collection that we are updating the template of
 * @param {int} template - The template specific to this album page
 *
 * @return {Boolean} - True only if the album page was successfully updated in
 *                     the database
 * */
async function updateAlbumPageTemplate(userID, albumID, pageNumber, template) {
    //Initialisation
    let success = false;
    //If the template is different to the albums
    if(template != getAlbumTemplate(userId, albumID)) {
        //Add the appropriate data to be updated in the database
        let data = {}
        data[albumPageFields.template] = template;
        //Attempt to Create the Document and record its success
        success = await general.updateDataInDoc(data, general.albumPagesPath(userID, albumID), pageNumber);
    } else {
        //delete page
    }
    //Return the success of the update
    return success
}

/**
 * Gets the stored data of an album page in an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are getting the data from
 * @param {int} pageNumber - The key of the document in the AlbumPages
 *                           Collection that we are getting the data of
 *
 * @return {firebase.firestore.DocumentData} - If the Data was successfully
 *                                             retrieved it will return the
 *                                             Data, otherwise it will return
 *                                             undefined
 * */
async function getAlbumPageData(userID, albumID, pageNumber) {
    //Attempt to retrieve the Data for the the album page and return it
    let data = await general.getDataInDoc(general.albumPagesPath(userID, albumID), pageNumber);
    return data;
}

/**
 * Gets the stored template of an album page in an album owned by a user
 *
 * @param {String} userID - The username of the new user who owns the album
 * @param {String} albumID - The key of the document in the Albums Collection
 *                           that we are getting the template from
 * @param {int} pageNumber - The key of the document in the AlbumPages
 *                           Collection that we are getting the template of
 *
 * @return {int} - If the template was successfully retrieved it will return the
 *                 template, otherwise it will return undefined
 * */
function getAlbumPageTemplate(userID, albumID, pageNumber) {
    //Initialisation
    let template = undefined;
    let data = getAlbumPageData(userID, userID, pageNumber);
    try {
        //Try to retrieve the value from the data
        template = data[albumPageFields.template];
    } catch (e) {
        console.log("Error in AlbumPages.js.getAlbumPageTemplate, - probably" +
            "trying to get the template of an album page that doesn't exist");
        console.log(e);
    }
    return template;
}

/**Exports the functions and values that are intended to be used by
 * database.js*/
module.exports = {
    albumPageFields: albumPageFields,
    addAlbumPage: addAlbumPage,
    getAlbumPageData: getAlbumPageData,
    getAlbumPageTemplate: getAlbumPageTemplate,
    updateAlbumPageTemplate: updateAlbumPageTemplate,
};