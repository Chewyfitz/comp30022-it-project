const express = require('express');
const router = express.Router();
const database = require('../database.js');
const util = require('../util/user');

// ============================================================================
// '/api/user' routes

router.get('/:userId?', (req, res) => {
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

	user = req.query.username;
	pwHash = req.query.password;

	util.createUser(user, pwHash).then(success => {
		if(success){
			res.sendStatus(201);
		} else {
			res.sendStatus(500);
		}
	}).catch(() => {
		res.sendStatus(500);
	});
});

router.delete('/', (req, res) => {
	// Delete a user.
	console.log("DELETE /image/");
    console.log(req.params);
    console.log(req.query);
	res.sendStatus(200);
});

module.exports = router;
