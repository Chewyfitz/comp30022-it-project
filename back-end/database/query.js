
const general = require('./general_database');
const db = general.db;

/**
 * It returns an array of firebase.firestore.DocumentReference made of all the
 * Documents contained in the Collection
 *
 * @param {String} path - The path to the collection
 *
 * @return {firebase.firestore.DocumentReference[]} - An array of all the
 *                                         firebase.firestore.DocumentReferences
 *                                         in the collection
 * */
async function getAllDocsInCollection(path) {
    //Initialisation
    let docs = [];
    //Gets a collection query snapshot from the database
    let collection = await db.collection(path).get();
    //For all the documents in the snapshot, add their reference to an array
    return collection.docs;
}

/**
 * It returns an array of Strings made of the IDs of every document in the
 * Collection
 *
 * @param {String} path - The path to the collection
 *
 * @return {String[]} - An array of all the Document IDs in the collection
 * */
async function getAllIDsInCollection(path) {
    //Initialisation
    let ids = [];
    //Gets all the docs in the collection
    let docs = await getAllDocsInCollection(path);
    //For all the documents in the snapshot, add their ID to an array
    await docs.forEach(value => {
        ids.push(value.id);
    });
    //Return the array of document IDs
    return ids;
}

/**
 * It returns an array of firebase.firestore.DocumentData made of all the
 * Documents contained in the Collection
 *
 * @param {String} path - The path to the collection
 *
 * @return {firebase.firestore.DocumentData[]} - An array of all the
 *                                         firebase.firestore.DocumentData
 *                                         in the collection
 * */
async function getAllDataInCollection(path) {
    //Initialisation
    let data = [];
    //Gets all the docs in the collection
    let docs = await getAllDocsInCollection(path);
    //For all the documents in the snapshot, add their data to an array
    await docs.forEach(value => {
        data.push(value.data());
    });
    //Return the array of document data
    return data;
}

/**
 * It returns an array of firebase.firestore.DocumentData made of all the
 * Documents contained in the Collection
 *
 * @param {String} path - The path to the collection
 *
 * @return {number} - An array of all the firebase.firestore.DocumentData in the
 *                    collection
 * */
async function getNumDocsInCollection(path) {
    //Gets a collection query snapshot from the database
    let collection = await db.collection(path).get();
    //Returns size of the query (the number of docs that it encompasses)
    return collection.size;
}

module.exports = {
    getAllDataInCollection: getAllDataInCollection,
    getAllDocsInCollection: getAllDocsInCollection,
    getAllIDsInCollection: getAllIDsInCollection,
    getNumDocsInCollection: getNumDocsInCollection,
};