var firebase = require('firebase');

// Firebase databse connection
const config = {
	apiKey: process.env.APIKEY,
	databaseURL: process.env.DATABASEURL,
	projectId: process.env.PROJECTID,
	storageBucket: process.env.STORAGEBUCKET,
	messageSenderId: process.env.SENDERID,
	appId: process.env.APPID,
}

// admin.initializeApp(functions.config().firebase);
const db_app = firebase.initializeApp(config);
const database = firebase.database(db_app); 
console.log("database opened");

module.exports = {
    db_app: db_app,
    database: database,
}
