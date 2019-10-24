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

async function getAlbumPhotos(userID, albumID, start=undefined, end=undefined) {
    if(start == undefined){
        start = 0;
    }
    if(end == undefined){
        end = await query.getNumDocsInCollection(general.albumPositionsPath(userID,albumID)) - 1;
    }
//    console.log(start, end);
    let data = {};
    let albumPositionsDocPromises = [];
    let albumPositionsDoc = undefined;
    let photosDocRef = undefined;
    let photosDocPromises = [];
    let photoDoc = undefined;
//    console.log("--FIRST LOOP--");
    for(i=start; i<=end; i++){
        albumPositionsDocPromises.push(general.db.collection(general.albumPositionsPath(userID, albumID)).doc(i.toString()).get());
    }
//    console.log(albumPositionsDocPromises);
//    console.log("--SECOND LOOP--");
    for(i=0; i<=end-start; i++){
//        console.log(i);
        albumPositionsDoc = await albumPositionsDocPromises[i];
//        console.log(albumPositionsDoc);
        if(albumPositionsDoc.exists){
            photosDocRef = albumPositionsDoc.data()[albumPositions.albumPositionFields.photo];
//            console.log(photoDocRef);
            photosDocPromises.push(photosDocRef.get());
        } else {
//            console.log("Error: " + albumPositionsDoc);
            end = i-1;
            break
        }
    }
//    console.log(photosDocPromises);
//    console.log("--THIRD LOOP--");
    for(i=0; i<=end-start; i++){
//        console.log(i);
        photoDoc = await photosDocPromises[i];
//        console.log(photoDoc);
        if(photoDoc.exists) {
            data[i+start] = photoDoc.data()[photos.photoFields.reference];
        }
    }
//    console.log(data);
    return await data;

}

async function fasterPrototypeThatDoesntWork(userID, albumID){
    let albumPhotos = {};
    let allDocs = await query.getAllDocsInCollection(general.albumPositionsPath(userID, albumID));
    await allDocs.forEach(async value => {
        photoDocRef = await value.data()[albumPositions.albumPositionFields.photo];
//        console.log(photoDocRef);
        photoDoc = await photoDocRef.get();
        photoAddress = photoDoc.data()[photos.photoFields.reference];
        console.log(photoAddress);
        albumPhotos[value.id] = photoAddress;
        console.log(albumPhotos);
    });
    albumPhotos = Promise.all();
    return await albumPhotos;

}

/**Exports the functions that should be exposed to the rest of the system*/
module.exports = {
    //
    UserFields: users.userFields,
    PhotoFields: photos.photoFields,
    AlbumFields: albums.albumFields,
    AlbumPageFields: albumPages.albumPageFields,
    AlbumPositionFields: albumPositions.albumPositionFields,
    //
    addUser: users.addUser,
    addPhoto: photos.addPhoto,
    addAlbum: albums.addAlbum,
    addAlbumPosition: albumPositions.addAlbumPosition,
    addAlbumPage: albumPages.addAlbumPage,
    //
    checkUserPassword: users.checkUserPassword,
    //
    getPhotoData: photos.getPhotoData,
    getPhotoDateTime: photos.getPhotoDateTime,
    getPhotoDescription: photos.getPhotoDescription,
    getPhotoReference: photos.getPhotoReference,
    getAlbumData: albums.getAlbumData,
    getAlbumName: albums.getAlbumName,
    getAlbumTemplate: albums.getAlbumTemplate,
    getAlbumView: albums.getAlbumView,
    getAlbumPageData: albumPages.getAlbumPageData,
    getAlbumPageTemplate: albumPages.getAlbumPageTemplate,
    getAlbumPositionData: albumPositions.getAlbumPositionData,
    getAlbumPositionCaption: albumPositions.getAlbumPositionCaption,
    getAlbumPositionPhotoDocRef: albumPositions.getAlbumPositionPhotoDocRef,
    //
    updateUserPassword: users.updateUserPassword,
    updatePhotoDateTime: photos.updatePhotoDateTime,
    updatePhotoDescription: photos.updatePhotoDescription,
    updatePhotoReference: photos.updatePhotoReference,
    updateAlbumName: albums.updateAlbumName,
    updateAlbumTemplate: albums.updateAlbumTemplate,
    updateAlbumView: albums.updateAlbumView,
    updateAlbumPageTemplate: albumPages.updateAlbumPageTemplate,
    updateAlbumPositionCaption: albumPositions.updateAlbumPositionCaption,
    updateAlbumPositionPhoto: albumPositions.updateAlbumPositionPhoto,

    getAlbumPhotos: getAlbumPhotos,
};
