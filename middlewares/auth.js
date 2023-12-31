const jwt = require("jsonwebtoken");
const {config} = require("../config/secret")
const asyncWrap = require("../utils/asyncWrapper");
const { decodeToken, generateToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
// const { User } = require("../models/UserModel");
const { UserModel } = require("../models/userModel");



const auth = (req,res,next) => {
  let token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({msg:"You need to send token to this endpoint url"})
  }
  try{
    let decodeToken = jwt.verify(token,config.tokenSecret);
    // add to req , so the next function will recognize
    // the tokenData/decodeToken
    req.tokenData = decodeToken;

    next();
  }
  catch(err){
    console.log(err);
    return res.status(401).json({msg:"Token invalid or expired, log in again or you hacker!"})
  }
}

const authAdmin = (req,res,next) => {
  let token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({msg:"You need to send token to this endpoint url"})
  }
  try{
    let decodeToken = jwt.verify(token,config.tokenSecret);
    // check if the role in the token of admin
    if(decodeToken.role != "admin"){
      return res.status(401).json({msg:"Token invalid or expired, code: 3"})
    }
    req.tokenData = decodeToken;

    next();
  }
  catch(err){
    console.log(err);
    return res.status(401).json({msg:"Token invalid or expired, log in again or you hacker!"})
  }
}

// exports.isLoggedIn = asyncWrap(async (req, res, next) => {
//   if (!req.headers.cookie.startsWith("jwt"))
//     return next(new AppError(403, "Please login"));
//   const token = req.headers.cookie.split("=")[1];
//   //const token = req.headers["authorization"];
//   if (!token) return next(new AppError(401, "Please login"));

//   const payload = decodeToken(token);
//   const id = payload._doc.id;
//   console.log(id);
//   const UserModel = await UserModel.findById(id);
//   if (!UserModel) return next(new AppError(403, "Please login"));
//   req.UserModel = UserModel;
//   console.log(req.UserModel);
//   next();
// });


// const forgotPassword = asyncWrap(async (req, res, next) => {
//   //get user based on the posted email
//   const { email } = req.body;
//   const UserModel = await UserModel.findOne({ email });
//   //console.log(user);
//   if (!user) return next(new AppError(401, "There is no user "));

//   ///generate reset token
//   const resetToken = UserModel.createPasswordResetToken();
//   console.log(resetToken);
//   await UserModel.save({ validateBeforeSave: false });

//   ///send to users email
//   const resetURL = `${req.protocol}://${req.get(
//     "host"
//   )}/api/v1/users/resetPassword/${resetToken}`;

//   const message = `Forgot your password? 
//   Submit a patch request with a new password and
//    password confirm to :${resetURL}  
//     \n if you havent forgotten your password ignore this email`;
//   try {
//     //here we use the try  n catch because need do more then just sending the error to the user
//     await sendEmail({
//       email: UserModel.email,
//       subject: "Your password reset link valid for 10 min",
//       text: message,
//     });
//   } catch (err) {
//     UserModel.passwordResetToken = undefined;
//     UserModel.passwordResetExpires = undefined;
//     await UserModel.save({ validateBeforeSave: false });
//     return next(new AppError(500, err.message));
//   }

//   res.status(200).json({
//     status: "success",
//     message: "Reset link has been sent to the users email",
//   });
// });

// const forgotPassword = asyncWrap(async (req, res, next) => {
//   // Get user based on the posted email
//   const { email } = req.body;
//   const user = await UserModel.findOne({ email });

//   // If the user does not exist, return an error
//   if (!user) {
//     return next(new AppError(401, "There is no user with this email"));
//   }

//   // Generate reset token
//   const resetToken = user.createPasswordResetToken();
//   console.log(resetToken);

//   // Save the user with the new token and expiration date
//   await user.save({ validateBeforeSave: false });

//   // Send reset email to user
//   const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

//   const message = `Forgot your password? Submit a patch request with a new password and password confirm to: ${resetURL}\nIf you haven't forgotten your password, ignore this email.`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "Your password reset link valid for 10 min",
//       text: message,
//     });
//   } catch (err) {
//     // If sending email fails, reset token and expiration
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(new AppError(500, err.message));
//   }

//   // Send success response
//   res.status(200).json({
//     status: "success",
//     message: "Reset link has been sent to the user's email",
//   });
// });


module.exports = {
  auth,
  authAdmin,
  // forgotPassword,
}