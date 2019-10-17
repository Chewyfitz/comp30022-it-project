const express = require('express');
const router = express.Router();
const database = require('../database.js');
const util = require('../util/user');

// ============================================================================
// '/api/user' routes

// userId optional
// TODO: don't return when Auth is not provided
router.get('/:userId?', (req, res) => {
	// Get user details
	res.sendStatus(500);
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
})

router.post('/password/:verify', (req, res) => {
	// Send a password reset email
	console.log(verify);
	res.sendStatus(500);
})

module.exports = router;
