/**This file contains all the core functionalities needed to interact with the
 * database and is used by all other database related js files*/

/**Needed requirements to communicate with the database*/
const firebase = require("firebase/app");
const admin = require("firebase-admin");
require("firebase/firestore");
require('dotenv').config();

/**Configuration settings for the database*/
const config = {
    apiKey: process.env.APIKEY,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messageSenderId: process.env.SENDERID,
    appId: process.env.APPID,
};
const serviceAccount = JSON.parse(process.env.GCS_JSON_TOKEN);

/**Initialise the database api and store the references to it*/
firebase.initializeApp(config);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASEURL
});
const db = firebase.firestore();

/**Declaration of all the Collection names that are in the database*/
const userCollection = 'Users';
const photoCollection = 'Photos';
const albumCollection = 'Albums';
const albumPositionCollection = 'Album Positions';
const albumPageCollection = 'Album Page';
//const categoryCollection = 'Categories';
//const TagCollection = 'Tags';

/**Function that generates the path to a particular Collection of Documents
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
    return usersPath() + '/' + userID + '/' + photoCollection;
}

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
 * General use Document Creator, currently creates a new Document in the
 * specified collection and stores the given data in it. If a document key is
 * given, then a Document with that key will be created if none other exists.
 *
 * @param {Object} data - Basically a dictionary of key-value pairs where the
 *                        key represents the field represents the value will be
 *                        added to in the Document
 * @param {String} path - The path to the Collection the Document will be
 *          created in
 * @param {String} [doc=undefined] - The key the created document should have,
 *          leave blank/undefined for a randomly generated key
 *
 * @return {String} - True docID if the new document was successfully created,
 *
 * */
async function addDataToDoc(data, path, doc=undefined) {
    //Initialisation
    let docID;
    let promise;
    let success = false;
    //If a key for the doc was specified, use that key to create the doc
    if(doc) {
        //Stores the promise of .then() to wait on
        promise = admin.firestore().collection(path)
            .doc(doc)
            .create(data)
            //The promise resolves only if it's not overwriting anything
            .then(resValue => {
                //If it resolves, then we know the docID = doc and it succeeded
                docID = doc;
                success = true;
            }, rejValue => {
                //TODO Do I need to handle this rejection?
                console.log("ERROR in general_database.js addDataToDoc: " +
                    "Tried to add the data of " + data + " to " + path + '/' +
                    doc + "but the promise was rejected \n Rejection Value: " +
                    rejValue);
        });
    }
    //Else created the doc with a randomly generated key
    else{
        //Stores the promise of .then()
        promise = db.collection(path)
            .add(data)
            //If the promise resolves, then its value will be the docID
            .then(resValue => {
                docID = resValue.id;
            }, rejValue => {
                //TODO Do I need to handle this rejection?
                console.log("ERROR in general_database.js addDataToDoc: " +
                    "Tried to add the data of " + data + " to " + path + '/' +
                    "but the promise was rejected \n Rejection Value: " +
                    rejValue);
            });
    }
    //Wait for the promise to be resolved/rejected
    await promise;
    //docID will now have its final value, return it.
    return docID;
}

/**
 * !CAUTION!
 * !COULD POTENTIALLY RESULT IN A LARGE STACK!
 * !!DOES NOT DELETE REFERENCES TO THE DOCUMENT!!
 * Deletes the Documents in a Collection and its descendants.
 *
 * @param {String} path - The path to the Collection to be deleted
 *
 * @returns {Boolean} - True only if all the documents and their descendants
 *          were successfully deleted, false if even one document failed to
 *          delete.
 */
async function deleteCollection(path) {
    //Makes a call to a recursive function that does all the work
    return recDeleteAllFomCollection(admin.firestore().collection(path));
}

/**
 * !CAUTION!
 * !COULD POTENTIALLY RESULT IN A LARGE STACK!
 * !!DOES NOT DELETE REFERENCES TO THE DOCUMENT!!
 * Deletes the document and its descendants
 *
 * @param {String} path - The path to the Collection the Document that will be
 *          deleted
 * @param {String} doc -  The key of the Document
 *
 * @returns {Boolean} - True only if the document and its descendants were
 *          successfully deleted, false if even one document failed to delete.
 */
async function deleteDoc(path, doc) {
    //Makes a call to a recursive function that does all the work
    return recDeleteAllFromDoc(admin.firestore().collection(path).doc(doc));
}

/**
 * !CAUTION!
 * !COULD POTENTIALLY RESULT IN A LARGE STACK!
 * !!DOES NOT DELETE REFERENCES TO THE DOCUMENT!!
 * Deletes a Collection and all its Documents and SubCollections in a
 * depth-first manner using two function recursion.
 *
 * @param {FirebaseFirestore.CollectionReference} reference - Reference of the
 *          Document that is being deleted from the database
 *
 * @returns {Boolean} - True only if the document and all its descendants were
 *          successfully deleted, false if even one document failed
 *          to delete.
 */
