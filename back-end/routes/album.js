const express = require('express');
const router = express.Router();
const util = require('../util/album');
const pageUtil = require('..util/albumPage');

// ============================================================================
// '/api/album' routes 

// Create

router.post  ('/', (req, res) => {
	// Create a new album, and return its ID
	console.log("POST /album/");
	console.log(req.params);
	console.log(req.query);
	var user = 'test_user';

	util.createAlbum(user, req.query.albumName).then( (album) => {
		if(album){
			res.status(201);
			res.send(album);
		} else {
			res.sendStatus(500);
		}
	}).catch(() => {
		res.sendStatus(500);
	});
});

// Read

// '/api/album/:albumId'
router.get   ('/:albumId?', (req, res) => {
	// Get an album with a specified ID
	if(req.params.albumId){
		util.getAlbumById('test_user', req.params.albumId).then((album) =>{
			if(album){
				res.status(201);
				res.send(album);
			} else {
				res.sendStatus(500);
			}
		}).catch(() => {
			res.sendStatus(404);
		});
	} else {
		util.getAllAlbumNames('test_user').then((names) => {
			res.status(200);
			res.send(names);
		}).catch((err) => {
			res.send(err.toString());
		});
	}
});

// Update

// TODO: PUT update
router.put   ('/:albumId', (req, res) => {
	// Update an album (May be removed in preference to PATCH)
	console.log("PUT /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});

router.patch ('/:albumId', (req, res) => {
	// Update an album
	console.log("PATCH /album/:albumID");
	console.log(req.params);
	console.log(req.query);
	var user = 'test_user';
	util.updateAlbumAttributes(user, req.params.albumId, req.query).then((truth_val) => {
		if(truth_val){
			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	}).catch(() => {
		res.sendStatus(500);
	});
	res.sendStatus(200);
});

// Delete

router.delete('/:albumId', (req, res) => {
	// Delete an album
	console.log("DELETE /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});

// ============================================================================
// '/api/album/:albumId/:pageId' routes

// Create

router.post  ('/:albumId/:pageId', (req, res) => {
	// Create a new album page
	console.log("POST /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});

// Read

// '/api/album/:albumId/:pageId'
router.get   ('/:albumId/:pageId', (req, res) => {
	// Get a page of an album
	console.log("GET /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});

// Update

router.put   ('/:albumId/:pageId', (req, res) => {
	// Update an album page (might be useful eg. for copy/paste)
	console.log("PUT /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
router.patch ('/:albumId/:pageId', (req, res) => {
	// Update an album page (just a small part)
	console.log("PATCH /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});

// Delete

router.delete('/:albumId/:pageId', (req, res) => {
	// Delete an album page
	console.log("DELETE /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});

module.exports = router;
