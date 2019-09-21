// /backend/data.js
// const firebase = require("firebase");
// the below taken from firebase.google.com/docs/database/admin/save-data
// Import the module
require('dotenv').config();
const firebaseDB = require('./initFirebase');

var admin = require("firebase-admin");
const functions = require('firebase-functions');
// Firebase databse connection
const config = {
	apiKey: process.env.APIKEY,
	databaseURL: process.env.DATABASEURL,
	projectId: process.env.PROJECTID,
	storageBucket: process.env.STORAGEBUCKET,
	messageSenderId: process.env.SENDERID,
	appId: process.env.APPID,
}

// console.log(process.env.GCLOUD_PROJECT);
// console.log(process.env.FIREBASE_CONFIG);
// console.log(config);
// admin.initializeApp(config);

// the a database reference to our (blog?)
// console.log(firebaseDB.database);
var db = firebaseDB.db_app.database();
var ref = db.ref();

// Setting a database reference for table users: 1: {...}
ref = db.ref('users/1')
// Pushing some data to the database

/* // commented so we don't push unnecessary data to the db
ref.set({
	username: "test",
	email: "email@example.com",
});
*/

// Retrieving data from the database and performing an operation on it
function log_snapshot(snapshot){
	console.log(snapshot.val());
}
ref.once('value').then(function(snapshot) {
	var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
	// Applying a function to the snapshot
	log_snapshot(snapshot);
});

/*
// For reference -- from https://firebase.google.com/docs/database/web/read-and-write
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
*/
