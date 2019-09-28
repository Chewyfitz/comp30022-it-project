const general = require('./general_database');

/*Fields that are stored in the collection*/
const userFields = {
    password: "Password Hash",
};

/**Adds a User collection document with userID as the document key and password as a stored value
 * @param userId key of the document
 * @param password stored value in the document*/
function addUser(userId, password) {
    let data = {};
    data[userFields.password] = password;
    console.log("written user");
    general.addDataToDoc(data, usersPath(), userId);
}

/**Updates the given users password with the supplied password
 * @param userID the key of the document to update
 * @param password the new value of the passwordHash field in the documnet*/
function updateUserPassword(userID, password=null){
    let data = {};
    if(password != null){
        data[userFields.password] = password;
    }
    console.log("updated user");
    general.updateDataInDoc(data, usersPath(), userID);
}


/* Exports to be used by other code*/
module.exports = {
    userFields: userFields,
    usersPath: usersPath(),
    addUser: function (userID, password) {addUser(userID, password);},
    updateUserPassword: function (userID, password) {updateUserPassword(userID, password);},
};