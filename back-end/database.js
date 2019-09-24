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
    addUser: function (userID, password) {users.addUser(userID, password);},
    addAlbum: function (userID, albumName) {albums.addAlbum(userID, albumName);},
    addPhoto: function (userID, photoReference, photoDateTime) {photos.addPhoto(userID, photoReference, photoDateTime);},
    updatePassword: function (userID, password) {user.updatePassword(userID, password);},
    updateView: function (userID, albumName, view) {albums.updateView(userID, albumName, view);},
}
