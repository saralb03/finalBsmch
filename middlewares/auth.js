// const jwt = require("jsonwebtoken");
// const {config} = require("../config/secret")

// exports.auth = (req,res,next) => {
//   let token = req.header("x-api-key");
//   if(!token){
//     return res.status(401).json({msg:"You need to send token to this endpoint url"})
//   }
//   try{
//     let decodeToken = jwt.verify(token,config.tokenSecret);
//     // add to req , so the next function will recognize
//     // the tokenData/decodeToken
//     req.tokenData = decodeToken;

//     next();
//   }
//   catch(err){
//     console.log(err);
//     return res.status(401).json({msg:"Token invalid or expired, log in again or you hacker!"})
//   }
// }

// exports.authAdmin = (req,res,next) => {
//   let token = req.header("x-api-key");
//   if(!token){
//     return res.status(401).json({msg:"You need to send token to this endpoint url"})
//   }
//   try{
//     let decodeToken = jwt.verify(token,config.tokenSecret);
//     // check if the role in the token of admin
//     if(decodeToken.role != "admin"){
//       return res.status(401).json({msg:"Token invalid or expired, code: 3"})
//     }
   
//     // add to req , so the next function will recognize
//     // the tokenData/decodeToken
//     req.tokenData = decodeToken;

//     next();
//   }
//   catch(err){
//     console.log(err);
//     return res.status(401).json({msg:"Token invalid or expired, log in again or you hacker!"})
//   }
// }

const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");
const { decodeToken, generateToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/email");
const { User } = require("../models/userModel");
const asyncWrap = require("../utils/asyncWrapper");

exports.auth = asyncWrap(async (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    throw new AppError(401, "You need to send a token to this endpoint URL");
  }

  try {
    const payload = decodeToken(token);
    req.tokenData = payload;
    next();
  } catch (err) {
    console.log(err);
    throw new AppError(401, "Token invalid or expired, log in again or you hacker!");
  }
});

exports.authAdmin = asyncWrap(async (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    throw new AppError(401, "You need to send a token to this endpoint URL");
  }

  try {
    const payload = decodeToken(token);
    if (payload.role !== "admin") {
      throw new AppError(401, "Token invalid or expired, code: 3");
    }

    req.tokenData = payload;
    next();
  } catch (err) {
    console.log(err);
    throw new AppError(401, "Token invalid or expired, log in again or you hacker!");
  }
});

exports.isLoggedIn = asyncWrap(async (req, res, next) => {
  if (!req.headers.cookie || !req.headers.cookie.startsWith("jwt")) {
    throw new AppError(403, "Please login");
  }

  const token = req.headers.cookie.split("=")[1];

  try {
    const payload = decodeToken(token);
    const user = await User.findById(payload._doc.id);

    if (!user) {
      throw new AppError(403, "Please login");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new AppError(401, "Please login");
  }
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError(403, "You do not have permission to perform this action");
    }
    next();
  };
};

exports.authNoPermistion = asyncWrap(async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    throw new AppError(401, "Please login");
  }

  token = token.split(" ")[1];
  try {
    const payload = decodeToken(token);
    res.locals.userId = payload._doc.id;
    next();
  } catch (error) {
    next(error);
  }
});

exports.forgotPassword = asyncWrap(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(401, "There is no user with this email address");
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a patch request with a new password and password confirm to: ${resetURL} \nIf you haven't forgotten your password, ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset link valid for 10 min",
      text: message,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError(500, err.message);
  }

  res.status(200).json({
    status: "success",
    message: "Reset link has been sent to the user's email",
  });
});

exports.resetPassword = asyncWrap(async (req, res, next) => {
  const { resetToken } = req.params;
  const encryptedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  const user = await User.findOne({
    passwordResetToken: encryptedResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError(400, "Token is expired or wrong");
  }

  const { passwordConfirm, password } = req.body;
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  const token = generateToken(user);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 10,
  });

  res.send({ user, token });
});

// Add other functions as needed...

module.exports = {
  auth,
  authAdmin,
  isLoggedIn,
  restrictTo,
  authNoPermistion,
  forgotPassword,
  resetPassword,
  // Add other functions...
};
