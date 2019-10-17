const express = require('express');
const router = express.Router();
const util = require('../util/auth');


// In the final product these routes should be the only ones which do not require
// authentication / a login token
router.post(['/register', '/signup'], (req, res, next) => {
    // Create a user - auth optional
    util.register(req).then((user) => {
        res.status(201);
        res.send(user);
	}).catch((err) => {
        res.status(500);
        res.send((err).toString());
    });
});

router.post('/login', (req, res, next) => {
    // Log a user in - auth "required"
    util.signIn(req).then((user) => {
        if(user){
            res.status(200);
            res.send(user);
        } else {
            res.sendStatus(500);
        }
    }).catch(err => {
        res.status(500);
        res.send(err.toString());
    })   
});

// TODO: add anonymous login

module.exports = router;