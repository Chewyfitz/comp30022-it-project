const database = require('../database.js');

async function getAlbumById(user, albumId){
    // get 'un' album if none specified
    !albumId ? albumId = 'un': albumId = albumId;
    console.log("getAlbumById: "+user+" -> "+albumId);

    album = await database.getAlbumData(user, albumId);
    var photos = [];
    for(i=0;;i++){
        album_positions = await database.getAlbumPositionData(user, albumId, String(i));
        if(!album_positions) break;

        photos[i] = {
            'id': album_positions.photo.id,
            'caption': album_positions.caption
        };
        console.log("AlbumPositionData does not fail gracefully.");
        // At the moment database.getAlbumPositionData does not handle exceptions gracefully.
        // when it does this break; can be removed.
        break;
    }
    album.photos = photos;
    
    console.log(album);
    return album;
}

module.exports = {
    getAlbumById,

}