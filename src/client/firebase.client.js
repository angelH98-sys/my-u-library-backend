const PasswordGenerator = require("generate-password");
const { FirebaseAuth } = require("../config/firebase.config");
const {
  getFirebaseExceptionResponse,
} = require("../response/firebase/firebase.response");
const { getRecordsResponse } = require("../response/general/general.response");

const createUserInFirebase = async (email, displayName) => {
  const password = PasswordGenerator.generate({
    length: 12,
    numbers: true,
    uppercase: true,
  });

  try {
    const user = await FirebaseAuth.createUser({
      email,
      password,
      displayName,
    });

    return getRecordsResponse({ email, password, displayName, uid: user.uid });
  } catch (error) {
    console.error(error);

    const { code = undefined } = error.errorInfo;

    return getFirebaseExceptionResponse(code);
  }
};

module.exports = {
  createUserInFirebase,
};
