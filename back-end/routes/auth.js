const express = require('express');
const router = express.Router();
const database = require('../database.js');
const util = require('../util/auth');


// In the final product these routes should be the only ones which do not require
// authentication / a login token
router.post(['/register', '/signup'], (req, res, next) => {
    // Create a user - auth optional
    util.register().then((user) => {
		res.send(user);
	});
    // res.sendStatus(500);
});

router.post('/login', (req, res, next) => {
    // Log a user in - auth optional
    res.sendStatus(500);
});



module.exports = router;