const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const database = require('../database.js');

// ============================================================================
// '/api/image' routes

router.get('/:imageId/view', (req, res) => {
	// Get a specific image's direct url
	console.log("GET /image/:imageID/view");
	console.log(req.params);
	// Might be a good idea to change this to getPhotoReference later on
	database.getPhotoData('test_user', req.params.imageId).then((image) => {
		console.log(image.reference);
		res.send(image.reference);
	})
	// res.sendStatus(200);
});

router.get('/:imageId', (req, res) => {
	// Get an image - Reference, Name, DateTime, Description
	console.log("GET /image/:imageID");
	console.log(req.params);
	database.getPhotoData('test_user', req.params.imageId).then((image) => {
		console.log(image);
		res.send(image);
	});
	// res.send();
	// res.sendStatus(200);
	// res.end();
});

router.post('/', (req, res) =>{
	// Add a new image - Likely will need upload or some kind of url
	console.log("POST /image/");
	console.log(req.params);
	console.log(req.query);
	res.sendStatus(200);
});

router.delete('/', (req, res) => {
	// Delete an image entry. If it has an uploaded image deal with that.
	console.log("DELETE /image/");
	console.log(req.params);
	res.sendStatus(200);
});

module.exports = router;