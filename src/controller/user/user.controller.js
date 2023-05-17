const { request, response } = require("express");

const User = require("../../schema/user/User.Schema");
const {
  unHandledExceptionResponse,
  getRecordsResponse,
} = require("../../response/general/general.response");
const { createUserInFirebase } = require("../../client/firebase.client");
const {
  setAuditorySchemaCreationOptions,
} = require("../../helper/auditory.schema.options");
const { userStore } = require("../../config/user.store");

const createUser = async (req = request, res = response) => {
  try {
    const { firstName, lastName, email } = req.body;
    const displayName = `${firstName} ${lastName}`;
    const firebaseResponse = await createUserInFirebase(email, displayName);

    if (firebaseResponse.errors) {
      return res.status(firebaseResponse.status).json(firebaseResponse);
    }
    const {
      data: {
        records: [firebaseData],
      },
    } = firebaseResponse;

    let user = new User({ ...req.body, firebaseId: firebaseData.uid });

    user = setAuditorySchemaCreationOptions(user);

    await user.save();

    const mongoResponse = getRecordsResponse({
      ...user._doc,
      password: firebaseData.password,
    });

    return res.status(mongoResponse.status).json(mongoResponse);
  } catch (unhandledError) {
    console.log(unhandledError);

    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
};

const getRoleFromLoggedUser = async (req = request, res = response) => {
  const { uid } = userStore.getState();
  try {
    const { role } = await User.findOne({ firebaseId: uid }).select("role");

    const response = getRecordsResponse(role);

    return res.status(response.status).json(response);
  } catch (error) {
    console.log(unhandledError);

    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
};

module.exports = {
  createUser,
  getRoleFromLoggedUser,
};
