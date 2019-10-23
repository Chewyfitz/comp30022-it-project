/**This file contains all the core functionalities needed to interact with the
 * database and is used by all other database related js files*/

/**Needed requirements to communicate with the database*/
const firebase = require("firebase/app");
require("firebase/firestore");
require('dotenv').config();

/**Configuration settings for the database (read from .env file)*/
const config = {
    apiKey: process.env.APIKEY,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messageSenderId: process.env.SENDERID,
    appId: process.env.APPID,
};

/**Initialise the database api and store the reference to it*/
firebase.initializeApp(config);
const db = firebase.firestore();

/**Declaration of all the Collection names that are in the database*/
const userCollection = 'Users';
const photoCollection = 'Photos';
const albumCollection = 'Albums';
const albumPositionCollection = 'Album Positions';
const albumPageCollection = 'Album Page';
const categoryCollection = 'Categories';

/**Function that generates the path to a particular collection of documents
 * allowing for nesting differences*/

/**
 * Generates the path to the root Users Collection.
 *
 * @return {String} - Path to the root Users Collection
 * */
function usersPath() {
    return userCollection;
}

/**
 * Generates the Path to the Photo SubCollection owned by the User.
 *
 * @param {String} userID - The owner of the Photos Collection
 *
 * @return {String} - Path to the specified Photos SubCollection
 * */
function photosPath(userID) {

    return usersPath() + '/' + userID + '/' + photoCollection}

/**
 * Generates the Path to the Albums SubCollection owned by the User.
 *
 * @param {String} userID - The owner of the Albums Collection
 *
 * @return {String} - Path to the specified Albums SubCollection
 * */
function albumsPath(userID) {
    return usersPath() + '/'+userID+'/' + albumCollection}

/**
 * Generates the Path to the AlbumPages SubCollection owned by the User and
 * found withing the given Album.
 *
 * @param {String} userID - The owner of the Albums Collection
 * @param {String} albumID - The Album the AlbumPages SubCollection is in
 *
 * @return {String} - Path to the specified AlbumPages SubCollection
 * */
function albumPagesPath(userID, albumID) {
    return albumsPath(userID) + '/' + albumID + '/' + albumPageCollection;
}

/**
 * Generates the Path to the AlbumPositions SubCollection owned by the User and
 * found withing the given Album.
 *
 * @param {String} userID - The owner of the Albums Collection
 * @param {String} albumID - The Album the AlbumPositions SubCollection is in
 *
 * @return {String} - Path to the specified AlbumPositions SubCollection
 * */
function albumPositionsPath(userID, albumID) {
    return albumsPath(userID) + '/' + albumID + '/' + albumPositionCollection;
}



/**
 * General use adder, currently creates a new Document and stores the data in
 * it. NOTE: If a document key is given it will override any preexisting
 * documents that use that key.
 *
 * @param {Object} data - Basically a dictionary of key-value pairs where the
 *                        key represents the field represents the value will be
 *                        added to in the Document
 * @param {String} path - The path to the Collection the Document will be
 *                        created in
 * @param {String} [doc=undefined] - The key the created document should have, leave
 *                              blank/undefined for a randomly generated key
 *
 * @return {Boolean} - True only if the document was created successfully
 * */
async function addDataToDoc(data, path, doc=undefined) {
    //Initialisation
    let docID = undefined;
    let setDoc = undefined;
    let success = false;
    //If a key for the doc was specified, use that key to create the doc
    if(doc) {
        //Stores the promise to create a document and store the data in it
        setDoc = db.collection(path)
            .doc(doc)
            .set(data)
            //If successfully created then we know that the docID = doc
            .then(value => {
                docID = doc;
            });
    }
    //Else created the doc with a randomly generated key
    else{
        //Stores the promise to create a document and store the data in it
        setDoc = db.collection(path)
            .add(data)
            //If successfully created then get the docID from the new reference
            .then(value => {
                docID = value.id;
            });
    }
    //Wait for the promise to be resolved/rejected
    await setDoc;
    //docID will now have its final value, return it.
    return docID;
}

/**
 * General use updater, currently updates the document with the given data,
 * NOTE: I think that if either the document or a specified field does not exist
 * then one will be created and then updated accordingly.
 *
 * @param {Object} data - Basically a dictionary of key-value pairs where the
 *                        key represents the field represents the value will be
 *                        updated in the Document
 * @param {String} path - The path to the Collection the Document to be updated
 *                        is in.
 * @param {String} doc - The key of the Document that will be update
 *
 * @return {Boolean} - True only if the document was updated successfully
 * */
async function updateDataInDoc(data, path, doc) {
    //Initialisation
    let success = false;
    //Stores the promise to update the document and store the data in it
    let updateDoc = db.collection(path)
        .doc(doc)
        .update(data)
        //If the Promise is successfully resolved, assign success to true
        .then(value => {
            success = true;
        });
    //Wait for the promise to be resolved/rejected
    await updateDoc;
    //Success will now have its final value, return it.
    return success;
}

/**
 * Retrieves a reference to a Document. NOTE: This is not to be confused with
 * a path
 *
 * @param {String} path - The path to the Collection that the Document is in
 * @param {String} doc - The key of the Document
 *
 * @return {firebase.firestore.DocumentReference} - A firebase reference to the
 *                                                  document
 * */
function getDocRef(path, doc){
    return db.collection(path).doc(doc);
}

/**
 * Retrieves a Document from the database
 *
 * @param {String} path - The path to the Collection that the Document is in
 * @param {String} doc - The key of the Document
 *
 * @return {firebase.firestore.DocumentSnapshot} - More or less has everything
 *                                                 about the document at time
 *                                                 of resolution.
 * */
async function getDoc(path, doc) {
    let document = await db.collection(path).doc(doc).get();
    return document;
}

//just an example of how to get the key of a document from its documentsnapshot
async function getDocID(path, doc) {
    let id = undefined
    let document = await db.collection(path).doc(doc).get().then(value => {
        id = value.id;
    });
    return id;
}

/**
 * Retrieves the data from a Document in the database
 *
 * @param {String} path - The path to the Collection that the Document is in
 * @param {String} doc - The key of the Document
 *
 * @return {firebase.firestore.DocumentData} - Basically a dictionary of
 *                                             key-value pairs where the key
 *                                             represents the field of the data
 * */
async function getDataInDoc(path, doc) {
    //Initialisation
    let data = {};
    //Stores the promise to retrieve a document
    let document = await db.collection(path).doc(doc).get()
        //If the Promise is successfully resolved, retrieve the data from it
        .then(value => {
        if(value.exists) {
            data = value.data();
        }
    });
    //Wait for the promise to be resolved/rejected
    await document;
    //Return the data if the document existed otherwise an empty opbject
    return data;
}

/**Exports the functions and values that are intended to be used by the other
 * database js files*/
module.exports = {
    //Database API reference (needed?)
    db: db,
    //Database Collection names
    userCollection: userCollection,
    photoCollection: photoCollection,
    albumCollection: albumCollection,
    albumPositionCollection: albumPositionCollection,
    AlbumPageCollection: albumPageCollection,
    categoryCollection: categoryCollection,
    //Functions to generate paths to (Sub)Collections
    usersPath: usersPath,
    photosPath: photosPath,
    albumsPath: albumsPath,
    albumPagesPath: albumPagesPath,
    albumPositionsPath: albumPositionsPath,
    //Functions to interact with the database
    addDataToDoc: addDataToDoc,
    updateDataInDoc: updateDataInDoc,
    getDataInDoc: getDataInDoc,
    getDocRef: getDocRef,
};
