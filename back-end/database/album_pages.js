var general = require('./general_database');

const albumPageFields = {
    template: "Page Template",
};

function addAlbumPage(userID, albumID, page, template=null) {
    if(template != null) {
        let data = {}
        data[albumPageFields.template] = template;
        general.addDataToDoc(data, general.albumPagesPath(userID, albumID), page);
    } else {
        console.log("Please only create album pages in the data base if you are changing the template of one");
    }
}

function updateAlbumPageTemplate(userID, albumID, page, template) {
    if (template != null) {
        let data = {}
        data[albumPageFields.template] = template;
    } else {
        //delete page
    }
}

module.exports = {
    albumPageFields: albumPageFields,
    addAlbumPage: function (userID, albumID, page, template) {addAlbumPage(userID, albumID, page, template);},
    updateAlbumPageTemplate: function (userID, albumID, page, template) {updateAlbumPageTemplate(userID, albumID, page, template);},
};