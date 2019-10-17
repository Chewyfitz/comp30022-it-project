const database = require('../database.js');
const firebase = require('firebase');
require('firebase/auth');

async function register(email, password){
    user = await firebase.auth().createUserWithEmailAndPassword(email, password);

    return user;
}

function decode(authString){
    const b64auth = (authString || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    return [login, password];
}

async function signIn(email, password){
    user = await firebase.auth().signInWithEmailAndPassword(email, password)
    return user;
}

const val = 0;
module.exports = {
    decode,
    register,
    signIn,
}