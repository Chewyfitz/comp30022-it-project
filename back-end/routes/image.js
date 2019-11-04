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
	// Get a specific image's direct url
	var user = req.query.user;

	// TODO: Add catch for possible errors
	// call the util/image.js function that deals with this route
	util.getImageRefById(user, req.params.imageId).then((imageRef) => {
		res.send(imageRef);
	});
});

router.get('/:imageId', (req, res) => {
	// Get an image - Reference, Name, DateTime, Description
	var user = req.query.user;

	// TODO: Add catch for possible errors
	// call the util/image.js function that deals with this route
	util.getImageById(user, req.params.imageId).then((imageData) => {
		res.send(imageData);
	});
});

// cors() is already being used in the top level implementation
router.post('/', /*cors(),*/ upload.array('file'), (req, res) => {
	// variables of interest here are req.files, req.params, and req.query

	// TODO: Add user auth check
	var album = req.query.album || 'un';

	//I have a feeling back end should actually try to get this info somehow?
	let height = req.query.height;
	let width = req.query.width;

	if(req.query.user && req.query.image){
		console.log(`user: ${req.query.user} | image: ${req.query.image}`);
    // Add the URL to the user.
		util.addPhotoToUser(req.query.user, req.query.image, height, width, album).then(responseStatus => {
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

router.delete('/:photoId', (req, res) => {
	// Delete an image entry. If it has an uploaded image deal with that.
	const user = req.query.user;
	var imageId;
	if(req.params.photoId){
		imageId = req.params.photoId;
	} else if(req.query.photoId) {
		imageId = req.query.photoId;
	} else {
		// If you don't say what photo you want us to delete, we can't do it...
		res.sendStatus(400);
		return;
	}

	util.deletePhotoById(user, imageId).then( (status) => {
		if(status){
			res.sendStatus(204);
		} else {
			res.sendStatus(400);
		}
	}).catch( (err) => {
		res.status(500);
		res.send(err.toString());
	});
});

module.exports = router;
