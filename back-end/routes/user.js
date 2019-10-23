const express = require('express');
const router = express.Router();
const database = require('../database.js');
const util = require('../util/user');

// ============================================================================
// '/api/user' routes

router.get('/:userId?', (req, res) => {
<<<<<<< HEAD
	// Get an user's info based on their ID.
	// Will need to get their password or a hash of their password, too
	console.log("GET /user/:userId");
    console.log(req.params);
	console.log(req.query);

	user = req.params.userId;
	pwHash = req.query.passwordHash;
	
	util.checkPassword(user, pwHash).then((success) => {
		if(success){
			res.status(200);
			// TODO: send user info or token once user is logged in
			res.send("OK");
		} else {
			res.sendStatus(404);
		}
	});

	// TODO: Add catch for possible errors
});

router.post('/', (req, res) =>{
	// Create a user
	console.log("POST /image/");
	console.log(req.params);
	console.log(req.query);

	email = req.query.email;
	pwHash = req.query.psword;

	/*util.createUser(user, pwHash).then(success => {
		if(success){
			res.sendStatus(201);
		} else {
			res.sendStatus(500);
		}
	}).catch(() => {
		res.sendStatus(500);
	});*/
	res.sendStatus(200)
});

router.delete('/', (req, res) => {
	// Delete a user.
=======
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
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
	console.log("DELETE /image/");
    console.log(req.params);
    console.log(req.query);
	res.sendStatus(200);
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 93a203b22c6fcce9939e45f942874bc9ec78f1ff
