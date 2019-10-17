const database = require('../database.js');
const firebase = require('firebase');
require('firebase/auth');

const val = 0;

function checkToken(token){
    return await firebase.auth().checkToken(token);
}

async function getUserInfo(token, userId){
    if(checkToken(token)){
        return await firebase.auth().getUserInfo(userId);
    } else {
        throw new Error("Invalid token");
    }
}

module.exports = {
    checkToken,
    getUserInfo,
}