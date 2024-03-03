//This should be run with caution and also make sure packagejson has coomonjs module config
var admin = require("firebase-admin");

var serviceAccount = require("../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "/url/to/your/database",
});

function deleteUser(uid) {
  admin
    .auth()
    .deleteUser(uid)
    .then(function () {
      console.log("Successfully deleted user", uid);
    })
    .catch(function (error) {
      console.log("Error deleting user:", error);
    });
}

function getAllUsers(nextPageToken) {
  admin
    .auth()
    .listUsers(100, nextPageToken)
    .then(function (listUsersResult) {
      listUsersResult.users.forEach(function (userRecord) {
        uid = userRecord.toJSON().uid;
        deleteUser(uid);
      });
      if (listUsersResult.pageToken) {
        getAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function (error) {
      console.log("Error listing users:", error);
    });
}

getAllUsers();
