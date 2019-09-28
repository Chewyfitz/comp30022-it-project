// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs

const general = require('./database/general_database');
const users = require('./database/users');
const photos = require('./database/photos');
const albums = require('./database/albums');
const albumPositions = require('./database/album_positions');
const albumPages = require('./database/album_pages');
const categories = require('./database/categoies');
const tags = require('./database/tags');

module.exports = {
    addUser: users.addUser,
    addPhoto: photos.addPhoto,
    addAlbum: albums.addAlbum,

    updateUserPassword: users.updateUserPassword,
    updateAlbumView: albums.updateAlbumView,

};
