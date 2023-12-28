const jwt = require("jsonwebtoken");

/**
 *
 * @param {object} payload
 * @returns {string}
 *
 */

exports.generateToken = (payload) => {
  try {
    const token = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    throw Error(error.message);
  }
};

/**
 *
 * @param {string} token
 * @returns {object}
 */

exports.decodeToken = (token) => {
  try {
    const payload = jwt.verify(token, jwtSecret); //vs decode
    return payload;
  } catch (error) {
    throw Error(error.message);
  }
};
