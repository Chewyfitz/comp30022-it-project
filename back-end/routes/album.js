const express = require('express');
const router = express.Router();
const util = require('../util/album');
const pageUtil = require('../util/albumPage');

// ============================================================================
// '/api/album' routes 

// Create

router.post  ('/', (req, res) => {
	// Create a new album, and return its ID
	// console.log("POST /album/");
	// console.log(req.params);
	// console.log(req.query);
	var user = req.query.user;

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
	var user = req.query.user;
	if(req.params.albumId){
		util.getAlbumById(user, req.params.albumId).then((album) =>{
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
		util.getAllAlbumNames(user).then((names) => {
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
	// console.log("PATCH /album/:albumID");
	// console.log(req.params);
	// console.log(req.query);
	var user = req.query.user;
	util.updateAlbumAttributes(user, req.params.albumId, req.query).then((truth_val) => {
		if(truth_val){
			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	}).catch(() => {
		res.sendStatus(500);
	});
});

// Delete

router.delete('/:albumId', (req, res) => {
	const userId = req.query.userId || 'test_user';
	const albumId = req.params.albumId;

	// Optional - delete position
	const position = req.params.position;
	if(position){
		util.deleteAlbumPosition(userId, albumId, position).then( (success) => {
			if(success){
				res.sendStatus(204);
			} else {
				res.sendStatus(400);
			}
		}).catch( (err) => {
			res.status(500);
			res.send(err.toString());
		});
	} else {
		util.deleteAlbum(userId, albumId).then((success) => {
			if(success){
				res.sendStatus(204);
			} else {
				res.sendStatus(400);
			}
		}).catch( (err) => {
			res.status(500);
			res.send(err.toString());
		});
	}

});

// ============================================================================
// '/api/album/:albumId/:pageId' routes

// Create

router.post  ('/:albumId/:pageId', (req, res) => {
	// Create a new album page
	var user = req.query.user;

	if( req.params.albumId && req.params.pageId 
		&& req.query.template){

		pageUtil.createAlbumPage(user, req.params.albumId, req.params.pageId, req.query.template);
		res.sendStatus(201);
	} else {
		res.sendStatus(400);
	}
});

// Read

// '/api/album/:albumId/:pageId'
router.get   ('/:albumId/:pageId', (req, res) => {
	var user = req.query.user;
	// Get a page of an album
	if( req.params.albumId && req.params.pageId ){
		template = pageUtil.getAlbumPageTemplate(user, req.params.albumId, req.params.pageId);
		res.send(template);
	} else {
		res.sendStatus(400);
	}
});

// Update

router.put   ('/:albumId/:pageId', (req, res) => {
	var user = req.query.user;
	// Update an album page (might be useful eg. for copy/paste)
	if( req.params.albumId && req.params.pageId && req.query.template ){
		success = pageUtil.updateAlbumPageAttributes(user, req.params.albumId, req.params.pageId, req.query.template);
		if(success){
			res.sendStatus(204);
		} else {
			res.sendStatus(500);
		}
	} else {
		res.sendStatus(400);
	}
});
router.patch ('/:albumId/:pageId', (req, res) => {
	var user = req.query.user;
	// Update an album page (might be useful eg. for copy/paste)
	if( req.params.albumId && req.params.pageId && req.query.template ){
		pageUtil.updateAlbumPageAttributes(user, req.params.albumId, req.params.pageId, req.query.template);
		res.sendStatus(204);
	} else {
		res.sendStatus(400);
	}
});

// Delete

router.delete('/:albumId/:pageId', (req, res) => {
	// Delete an album page
	console.log("DELETE /album/:albumID/:pageId");
	console.log(req.params);
	res.sendStatus(200);
});

module.exports = router;
