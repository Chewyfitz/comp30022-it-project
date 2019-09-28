var firebase = require("firebase/app");
require("firebase/firestore");
require('dotenv').config()

const config = {
    apiKey: process.env.APIKEY,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messageSenderId: process.env.SENDERID,
    appId: process.env.APPID,
}

// Initialize Firebase
firebase.initializeApp(config);

var db = firebase.firestore();

const userCollection = 'Users';
const photoCollection = 'Photos';
const albumCollection = 'Albums';
const albumPositionCollection = 'Album Positions';
const albumPageCollection = 'Album Page';
const categoryCollection = 'Categories';

/*Function that generates the path to the collection of documents*/
function usersPath() {
    return userCollection;
}

function photosPath(userID) {
    return usersPath() + '/' + userID + '/' + photoCollection}

function albumsPath(userID) {
    return usersPath() + '/'+userID+'/' + albumCollection}

function albumPositionsPath(userID, albumID) {
    return albumsPath(userID) + '/' + albumID + '/' + albumPositionCollection;
}

function albumPagesPath(userID, albumID) {
    return albumsPath(userID) + '/' + albumID + '/' + albumPageCollection;
}

//General use adder, adds the given data to the doc found/made in the path
function addDataToDoc(data, path, doc=null) {
    let setDoc = null;
    if(doc != null) {
        setDoc = db.collection(path)
            .doc(doc)
            .set(data);
    }
    else{
        setDoc = db.collection(path)
            .doc()
            .set(data);
    }
    console.log(setDoc);
}

//General use updater, updates the specified doc in the path with the data
function updateDataInDoc(data, path, doc) {
    let updateDoc = db.collection(path)
        .doc(doc)
        .update(data);
    console.log(updateDoc);
}


module.exports = {
    db: db,
    userCollection: userCollection,
    photoCollection: photoCollection,
    albumCollection: albumCollection,
    albumPositionCollection: albumPositionCollection,
    AlbumPageCollection: albumPageCollection,
    categoryCollection: categoryCollection,
    userPath: function () {usersPath();},
    photosPath: function (userID) {photosPath(userID);},
    albumsPath: function (userID) {albumsPath(userID);},
    albumPagesPath: function (userID, albumID) {albumPagesPath(userID, albumID);},
    albumPositionsPath: function (userID, albumID) {albumPositionsPath(userID, albumID);},
    addDataToDoc: function (data, path, doc=null) {addDataToDoc(data, path, doc);},
    updateDataInDoc: function (data, path, doc) {updateDataInDoc(data, path, doc);},
};
