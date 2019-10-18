const express = require('express');
const router = express.Router();
const util = require('../util/image');

// ============================================================================
// Middleware

// Cors enables cross-origin resource sharing
const cors = require('cors');

// Multer enables reading form data from a HTTP request
var multer = require('multer');
var storage = multer.memoryStorage();
const upload = multer({ storage });

// ============================================================================
// '/api/image' routes

router.get('/:imageId/view', (req, res) => {
	var user = req.query.user;

	// Get a specific image's direct url
	// console.log("GET /image/:imageID/view");
	// console.log(req.params);

	// TODO: Add catch for possible errors
	// call the util/image.js function that deals with this route
	util.getImageRefById(user, req.params.imageId).then((imageRef) => {
		res.send(imageRef);
	});
});

router.get('/:imageId', (req, res) => {
	var user = req.query.user;
	// Get an image - Reference, Name, DateTime, Description
	// console.log("GET /image/:imageID");
	// console.log(req.params);
	// TODO: Add catch for possible errors
	// call the util/image.js function that deals with this route
	util.getImageById(user, req.params.imageId).then((imageData) => {
		res.send(imageData);
	});
});

router.post('/', cors(), upload.array('file'), (req, res) => {
	// variables of interest here are req.files, req.params, and req.query

	// Add a new image - Likely will need upload or some kind of url
	// console.log("POST /image/");
	// TODO: Add user auth check
	if(req.query.user && req.query.image){
    // Add the URL to the user.
		util.addPhotoToUser(req.query.user, req.query.image).then(responseStatus => {
      // If you've never seen this format before, it's just an if/then/else in 
      // a different form (that I think looks clean).
      // Read it similarly to a normal english sentence: 
      // [is] responseStatus? res.sendStatus(200)[.] : [else] res.sendStatus(500)
			responseStatus ? res.sendStatus(200) : res.sendStatus(500);
		});
  } else if(req.query.user && req.files){
    // Upload the sent files
    util.uploadPhotos(req.files).then(refs => {
      // Add the uploaded file URIs to the user so we don't lose them.
      util.addPhotosToUser(req.query.user, refs).then(responseStatus => {
        responseStatus ? res.sendStatus(200) : res.sendStatus(500);
	  });
	  // TODO: Add the IDs to the un-album.
    });
  } else {
    // Something weird happened
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
