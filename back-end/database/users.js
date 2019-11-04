/**This file is responsible for all single document operations in the Users
 * Collection*/

const general = require('./general_database');

/*Used to reference fields that are stored in the Documents that belong to the
Users Collection*/
const userFields = {
    email: "Email Address",
};

/**
 * Adds a new user to the database. CAUTION: CURRENTLY HAS NO OVERRIDE CHECKS
 *
 * @param {String} userID - The username of the new user (will be used as the
 *                          key for the new Document)
 * @param {String} email - The email of the user
 *
 * @return {Boolean} - Key to the new Users Document only if the new user was
 *                     successfully added to the database, otherwise undefined
 * */
function addUser(userID, email=null) {
    //Initialisation
    let data = {};
    //Add the appropriate data to be stored in the database
    data[userFields.email] = email;
    //Attempt to Create the Document and return its success
    let docID = general.addDataToDoc(data, general.usersPath(), userID);
    return docID
}

/**
 * Gets the email of a user
 *
 * @param {String} userID - The username of the user
 *
 * @return {String} - If successful, it will return the stored value of the
 *          email address, otherwise it will return undefined*/
async function getUserEmail(userID){
    //Attempt to retrieve the Data for the User
    let data = await general.getDataInDoc(general.usersPath(), userID);
    let email;
    try {
        email = data[userFields.email];
    } catch (e) {
        console.log("Error in Users.js.getEmail:");
        console.log(e);
        email = undefined;
    }
    return email;
}

/**
 * !CAUTION!
 * !COULD POTENTIALLY RESULT IN A LARGE STACK!
 * !!DOES NOT DELETE REFERENCES TO THE USER!!
 * Deletes the User and ALL of its associated data.
 *
 * @param {String} userID - The username of the user being deleted
 *
 * @return {Boolean} - True only if the User at all of its asociated data was
 *          successfully deleted.
 * */
async function deleteUser(userID) {
    return general.deleteDoc(general.usersPath(), userID);
}

/**
 * Updates the stored Email for a User
 *
 * @param {String} userID - The User that is having the Email Address updated
 * @param {String} email - The new email address of the user
 *
 * @return {Boolean} - True only if the user's email address was successfully
 *          updated in the database
 * */
function updateUserEmail(userID, email){
    //Initialisation
    let data = {};
    //If there is a email, then add it to the data that will be updated
    if(email){
        data[userFields.email] = email;
    }
    //Attempt to update the Document and return its success
    let success = general.updateDataInDoc(data, general.usersPath(), userID);
    return success
}


/**Exports the functions and values that are intended to be used by
 * database.js*/
module.exports = {
    userFields,
    addUser,
    getUserEmail,
    deleteUser,
    updateUserEmail,
};