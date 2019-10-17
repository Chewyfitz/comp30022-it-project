const database = require('../database.js');

////////////////////////////////////////////////////////////////////////////////
//                                   CREATE                                   //
////////////////////////////////////////////////////////////////////////////////

async function createAlbum(user, name){
    console.log(`User: ${user}, Name: ${name}`);
    album = await database.addAlbum(user, name);
    return album;
}

////////////////////////////////////////////////////////////////////////////////
//                                    READ                                    //
////////////////////////////////////////////////////////////////////////////////

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

async function getAllAlbumNames(user){
    database.getAllAlbumNames(user);
}

////////////////////////////////////////////////////////////////////////////////
//                                   UPDATE                                   //
////////////////////////////////////////////////////////////////////////////////

async function updateAlbumAttributes(user, album, attributes){
    var name_success = true;
    var template_success = true;
    var view_success = true;
    if('albumName' in attributes){
        // update name
        name_success = await database.updateAlbumName(user, album, attributes.albumName);
    }
    if('template' in attributes){
        // update template
        template_success = await database.updateAlbumName(user, album, attributes.template);
    }
    if('view' in attributes){
        // update view
        view_success = await database.updateAlbumView(user, album, attributes.view);
    }
    return name_success && template_success && view_success;
}

////////////////////////////////////////////////////////////////////////////////
//                                   DELETE                                   //
////////////////////////////////////////////////////////////////////////////////


module.exports = {
    // CREATE
    createAlbum,
    // READ
    getAlbumById,
    getAllAlbumNames,
    // UPDATE
    updateAlbumAttributes,
    // DELETE
}