/*Name of the collections the database stores*/
const albumPositionCollection = 'Album Positions';

function addAlbumPosition(userID, albumName, position) {

}

function addPhotoToAlbumPosition (userID, photoReference, albumName, albumPosition){

}


module.exports = {
    albumPositionCollection: albumPositionCollection,
    addAlbumPosition: function (userID, albumName, position) {addAlbumPosition(userID, albumName, position);},
    addPhotoToAlbumPosition: function (userID, photoReference, albumName, albumPosition) {addPhotoToAlbumPosition(userID, photoReference, albumName, albumPosition);},
}