const general = require('./general_database');

/*Fields that are stored in the database*/
const albumFields = {
    name: "Album Name",
    template: "Album Template",
    view: "Album View"
};

//Add an album and its name
function addAlbum(userID, albumName) {
    let data = {};
    data[albumFields.name] = albumName;
    data[albumFields.template] = 'Default';
    data[albumFields.view] = 'Overview';
    console.log("written album");
    general.addDataToDoc(data, albumsPath(userID), albumName);
}


function updateAlbumName(userID, albumName, name=null) {
    let data = {};
    if(name != null){
        data[albumFields.name] = name;
    }
    general.updateDataInDoc(data, albumsPath(userID), albumName);
}

function updateAlbumTemplate(userID, albumName, template=null) {
    let data = {};
    if(template != null){
        data[albumFields.template] = template;
    }
    general.updateDataInDoc(data, albumsPath(userID), albumName);
}

function updateAlbumView(userID, albumName, view=null){
    let data = {};
    if(view != null){
        data[albumFields.view] = view;
    }
    console.log("updated user");
    general.updateDataInDoc(data, albumsPath(userID), albumName);
}

module.exports = {
    albumFields: albumFields,
    albumsPath: function (userID) {albumsPath(userID);},
    addAlbum: function (userID, albumName) {addAlbum(userID, albumName);},
    updateAlbumName: function (userID, albumName, name = null) {updateAlbumName(userID, albumName, name);},
    updateAlbumTemplate: function (userID, albumName, template = null) {updateAlbumTemplate(userID, albumName, template);},
    updateAlbumView: function (userID, albumName, view = null) {updateAlbumView(userID, albumName, view);},
};