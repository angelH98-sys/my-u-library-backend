const { request, response } = require("express");

const { authenticated, userStore } = require("../../config/user.store");
const {
  accessTokenRequiredResponse,
  getFirebaseExceptionResponse,
} = require("../../response/firebase/firebase.response");
const { FirebaseAuth } = require("../../config/firebase.config");

/**
 * Middleware that validates header's authorization token with Firebase
 * Authenticator.
 *
 * If it's valid, decodes token and save it in redux store and executes
 * next middleware.
 *
 * If it is'nt, returns a MyULibraryResponse with the error.
 *
 * @param {Express.request} req
 * @param {Express.response} res
 * @param {next} next
 * @returns MyULibraryResponse in case of error, execute next in case of success.
 */
const isUserAuthenticated = async (req = request, res = response, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!!!authorization) {
      const response = accessTokenRequiredResponse();
      return res.status(response.status).json(response);
    }

    const jwt = authorization.split(" ")[1];

    const decodedToken = await FirebaseAuth.verifyIdToken(jwt);

    userStore.dispatch(authenticated(decodedToken));

    next();
  } catch (error) {
    console.error(error);

    const { code = undefined } = error.errorInfo;

    const response = getFirebaseExceptionResponse(code);

    return res.status(response.status).json(response);
  }
};

module.exports = {
  isUserAuthenticated,
};
