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

//General use getter , retrieves the data in the doc at in the path
function getDataInDoc(path, doc) {
    let gottenDoc = db.query();
    console.log(gottenDoc);
}

//General inquirer
function checkDataInDoc(query, path, doc) {
    let gottenDoc = db.query.isEqual(query);
    console.log(gottenDoc);
}

module.exports = {
    db: db,
    addDataToDoc: function (data, path, doc=null) {addDataToDoc(data, path, doc);},
    updateDataInDoc: function (data, path, doc) {updateDataInDoc(data, path, doc);},
    getDataInDoc: function (path, doc) {getDataInDoc(path, doc);},
    checkDataInDoc: function (query, path, doc) {checkDataInDoc(query, path, doc);},
};
