const express = require('express');
const router = express.Router();
const util = require('../util/user');

// slight coupling here, but this is very much a utility function and might be
// split off into a separate file later
const decode = require('../util/auth').decode();

// ============================================================================
// '/api/user' routes

// userId optional
// TODO: don't return when Auth is not provided
router.get('/:userId?', (req, res) => {
	if(!req.headers.authorization){
		res.sendStatus(403);
	} else {
		// Decode authorization
		[login, password] = decode(req.headers.authorization);

		// Get user details
		util.getUserInfo(login, password, req.params.userId).then((user) => {
			res.send(user);
		}).catch((error) => {
			res.send(error.toString());
		});

		res.sendStatus(500);
	}
});

router.patch('/', (req, res) =>{
	// Update some user details
	res.sendStatus(500);
});

router.delete('/', (req, res) => {
	// Delete a user. Requires extra authentication
	res.sendStatus(500);
});

// ============================================================================
// '/api/user/email' routes

router.patch('/email', (req, res) => {
	// Update email address
	res.sendStatus(500);
});

router.post('/email/verify', (req, res) => {
	// Send verification email
	res.sendStatus(500);
});

// ============================================================================
// '/api/user/password' routes

router.put('/password', (req, res) => {
	// Set a user's password. Requires re-entry of the password
	res.sendStatus(500);
});

router.post('/password', (req, res) => {
	// Send a password reset email
	if(req.query.email){
		util.send_password_reset_email(req.query.email).then(() => {
			res.sendStatus(200);
		}).catch( (err) => {
			res.send(err.toString());
		});
	} else if (req.headers.authorization){
		const [email, p] = decode(authString);
		util.send_password_reset_email(email).then(() => {
			res.sendStatus(200);
		}).catch( (err) => {
			res.send(err.toString());
		});
	} else {
		res.sendStatus(400);
	}
});

router.post('/password/:code', (req, res) => {
	// Send a password reset email
	if(req.params.code && req.query.password){
		util.reset_password(req.params.code, req.query.password).then(() => {
			res.sendStatus(200);
		}).catch( (err) => {
			res.send(err.toString());
		});
	} else {
		res.sendStatus(403);
	}

});

module.exports = router;
