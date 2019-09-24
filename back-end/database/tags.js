/*Name of the collections the database stores*/
const tagCollection = 'Tags';

function addTag(userID, category, tag) {

}

function addPhotoToTag(userID, photoReference, category, tag) {

}

module.exports = {
    tagCollection: tagCollection,
    addTag: function (userID, category, tag) {addTag(userID, category, tag);},
    addPhotoToTag: function (userID, photoreference, category, tag) {addPhotoToTag(userID, photoReference, category, tag);},
}