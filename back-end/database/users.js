/**This file is responsible for all single document operations in the Users
 * Collection*/

const general = require('./general_database');

/*Used to reference fields that are stored in the Documents that belong to the
Users Collection*/
const userFields = {
    password: "Password Hash",
};

/**
 * Adds a new user to the database. CAUTION: CURRENTLY HAS NO OVERRIDE CHECKS
 *
 * @param {String} userID - The username of the new user (will be used as the
 *                          key for the new Document)
 * @param {String} password - The password the User will use to log in CAUTION:
 *                            SHOULD BE HASHED FIRST
 *
 * @return {Boolean} - True only if the new user was successfully added to the
 *                     database*/
function addUser(userID, password) {
    //Initialisation
    let data = {};
    //Add the appropriate data to be stored in the database
    data[userFields.password] = password;
    //Attempt to Create the Document and return its success
    let success = general.addDataToDoc(data, general.usersPath(), userID);
    return success
}

/**
 * Updates the stored Password for a Document in the Users Collection
 *
 * @param {String} userID - The username of the new user who's password is being
 *                          updated
 * @param {String} password - The password the User will use to log in CAUTION:
 *                            SHOULD BE HASHED FIRST
 *
 * @return {Boolean} - True only if the user's password was successfully updated
 *                     in the database*/
function updateUserPassword(userID, password=null){
    //Initialisation
    let data = {};
    //If there is a password, then add it to the data that will be updated
    if(password != null){
        data[userFields.password] = password;
    }
    //Attempt to update the Document and return its success
    let success = general.updateDataInDoc(data, general.usersPath(), userID);
    return success
}

/**
 * Checks to see if the stored Password for a user matches the provided one
 *
 * @param {String} userID - The username of the new user who's password is being
 *                          checked
 * @param {String} password - The password the User has provided CAUTION:
 *                            SHOULD BE HASHED FIRST
 *
 * @return {Boolean} - True only if the user's stored password matches the one
 *                     in the database*/
async function checkUserPassword(userID, password){
    //Attempt to retrieve the Data for the User
    let data = await general.getDataInDoc(general.usersPath(), userID);
    try {
        //Try to make a password comparison, then return the result
        return data[userFields.password] == password;
    } catch (e) {
        console.log("Error in Users.js.checkUserPassword, - probably trying " +
            "to check the password of a user that doesn't exist");
        console.log(e);
        return false
    }
}


/**Exports the functions and values that are intended to be used by
 * database.js*/
module.exports = {
    userFields: userFields,
    addUser: addUser,
    updateUserPassword: updateUserPassword,
    checkUserPassword: checkUserPassword,
};