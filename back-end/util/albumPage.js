const database = require('../database.js');

// These routes are pretty much all just calling the database functions. If we 
// need to add more complicated logic in future it will be added here.

////////////////////////////////////////////////////////////////////////////////
//                                   CREATE                                   //
////////////////////////////////////////////////////////////////////////////////

async function createAlbumPage(user, album, number, template){
    return await database.addAlbumPage(user, album, number, template);
}

////////////////////////////////////////////////////////////////////////////////
//                                    READ                                    //
////////////////////////////////////////////////////////////////////////////////

async function getAlbumPageTemplate(user, album, page){
    return await database.getAlbumPageData(user, album, page);
}

////////////////////////////////////////////////////////////////////////////////
//                                   UPDATE                                   //
////////////////////////////////////////////////////////////////////////////////

async function updateAlbumPageAttributes(user, album, page, template){
    return await database.updateAlbumPageTemplate(user, album, page, template);
}

////////////////////////////////////////////////////////////////////////////////
//                                   DELETE                                   //
////////////////////////////////////////////////////////////////////////////////

async function deleteAlbumPage(user, album, page){
    return await database.deleteAlbumPage(user, album, page);
}

module.exports = {
    // CREATE
    createAlbumPage,
    // READ
    getAlbumPageTemplate,
    // UPDATE
    updateAlbumPageAttributes,
    // DELETE
    deleteAlbumPage,
}