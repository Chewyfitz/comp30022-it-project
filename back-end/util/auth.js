const database = require('../database.js');
const firebase = require('firebase');
require('firebase/auth');

// A hack
const general = require('../database/general_database');
const album = require('../database/albums');
const db = require("firebase/app").firestore();

async function firebaseRegister(email, password){
    user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return user;
}


async function register(req){
    if(req.headers.authorization){
        // get the login (email) and password from the auth header
        [login, password] = decode(req.headers.authorization);
        
        console.log(login);
        
        // Try to register the user with their details
        var user = firebaseRegister(login, password).then((user) => {
            console.log(user.user.uid);
            database.addUser(user.user.uid, '').then((userKey) => {
                album.addAlbum(userKey, 'un');
            });
        });
        return user;
    } else if (req.params.email && req.params.psword) {
        // Try to register the user with param email and password
        return firebaseRegister(req.params.email, req.params.psword);
    } else {
        throw new Error("Username and Password not provided!");
    }
}

function decode(authString){
    const b64auth = (authString || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    return [login, password];
}

async function firebaseSignIn(email, password){
    user = await firebase.auth().signInWithEmailAndPassword(email, password)
    return user;
}

async function signIn(req){
    if(req.headers.authorization){
        // get the login (email) and password from the auth header
        [login, password] = decode(req.headers.authorization);

        // Try to sign the user in with their details
        return firebaseSignIn(login, password)
    } else if (req.params.email && req.params.psword) {
        // Try to sign the user in with param email and password
        return firebaseSignIn(req.params.email, req.params.psword);
    } else {
        throw new Error("Username and Password not provided!");
    }
}

const val = 0;
module.exports = {
    decode,
    register,
    signIn,
}
