const general = require('./general_database');

/*Fields that are stored in the collection*/
const userFields = {
    password: "Password Hash",
};

function addUser(userId, password) {
    let data = {};
    data[userFields.password] = password;
    console.log("written user");
}

function updateUserPassword(userID, password=null){
    let data = {};
    if(password != null){
        data[userFields.password] = password;
    }
    console.log("updated user");
}


/* Exports to be used by other code*/
module.exports = {
    userFields: userFields,
    addUser: addUser,
    updateUserPassword: updateUserPassword,
};