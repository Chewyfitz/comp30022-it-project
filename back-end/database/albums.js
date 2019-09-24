var general = require('./general_database');

/*Name of the collections the database stores*/
const albumCollection = 'Albums';
const userCollection = require('./users').userCollection;

/*Fields that are stored in the database*/
//Album
const albumFields = {
    name: "Album Name",
    template: "Album Template",
    view: "Album View"
};

/*Functions for generating database navigation paths*/
function albumsPath(userID) {
    return userCollection+'/'+userID+'/'+albumCollection}

//Add an album and its name
function addAlbum(userID, albumName) {
    let data = {};
    data[albumFields.name] = albumName;
    data[albumFields.template] = 'Default';
    data[albumFields.view] = 'Overview';
    console.log("written album");
    general.addDataToDoc(data, albumsPath(userID), albumName);
}

function addPhotoToAlbum(userID, photoReference, albumName) {

}

function updateView(userID, albumName, view=null){
    let data = {};
    if(view != null){
        data[albumFields.view] = view;
    }
    console.log("updated user");
    general.updateDataInDoc(data, albumsPath(userID), albumName);
}

module.exports = {
    albumCollection: albumCollection,
    albumFields: albumFields,
    albumsPath: function (userID) {albumsPath(userID);},
    addAlbum: function (userID, albumName) {addAlbum(userID, albumName);},
    addPhotoToAlbum: function (userID, photoReference, albumName) {addPhotoToAlbum(userID, photoReference, albumName);},
    updateView: function (userID, albumName, view = null) {updateView(userID, albumName, view);},
}