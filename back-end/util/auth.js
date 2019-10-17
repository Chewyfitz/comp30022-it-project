const database = require('../database.js');
const firebase = require('firebase');
require('firebase/auth');

async function register(){
    // fbAuth.createUserWithEmailAndPassword('email@example.com', 'password');
    user = await firebase.auth().createUserWithEmailAndPassword('email@example.com', 'password');

    return user;
}

const val = 0;
module.exports = {
    register,
}