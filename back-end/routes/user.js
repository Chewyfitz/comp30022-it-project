const express = require('express');
const router = express.Router();
const database = require('../database.js');
const util = require('../util/user');

// ============================================================================
// '/api/user' routes

router.get('/:userId?', (req, res) => {
	// Get an image - Reference, Name, DateTime, Description
	console.log("GET /user/:userId");
    console.log(req.params);
    console.log(req.query);
	// TODO: Add catch for possible errors
	// call the util/image.js function that deals with this route
	res.sendStatus(200);
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
    console.log(req.query);
	res.sendStatus(200);
});

module.exports = router;
