// Base code taken from medium.com
// url: medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274  
var firebase = require('firebase');
const express = require('express');
var cors = require ('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
require('dotenv').config();

const admin = require('firebase-admin');
const functions = require('firebase-functions');

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const router = express.Router();

// Firebase databse connection
const config = {
	apiKey: process.env.APIKEY,
	databaseURL: process.env.DATABASEURL,
	projectId: process.env.PROJECTID,
	storageBucket: process.env.STORAGEBUCKET,
	messageSenderId: process.env.SENDERID,
	appId: process.env.APPID,
}

admin.initializeApp(functions.config().firebase);
var db_app = firebase.initializeApp(config);

var database = firebase.database(db_app); 
console.log("database opened");

// Optional - logging in JSON format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// Get method
router.get('/getData', (req, res) => {
	Data.find((err, data) => {
		if (err) return res.json({success: false, error: err});
		return res.json({success: true, data:data});
	});
});

router.post('/api/upload', (req, res) => {
	console.log("test");
});

// Update method - overwrite existing database data
router.post('/updateData', (req, res) => {
	const { id, update } = req.body;
	Data.findByIdAndUpdate(id, update, (err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success:true });
	});
});

// Delete method - remove existing data from the database
router.delete('/deleteData', (req, res) => {
	const { id } = req.body;
	Data.findByIDAndRemove(id, (err) => {
		if (err) return res.send(err);
		return res.json({ success: true });
	});
});

// Create method - create new data in the database
router.post('/putData', (req, res) => {
	let data = new Data();
	
	const { id, message } = req.body;
	
	if ((!id && id !== 0) || !message) {
		return res.json({
			success: false,
			error: 'INVALID INPUTS',
		});
	}
	data.message = message;
	data.id = id;
	data.save((err) => {
		if (err) return res.json ( { success: false, error: err });
		return res.json({ success: true });
	});
});

// aooend '/api' for our http requests 
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log('LISTENING ON PORT ${API_PORT}'));

