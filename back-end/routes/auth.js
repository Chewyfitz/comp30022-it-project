const express = require('express');
const router = express.Router();
const database = require('../database.js');
const util = require('../util/auth');


// In the final product these routes should be the only ones which do not require
// authentication / a login token
router.post(['/register', '/signup'], (req, res, next) => {
    // Create a user - auth optional
    util.register().then((user) => {
        res.status(201);
        res.send(user);
	}).catch(err => {
        res.status(500);
        res.send(err);
    });
});

router.post('/login', (req, res, next) => {
    // Log a user in - auth optional

    // get the login (email) and password from the auth header
    [login, password] = util.decode(req.headers.authorization);

    // Try to sign the user in with their details
    util.signIn(login, password).then((user) => {
        if(user){
            res.status(200);
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        res.status(500);
        res.send(err);
    });
    res.sendStatus(500);
});



module.exports = router;