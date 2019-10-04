const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const database = require('../database.js');

// ============================================================================
// '/api/album' routes 

// '/api/album/:albumId'
router.get   ('/:albumId?', (req, res) => {
	// Get an album with a specified ID
	console.log("GET /album/:albumId");
	console.log(req.params);

	// get 'un'-album if no id specified
	if (!req.params.albumId) albumId = 'un';
	// console.log(req.query);
	database.getAlbumData('test_user', 'un').then((album) => {
		// TODO: Work out what to send here?

		console.log(album);
		console.log(album.photos[0]._key);
		console.log(album.photos[0].exists);

		/*
		album.photos[0].get().then(doc => {
			console.log(doc);
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}
		}).catch(err => {
			console.log('Error getting document', err);
		});
		*/
	});
	res.sendStatus(200);
});
router.post  ('/', (req, res) => {
	// Create a new album, and return its ID
	console.log("POST /album/:albumID");
	console.log(req.params);
	console.log(req.query);
	res.sendStatus(200);
});
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
	res.sendStatus(200);
});
router.delete('/:albumId', (req, res) => {
	// Delete an album
	console.log("DELETE /album/:albumID");
	console.log(req.params);
	res.sendStatus(200);
});

// ============================================================================
// '/api/album/:albumId/:pageId' routes

// '/api/album/:albumId/:pageId'
router.get   ('/:albumId/:pageId', (req, res) => {
	// Get a page of an album
	console.log("GET /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
router.post  ('/:albumId/:pageId', (req, res) => {
	// Create a new album page
	console.log("POST /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});
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
router.delete('/:albumId/:pageId', (req, res) => {
	// Delete an album page
	console.log("DELETE /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});

module.exports = router;