const database = require('../database.js');
const firebase = require('firebase');
require('firebase/auth');

async function firebaseRegister(email, password){
    console.log("registering");
    console.log(email);
    console.log(password);
    try{
        user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    catch(err){
        console.log(err);
    }
    return user;
}

async function register(req){
    if(req.headers.authorization){
        // get the login (email) and password from the auth header
        [login, password] = decode(req.headers.authorization);

        // Try to register the user with their details
        return firebaseRegister(login, password)
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
