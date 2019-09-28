/**
 *
 * NEED BETTER NAMING CONVENTION ALL ROUND I THINK
 *
 * */



const general = require('./general_database');

/*Fields that are stored in the collection*/
const albumPositionFields = {
    caption: "Photo caption for Album",
    photo: "Photo Reference",
};

function addAlbumPosition(userID, albumID, photo, caption=null) {
    let data = {};
    let position = 0; // need to find next position
    let photoReference = photo; //need to find the reference to the photo doc
    data[albumPositionFields.photo] = photoReference;
    data[albumPositionFields.caption] = caption;
    general.addDataToDoc(data, general.albumPositionsPath(userID, albumID), position);
}


function updateAlbumPositionCaption(userID, albumID, position, caption=null) {
    let data = {};
    data[albumPositionFields.caption] = caption;
    general.updateDataInDoc(data, general.albumPositionsPath(userID, albumsID), position);
}

function updateAlbumPositionPhoto(userID, albumsID, position, photo) {
    let data = {};
    let photoReference = photo; // need to find photo reference
    data[albumPositionFields.photo] = photoReference;
    general.updateDataInDoc(data, general.albumPositionsPath(userID, albumsID), position);
}


/* Exports to be used by other code*/
module.exports = {
    albumPositionFields: albumPositionFields,
    addAlbumPosition: addAlbumPosition,
    updateAlbumPositionCaption: updateAlbumPositionCaption,
    updateAlbumPositionPhoto: updateAlbumPositionPhoto,
};