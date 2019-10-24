const database = require('../database.js');

////////////////////////////////////////////////////////////////////////////////
//                                   CREATE                                   //
////////////////////////////////////////////////////////////////////////////////

async function createAlbum(user, name){
    // console.log(`User: ${user}, Name: ${name}`);
    album = await database.addAlbum(user, name);
    return album;
}

////////////////////////////////////////////////////////////////////////////////
//                                    READ                                    //
////////////////////////////////////////////////////////////////////////////////

async function getAlbumById(user, albumId, pageNum = 0, perPage = 12){
    // get 'un' album if none specified
    !albumId ? albumId = 'un': albumId = albumId;

    // Get the album data
    album = await database.getAlbumData(user, albumId);
    
    var photos = [];
    // The first photo you get should be this one, and we'll try to get ${perPage} photos
    var start = perPage*pageNum;
    
    photos = database.getSomeAlbumPhotos(user, albumId, start, start + perPage);

    // Wait for all the photos
    album.photos = await photos;
    
    console.log(album);
    // return the entire album
    return album;
}

async function getAllAlbumNames(user){
    return await database.getAllAlbumNames(user);
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

async function addImageToAlbum(image, album, user, caption = ''){
    return database.addAlbumPosition(user, album, image, caption)
}

////////////////////////////////////////////////////////////////////////////////
//                                   DELETE                                   //
////////////////////////////////////////////////////////////////////////////////

async function deleteAlbum(user, album){
    return await database.deleteAlbum(user, album);
}

async function deleteAlbumPosition(user, album, position){
    return await database.deleteAlbumPosition(user, album, position);
}

module.exports = {
    // CREATE
    createAlbum,
    // READ
    getAlbumById,
    getAllAlbumNames,
    // UPDATE
    updateAlbumAttributes,
    addImageToAlbum,
    // DELETE
    deleteAlbum,
    deleteAlbumPosition,
}