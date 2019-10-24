const express = require('express');
const router = express.Router();
const util = require('../util/album');
const pageUtil = require('../util/albumPage');

// ============================================================================
// '/api/album' routes 

// Create

router.post  ('/', (req, res) => {
	// Create a new album, and return its ID
	var user = req.query.user;

	if(!user){
		res.sendStatus(401);
		return;
	}

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
	const albumId = req.params.albumId;
	const page_num = req.query.page;
	const perPage = req.query.perPage;

	if(!user){
		res.sendStatus(401);
		return;
	}

	if(req.params.albumId){
		util.getAlbumById(user, albumId, page_num, perPage).then((album) =>{
			if(album){
				res.status(201);
				res.send(album);
			} else {
				res.sendStatus(500);
			}
		}).catch((err) => {
			res.send(err.toString());
			// res.sendStatus(404);
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

// Add a Photo to an album
router.put   ('/:albumId', (req, res) => {
	// Update an album (May be removed in preference to PATCH)
	var imageId = req.query.imageId;
	var albumId = req.params.albumId;
	var user = req.query.user;
	var caption = req.query.caption || '';
	var imageList = req.query.imageList;
	
	if(imageList) {
		util.addManyImagesToAlbum(user, albumId, imageList).then( (success) => {
			if(success){
				res.sendStatus(201);
			} else {
				res.sendStatus(500);
			}
			return;
		});
	}

	if(!user){
		res.sendStatus(401);
		return;
	}

	util.addImageToAlbum(imageId, albumId, user, caption).then( (success) => {
		// Album add succeeded
		if(success !== undefined){
			res.sendStatus(201);
		} else {
			res.sendStatus(500);
		}
	}).catch((err) => {
		res.send(err.toString());
	})
});

router.patch ('/:albumId', (req, res) => {
	// Update an album
	var user = req.query.user;

	if(!user){
		res.sendStatus(401);
		return;
	}

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
	// You have to specify which user's album you want to delete.
	if(!req.query.user){
		res.sendStatus (400);
		return;
	}
	const user = req.query.user;
	const albumId = req.params.albumId;

	if(!user){
		res.sendStatus(401);
		return;
	}

	// Optional - delete position
	const position = req.query.position;
	if(!isNaN(position)){
		util.deleteAlbumPosition(user, albumId, position).then( (success) => {
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
		util.deleteAlbum(user, albumId).then((success) => {
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

	if(!user){
		res.sendStatus(401);
		return;
	}

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

	if(!user){
		res.sendStatus(401);
		return;
	}

	// Get a page of an album
	if( req.params.albumId && req.params.pageId ){
		pageUtil.getAlbumPageTemplate(user, req.params.albumId, req.params.pageId).then(pageTemplate => {
			//If the Page doesn't have a template then use the Album Template
			if(pageTemplate === undefined){
				pageTemplate = util.getAlbumTemplate(user, req.params.albumId).then(albumTemplate => {
					//If the Album Page doesn't have a template 404 - can't find it
					if(albumTemplate === undefined){
						//Fail
						res.sendStatus(404);
					}
					//Success
					res.status(200);
					res.send(albumTemplate);
				//If the promise was rejected, there was probably something with the given values
				}, rejV => {
					//Fail
					res.sendStatus(500);
				});
			}
			//Success
			res.status(200);
			res.send(pageTemplate);
		//If the promise was rejected, there was probably something with the given values
		}, rejVal => {
			//Fail
			res.sendStatus(500);
		});
	} else {
		res.sendStatus(400);
	}
});

// Update

router.put   ('/:albumId/:pageId', (req, res) => {
	var user = req.query.user;
	if(!user){
		res.sendStatus(401);
		return;
	}
	// Update an album page (might be useful eg. for copy/paste)
	if( req.params.albumId && req.params.pageId && req.query.template ){
		pageUtil.updateAlbumPageAttributes(user, req.params.albumId, req.params.pageId, req.query.template).then((success) => {
			if(success){
				res.sendStatus(204);
			} else {
				res.sendStatus(500);
			}
		});
	} else {
		res.sendStatus(400);
	}
});
router.patch ('/:albumId/:pageId', (req, res) => {
	var user = req.query.user;
	if(!user){
		res.sendStatus(401);
		return;
	}
	// Update an album page (might be useful eg. for copy/paste)
	if( req.params.albumId && req.params.pageId && req.query.template ){
		pageUtil.updateAlbumPageAttributes(user, req.params.albumId, req.params.pageId, req.query.template).then( (success) => {
			if(success){
				res.sendStatus(204);
			} else {
				res.sendStatus(500);
			}
		});
	} else {
		res.sendStatus(400);
	}
});

// Delete

router.delete('/:albumId/:pageId', (req, res) => {
	const user = req.query.user;
	const album = req.params.albumId;
	const page = req.params.pageId;

	if(!user){
		res.sendStatus(401);
		return;
	}

	pageUtil.deleteAlbumPage(user, album, page).then( (success) => {
		if(success){
			res.sendStatus(204);
		} else {
			res.sendStatus(400);
		}
	}).catch( (error) => {
		res.status(500);
		res.send( error.toString() );
	});
});

module.exports = router;
