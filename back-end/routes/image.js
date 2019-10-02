const express = require('express');
const router = express.Router();
const database = require('../database.js');
const util = require('../util/image');

// ============================================================================
// '/api/image' routes

router.get('/:imageId/view', (req, res) => {
	// Get a specific image's direct url
	console.log("GET /image/:imageID/view");
	console.log(req.params);

	// TODO: Add catch for possible errors
	// call the util/image.js function that deals with this route
	util.getImageRefById('test_user', req.params.imageId).then((imageRef) => {
		res.send(imageRef);
	});
});

router.get('/:imageId', (req, res) => {
	// Get an image - Reference, Name, DateTime, Description
	console.log("GET /image/:imageID");
	console.log(req.params);
	// TODO: Add catch for possible errors
	// call the util/image.js function that deals with this route
	util.getImageById('test_user', req.params.imageId).then((imageData) => {
		res.send(imageData);
	});
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
