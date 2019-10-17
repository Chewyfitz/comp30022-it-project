const express = require('express');
const router = express.Router();
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

/**
 * Currently only allows URL-based "upload"
 * will add actual image upload... when I can figure out how
 */
router.post('/', (req, res) =>{
	// Add a new image - Likely will need upload or some kind of url
	console.log("POST /image/");
	// TODO: Add user auth check
	console.log(req.params);
	console.log(req.query);
	if(req.query.user && req.query.image){
		util.addPhotoToUser(req.query.user, req.query.image).then(responseStatus => {
			responseStatus?res.sendStatus(200) : res.sendStatus(500);
		});
	} else{
		res.sendStatus(400);
	}
});

router.delete('/', (req, res) => {
	// Delete an image entry. If it has an uploaded image deal with that.
	console.log("DELETE /image/");
	console.log(req.params);
	res.sendStatus(200);
});

module.exports = router;