async function recDeleteAllFomCollection(reference) {
    //Initialisation
    let docDeletionSuccesses = [];
    let documents;
    let success = false;
    //Gets the list of all Document References in the Collection
    documents = await reference.listDocuments();
    //For each document, delete it and all of its descendants
    documents.forEach(document => {
        //Stores each success (which will be a promise)
        docDeletionSuccesses.push(recDeleteAllFromDoc(document));
    });
    //Wait for all the promises to resolve simultaneously
    await Promise.all(docDeletionSuccesses);
    //It succeeded only if nothing failed
    success = !docDeletionSuccesses.includes(false);
    return success;
}

/**
 * !CAUTION!
 * !COULD POTENTIALLY RESULT IN A LARGE STACK!
 * !!DOES NOT DELETE REFERENCES TO THE DOCUMENT!!
 * Deletes a document and all its SubCollections and SubDocument in a
 * depth-first manner using two function recursion.
 *
 * @param {FirebaseFirestore.DocumentReference} reference - Reference of the
 *          Document that is being deleted from the database
 *
 * @returns {Boolean} - True only if the document and all its descendants were
 *          successfully deleted, false if even one document failed to delete.
 */
async function recDeleteAllFromDoc(reference) {
    //Initialisation
    let collectionDelSuccesses = [];
    let subCollections;
    let success = false;
    //Gets a list of all the Documents SubCollections
    subCollections = await reference.listCollections();
    //For each SubCollection, delete it and its descendants
    subCollections.forEach(collection => {
        //Stores each success (which will be a promise)
        collectionDelSuccesses.push(recDeleteAllFomCollection(collection));
    });
    //Delete this document as well (and store its success)
    collectionDelSuccesses.push(reference.delete());
    //Wait for all the promises to resolve simultaneously
    await Promise.all(collectionDelSuccesses);
    //It succeeded only if nothing failed
    success = !collectionDelSuccesses.includes(false);
    return success;
}

/**
 * Retrieves the data from a Document in the database
 *
 * @param {String} path - The path to the Collection that the Document is in
 * @param {String} doc - The key of the Document
 *
 * @return {firebase.firestore.DocumentData} - Basically a dictionary of
 *          key-value pairs where the key represents the field of the data,
 *          returns undefined if the document doesn't exist
 * */
async function getDataInDoc(path, doc) {
    //Initialisation
    let data;
    //Stores the promise to retrieve a document
    let document = await db.collection(path)
        .doc(doc)
        .get()
        //On resolution of the promise
        .then(resValue => {
            //If the document exists get the data
            if(resValue.exists) {
                data = resValue.data();
            } else {
                //There is no data to get from a Document that doesn't exist
                console.log("ERROR in general_database.js getDataInDoc: " +
                    "Tried to get the data of " + path + '/' + doc + "but the" +
                    " Document does not exist");
            }
        //On rejection of the promise
        }, rejValue => {
            //TODO Do I need to handle this rejection?
            console.log("ERROR in general_database.js getDataInDoc: " +
                "Tried to get the data of " + path + '/' + doc + "but the" +
                " promise was rejected \n Rejection Value: " + rejValue);
        });
    //Wait for the promise to be resolved/rejected
    await document;
    //Return the data if the document existed otherwise an empty object
    return data;
}

/**
 * Retrieves a Document from the database
 *
 * @param {String} path - The path to the Collection that the Document is in
 * @param {String} doc - The key of the Document
 *
 * @return {firebase.firestore.DocumentSnapshot} - More or less has everything
 *          about the document at time of resolution.
 * */
async function getDoc(path, doc) {
    let document = await db.collection(path)
        .doc(doc)
        .get();
    return document;
}

/**
 * Retrieves a reference to a Document. NOTE: This is not to be confused with
 * a path
 *
 * @param {String} path - The path to the Collection that the Document is in
 * @param {String} doc - The key of the Document
 *
 * @return {FirebaseFirestore.DocumentReference} - A firebase reference to the
 *          document
 * */
function getDocRef(path, doc){
    return admin.firestore().collection(path).doc(doc);
}

/**
 * General use updater, currently updates the document with the given data,
 * NOTE: I think that if either the document or a specified field does not exist
 * then one will be created and then updated accordingly.
 *
 * @param {Object} data - Basically a dictionary of key-value pairs where the
 *          key represents the field represents the value will be
 *          updated in the Document
 * @param {String} path - The path to the Collection the Document to be updated
 *          is in.
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
        .then(resValue => {
            success = true;
        //If the Promise is rejected
        }, rejValue => {
            //TODO Do I need to handle this rejection?
            console.log("ERROR in general_database.js updateDataInDoc: " +
                "Tried to update " + path + '/' + doc + "with " + data +
                "but the promise was rejected \n Rejection Value: " + rejValue);
        });
    //Wait for the promise to be resolved/rejected
    await updateDoc;
    //Success will now have its final value, return it.
    return success;
}

/**Exports the functions and values that are intended to be used by the other
 * database js files*/
module.exports = {
    //Database API reference (needed?)
    db,
    //Database Collection names
    userCollection,
    photoCollection,
    albumCollection,
    albumPositionCollection,
    albumPageCollection,
    //Functions to generate paths to (Sub)Collections
    usersPath,
    photosPath,
    albumsPath,
    albumPagesPath,
    albumPositionsPath,
    //Functions to interact with the database
    addDataToDoc,
    deleteCollection,
    deleteDoc,
    getDataInDoc,
    getDoc,
    getDocRef,
    updateDataInDoc,
};
