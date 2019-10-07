/**This File is intended to be the sole interaction point for the rest of the
 * system*/

/**The core js file responsible for interacting with the database*/
const general = require('./database/general_database');
/**Every js file responsible for managing interactions with a single document
 * in its specific collection in the database*/
const users = require('./database/users');
const photos = require('./database/photos');
const albums = require('./database/albums');
const albumPositions = require('./database/album_positions');
const albumPages = require('./database/album_pages');
const categories = require('./database/categoies');
const tags = require('./database/tags');

/**Functions that require more than one document to be executed*/

/**Exports the functions that should be exposed to the rest of the system*/
module.exports = {
    //
    addUser: users.addUser,
    addPhoto: photos.addPhoto,
    addAlbum: albums.addAlbum,
    addAlbumPosition: albumPositions.addAlbumPosition,
    addAlbumPage:albumPages.addAlbumPage,
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

};
