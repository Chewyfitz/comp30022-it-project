/**This File is intended to be the sole interaction point for the rest of the
 * system*/

/**The core js file responsible for interacting with the database*/
const general = require('./database/general_database');
/*The file for large scale retrieval*/
const query = require('./database/query');
/**Every js file responsible for managing interactions with a single document
 * in its specific collection in the database*/
const users = require('./database/users');
const photos = require('./database/photos');
const albums = require('./database/albums');
const albumPositions = require('./database/album_positions');
const albumPages = require('./database/album_pages');
const categories = require('./database/categoies');
const tags = require('./database/tags');


/**
 * Retrieves the image references and captions of the Photos that are in the
 * range of specified positions within an Album of a User. - BETTER FOR GETTING
 * A LARGE AMOUNT OF DOCS
 *
 * @param {String} userID - The owner of the photo
 * @param {String} albumID - The key of the document in the Photos Collection
 *                           that we are getting the photo reference from
 * @param {Number} start - SHOULD BE NON NEGATIVE INT! The first position of the
 *                         range you want toget the photos from (inclusive).
 *                         Leave blank for start
 * @param {Number} end - SHOULD BE NON NEGATIVE INT! The last position of the
 *                         range you want to get the photos from (inclusive).
 *                         Leave blank for end
 *
 * @return {Object.<Object>} - Basically a dictionary of dictionaries of the form
 *                    AlbumPosition:Field:Value where field is either reference
 *                    or caption
 * */
async function getAllAlbumPhotos(userID, albumID, start=undefined, end=undefined) {
    //Initialisation
    let data = {};
    let promises = [];
    //Gets all the documents in the Album
    let allDocsQuery = await query.getAllDocsInCollection(general.albumPositionsPath(userID, albumID));
    //If no start has been given, start from the very start
    if (start === undefined) {
        start = 0;
    }
    //If no end has been given, end at the very end
    if (end === undefined) {
        end = allDocsQuery.length - 1;
    }
    //For each of the albumPositions it gets the caption and, retrieves the image
    //reference from the referenced Photos doc
    allDocsQuery.forEach(albumPositionsDoc => {
        //If the position of the album is in the range of interest
        if(start <= albumPositionsDoc.id && albumPositionsDoc.id <= end) {
            //STORE ALL THE PROMISES OF GETTING PHOTO DOCS SO WE HAVE SOMETHING TO WAIT ON!
            promises.push(
                //Get the Photos Doc that is referenced
                (albumPositionsDoc.data()[albumPositions.albumPositionFields.photo]).get()
                    .then(photosDoc => {
                        //Initialise the internal dictionary
                        data[albumPositionsDoc.id] = {};
                        //Store the caption from the AlbumPositions Doc
                        data[albumPositionsDoc.id].caption = albumPositionsDoc.data()[albumPositions.albumPositionFields.caption];
                        //Store the Image Reference from the Photos Doc
                        data[albumPositionsDoc.id].reference = photosDoc.data()[photos.photoFields.reference];
                        //Store the Photo Document ID for future reference by the front end
                        data[albumPositionsDoc.id].photoID = photosDoc.id;
                    })
            );
        }
    });
    //Wait for all the promises to be resolved because data will on have its
    //final value after they have all been resoled
    await Promise.all(promises);
    //TODO rejection handling?
    return data;

}

/**
 * Retrieves the image references and captions of the Photos that are in the
 * range of specified positions within an Album of a User. - BETTER FOR
 * GETTING A 'SMALL' AMOUNT OF DOCS
 *
 * @param {String} userID - The owner of the photo
 * @param {String} albumID - The key of the document in the Photos Collection
 *                           that we are getting the photo reference from
 * @param {Number} start - SHOULD BE NON NEGATIVE INT! The first position of the
 *                         range you want toget the photos from (inclusive).
 *                         Leave blank for start
 * @param {Number} end - SHOULD BE NON NEGATIVE INT! The last position of the
 *                         range you want to get the photos from (inclusive).
 *                         Leave blank for end
 *
 * @return {Object.<Object>} - Basically a dictionary of dictionaries of the form
 *                    AlbumPosition:Field:Value where field is either reference
 *                    or caption
 * */
