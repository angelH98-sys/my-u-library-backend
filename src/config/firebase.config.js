const admin = require("firebase-admin");

const serviceAccount = require("./service.account.key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const FirebaseAuth = admin.auth();

module.exports = { FirebaseAuth };
