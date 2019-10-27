const database = require('../database.js');
const firebase = require('firebase');
require('firebase/auth');

////////////////////////////////////////////////////////////////////////////////
//                                   CREATE                                   //
////////////////////////////////////////////////////////////////////////////////

// This functionality is handled in auth routes and utilities.

////////////////////////////////////////////////////////////////////////////////
//                                    READ                                    //
////////////////////////////////////////////////////////////////////////////////

async function checkToken(token){
    success = await firebase.auth().checkToken(token);
    return success;
}

async function getUserInfo(token, userId){
    if(checkToken(token)){
        userinfo = await firebase.auth().getUserInfo(userId);
        return userinfo;
    } else {
        throw new Error("Invalid token");
    }
}

////////////////////////////////////////////////////////////////////////////////
//                                   UPDATE                                   //
////////////////////////////////////////////////////////////////////////////////

async function send_password_reset_email(email){
    success = await firebase.auth().sendPasswordResetEmail(email);
    return success;
}

async function reset_password(code, newPassword){
    success = await firebase.auth().confirmPasswordReset(code, newPassword);
    return success;
}

////////////////////////////////////////////////////////////////////////////////
//                                   DELETE                                   //
////////////////////////////////////////////////////////////////////////////////

module.exports = {
    checkToken,
    getUserInfo,
    reset_password,
    send_password_reset_email,
}