async function getSomeAlbumPhotos(userID, albumID, start=undefined, end=undefined) {
    //If no start has been given, start from the very start
    if (start == undefined) {
        start = 0;
    }
    //If no end has been given, end at the very end
    if (end == undefined) {
        end = await query.getNumDocsInCollection(general.albumPositionsPath(userID, albumID)) - 1;
    }
    //A lot of initialisation
    let data = {};
    let albumPositionsDocPromises = [];
    let albumPositionsDoc;
    let photosDocRef;
    let photosDocPromises = [];
    let photoDoc;
    //Retrieve all the albumPositions docs we interested in from the data base
    for (i = start; i <= end; i++) {
        //Not using albumPositions.js for more speed
        //THESE ARE JUST PROMISES AT THIS POINT THEY START RESOLVING AS SOON AS
        //THEY'RE MADE
        albumPositionsDocPromises.push(general.db.collection(general.albumPositionsPath(userID, albumID)).doc(i.toString()).get());
    }
    //From all the albumPositions docs, store the caption and get the Photos doc
    //referenced in its data
    for (i = 0; i <= end - start; i++) {
        //Wait for the promise to resolve when we need it
        //ALL OTHER PROMISES STILL RESOLVE WHILE WE WAIT
        albumPositionsDoc = await albumPositionsDocPromises[i];
        //If the document exists get the needed stuff
        if (albumPositionsDoc.exists) {
            data[i + start] = {};
            data[i + start].caption = albumPositionsDoc.data()[albumPositions.albumPositionFields.caption];
            photosDocRef = albumPositionsDoc.data()[albumPositions.albumPositionFields.photo];
            //Not using photos.js for more speed
            //THESE ARE JUST PROMISES AT THIS POINT THEY START RESOLVING AS SOON
            //AS THEY'RE MADE
            photosDocPromises.push(photosDocRef.get());
        //If this document doesn't exist, then neither will the consecutive ones
        } else {
            console.log("The Album does not have a(n) " + i + "th position");
            console.log("Reassigning end = " + (i-1));
            end = i - 1;
            break
        }
    }
    //From all the Photos docs, store the Image reference
    for (i = 0; i <= end - start; i++) {
        //Wait for the promise to resolve when we need it
        //ALL OTHER PROMISES STILL RESOLVE WHILE WE WAIT
        photoDoc = await photosDocPromises[i];
        //If the document exists, get the image reference from its data
        if (photoDoc.exists) {
            data[i + start].reference = photoDoc.data()[photos.photoFields.reference];
            data[i + start].photoID = photoDoc.id;
        //TODO error handling for non existent Photos doc
        } else {
            continue;
        }
    }
    return await data;
}


/**Exports the functions that should be exposed to the rest of the system*/
module.exports = {
    //The Fields stored in each Collections Documents
    UserFields: users.userFields,
    PhotoFields: photos.photoFields,
    AlbumFields: albums.albumFields,
    AlbumPageFields: albumPages.albumPageFields,
    AlbumPositionFields: albumPositions.albumPositionFields,
    //The functions to add a Document to a Collection
    addUser: users.addUser,
    addPhoto: photos.addPhoto,
    addAlbum: albums.addAlbum,
    addAlbumPosition: albumPositions.addAlbumPosition,
    addManyAlbumPosition: albumPositions.addManyAlbumPosition,
    addAlbumPage: albumPages.addAlbumPage,
    //The functions to Delete a Document from a Collection
    deleteUser: users.deleteUser,
    deletePhoto: photos.deletePhoto,
    deleteAlbum: albums.deleteAlbum,
    deleteAlbumPage: albumPages.deleteAlbumPage,
    deleteAlbumPosition: albumPositions.deleteAlbumPosition,
    //The functions to retrieve data from a Document in a Collection
    getUserEmail: users.getUserEmail,
    getPhotoData: photos.getPhotoData,
    getPhotoDateTime: photos.getPhotoDateTime,
    getPhotoDescription: photos.getPhotoDescription,
    getPhotoDimensions: photos.getPhotoDimensions,
    getPhotoReference: photos.getPhotoReference,
    getAllPhotoData: photos.getAllPhotoData,
    getAlbumData: albums.getAlbumData,
    getAlbumName: albums.getAlbumName,
    getAlbumTemplate: albums.getAlbumTemplate,
    getAlbumView: albums.getAlbumView,
    getAllAlbumNames: albums.getAllAlbumNames,
    getAlbumPageData: albumPages.getAlbumPageData,
    getAlbumPageTemplate: albumPages.getAlbumPageTemplate,
    getAlbumPositionData: albumPositions.getAlbumPositionData,
    getAlbumPositionCaption: albumPositions.getAlbumPositionCaption,
    getAlbumPositionPhotoDocRef: albumPositions.getAlbumPositionPhotoDocRef,
    //The functions to retrieve data from Collections
    getAllAlbumPhotos,
    getSomeAlbumPhotos,
    //The functions to update the data of a Document in a Collection
    updateUserEmail: users.updateUserEmail,
    updatePhotoDateTime: photos.updatePhotoDateTime,
    updatePhotoDescription: photos.updatePhotoDescription,
    updatePhotoDimensions: photos.updatePhotoDimensions,
    updatePhotoReference: photos.updatePhotoReference,
    updateAlbumName: albums.updateAlbumName,
    updateAlbumTemplate: albums.updateAlbumTemplate,
    updateAlbumView: albums.updateAlbumView,
    updateAlbumPageTemplate: albumPages.updateAlbumPageTemplate,
    updateAlbumPositionCaption: albumPositions.updateAlbumPositionCaption,
    updateAlbumPositionOrder: albumPositions.updateAlbumPositionOrder,
    updateAlbumPositionPhoto: albumPositions.updateAlbumPositionPhoto,

};
