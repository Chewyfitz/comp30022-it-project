// Base code taken from medium.com
// url: medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274  
var firebase = require('firebase');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

const express = require('express');
var cors = require ('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();
const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const router = express.Router();

const firebaseDB = require('./initFirebase');
const Data = require('./data');


// Optional - logging in JSON format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// ============================================================================
// '/api/image' routes

router.get('/image/:imageId/view', (req, res) => {
	// Get a specific image's direct url
	console.log("GET /image/:imageID/view");
	console.log(req.params);
	res.sendStatus(200);
});

router.get('/image/:imageId', (req, res) => {
	// Get an image - Reference, Name, DateTime, Description
	console.log("GET /image/:imageID");
	console.log(req.params);
	res.sendStatus(200);
	// res.end();
});

router.post('/image/', (req, res) =>{
	// Add a new image - Likely will need upload or some kind of url
	console.log("POST /image/");
	console.log(req.params);
	res.sendStatus(200);
});

router.delete('/image/', (req, res) => {
	// Delete an image entry. If it has an uploaded image deal with that.
	console.log("DELETE /image/");
	console.log(req.params);
	res.sendStatus(200);
});

// ============================================================================
// '/api/album' routes 

// '/api/album/:albumId'
router.get   ('/album/:albumId?', (req, res) => {
	console.log("GET /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});
router.post  ('/album/', (req, res) => {
	console.log("POST /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});
router.put   ('/album/:albumId', (req, res) => {
	console.log("PUT /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});
router.patch ('/album/:albumId', (req, res) => {
	console.log("PATCH /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});
router.delete('/album/:albumId', (req, res) => {
	console.log("DELETE /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});

// '/api/album/:albumId/:pageId'
router.get   ('/album/:albumId/:pageId', (req, res) => {
	console.log("GET /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
router.post  ('/album/:albumId/:pageId', (req, res) => {
	console.log("POST /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
router.put   ('/album/:albumId/:pageId', (req, res) => {
	console.log("PUT /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
router.patch ('/album/:albumId/:pageId', (req, res) => {
	console.log("PATCH /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
router.delete('/album/:albumId/:pageId', (req, res) => {
	console.log("DELETE /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});

// prepend '/api' for our http requests 
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log('LISTENING ON PORT '+API_PORT));

