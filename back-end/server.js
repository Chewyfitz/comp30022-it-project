// server.js Aidan Fitzpatrick (835833)
/*
*	A node.js server to serve an api on http://[url]:process.env.PORT/api/
*	This is the main routing file, and is used in conjunction with database 
*	interactors written by Patrick to send data to a Firebase "FireStore" 
*	database.
*	If you want to use this server in your own environment you can define
*	environment variables, or alternatively create a file titled '.env' in the
*	server's root directory with the firebase access configuration variables
*	defined.
*/

// Base code taken from medium.com
// url: medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274
// though at this point I'm confident it is distinct enough that I can consider it to be my own work.

// ** Components used for logging - not currently used
// var cors = require ('cors');
// const logger = require('morgan');
// app.use(cors());

const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const API_PORT = process.env.PORT || 3001;
const app = express();
const router = express.Router();

const database = require('./database.js');
app.use(bodyParser.json());


// ** To be added at a later date
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(logger('dev'));

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
	// Get an album with a specified ID
	console.log("GET /album/:albumID");
	console.log(req.params);
	console.log(req.query);
	res.sendStatus(200);
});
router.post  ('/album/', (req, res) => {
	// Create a new album, and return its ID
	console.log("POST /album/:albumID");
	console.log(req.params);
	console.log(req.query);
	res.sendStatus(200);
});
router.put   ('/album/:albumId', (req, res) => {
	// Update an album (May be removed in preference to PATCH)
	console.log("PUT /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});
router.patch ('/album/:albumId', (req, res) => {
	// Update an album
	console.log("PATCH /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});
router.delete('/album/:albumId', (req, res) => {
	// Delete an album
	console.log("DELETE /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});

// '/api/album/:albumId/:pageId'
router.get   ('/album/:albumId/:pageId', (req, res) => {
	// Get a page of an album
	console.log("GET /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
router.post  ('/album/:albumId/:pageId', (req, res) => {
	// Create a new album page
	console.log("POST /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
router.put   ('/album/:albumId/:pageId', (req, res) => {
	// Update an album page (might be useful eg. for copy/paste)
	console.log("PUT /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
router.patch ('/album/:albumId/:pageId', (req, res) => {
	// Update an album page (just a small part)
	console.log("PATCH /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
router.delete('/album/:albumId/:pageId', (req, res) => {
	// Delete an album page
	console.log("DELETE /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});

// prepend '/api' for our http requests 
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log('LISTENING ON PORT '+API_PORT));

