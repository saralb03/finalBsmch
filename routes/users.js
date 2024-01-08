const bcrypt = require("bcrypt");
const crypto = require("crypto");
const ReactDOMServer = require('react-dom/server');
const ResetPasswordForm = require('./ResetPasswordForm');
const React = require('react');
const emailSender = require("../utils/emailSender");
const { createResetUrl } = require("../services/emailService");
const {
  UserModel,
  validUser,
  validLogin,
  createToken,
} = require("../models/userModel");
//img
const multer = require('multer');
const path = require('path');


//img
// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
// Initialize upload
const upload = multer({
  storage: storage
});

const uploadImage = (req, res, next) => {
  // Use 'img_url' as the field name where your image file is attached
  upload.single('img_url')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error uploading image", err });
    }
    // If there's no error, continue to the next middleware/controller
    next();
  });
};
//end img

const checkToken = async (req, res) => {
  res.json(req.tokenData);
};

const myInfo = async (req, res) => {
  try {
    let userInfo = await UserModel.findOne(
      { _id: req.tokenData._id },
      { password: 0 }
    );
    res.json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const usersList = async (req, res) => {
  try {
    let data = await UserModel.find({}, { password: 0 }).limit(20);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const count = async (req, res) => {
  try {
    let count = await UserModel.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const createUser = async (req, res) => {
  const img_url = req.file ? req.file.path : null;
  try {
    console.log(req.body);
    let user = new UserModel({
      ...req.body,
      img_url: img_url,
    });
    user.password = await bcrypt.hash(user.password, 10);
    user.birth_date = Date.parse(user.birth_date);
    await user.save();
    user.password = "***";
    res.status(201).json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res
        .status(500)
        .json({ msg: "Email already in the system, try logging in", code: 11000 });
    }
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};


const login = async (req, res) => {
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Password or email is wrong, code:1" });
    }
    let authPassword = await bcrypt.compare(req.body.password, user.password);
    if (!authPassword) {
      return res
        .status(401)
        .json({ msg: "Password or email is wrong, code:2" });
    }
    let token = createToken(user._id, user.role);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const changeRole = async (req, res) => {
  if (!req.body.role) {
    return res.status(400).json({ msg: "Need to send role in body" });
  }

  try {
    let userID = req.params.userID;
    if (userID == "649021f6214dca536b6008fb") {
      return res
        .status(401)
        .json({ msg: "You cant change superadmin to user" });
    }
    let data = await UserModel.updateOne(
      { _id: userID },
      { role: req.body.role }
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const changeActive = async (req, res) => {
  if (!req.body.active && req.body.active != false) {
    return res.status(400).json({ msg: "Need to send active in body" });
  }

  try {
    let userID = req.params.userID;
    if (userID == "649021f6214dca536b6008fb") {
      return res
        .status(401)
        .json({ msg: "You cant change superadmin to user" });
    }
    let data = await UserModel.updateOne(
      { _id: userID },
      { active: req.body.active }
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};



const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const { passwordResetToken, passwordResetExpires } = createResetToken();
  console.log(passwordResetToken);
  console.log(passwordResetExpires);

  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        password_reset_token: passwordResetToken,
        password_reset_expires: passwordResetExpires,
      },
      { new: true }
    );

    if (user) {
      // Generate the reset URL
      const resetUrl = createResetUrl(passwordResetToken);

      // Construct email subject and body
      const subject = "Reset Password";
      const body = `Click the following link to reset your password: ${resetUrl}`;

      // Send the password reset email using the emailSender module
      emailSender.sendMailToUser(email, subject, body);
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
const createResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  passwordResetToken = crypto //saving the encrypted reset token into db
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // passwordResetExpires = Date.now() + 10 * 1000 * 60; //milliseconds 10 min
  passwordResetExpires = Date.now() + 30 * 1000 * 60;


  return { passwordResetToken, passwordResetExpires };
};

// const resetPassword = async (req, res) => {
//   const { token } = req.query;

//   // Check if the token is present
//   if (!token) {
//     return res.status(400).json({ error: 'Invalid token' });
//   }

//   try {
//     // Find user by password_reset_token and check expiration
//     const user = await UserModel.findOne({
//       password_reset_token: token,
//       password_reset_expires: { $gt: new Date() },
//     });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid or expired token reset password' });
//     }

//     // Render a form or page for the user to reset the password
//     // You can use a template engine like EJS, Handlebars, or plain HTML for this

//     // Example HTML form:
//     res.send(`
//       <form method="post" action="/reset-password">
//         <input type="hidden" id="token" name="token" value="${token}">
//         <label for="newPassword">New Password:</label>
//         <input type="password" id="newPassword" name="newPassword" required>
//         <br>
//         <label for="confirmPassword">Confirm Password:</label>
//         <input type="password" id="confirmPassword" name="confirmPassword" required>
//         <br>
//         <input type="submit" value="Reset Password">
//       </form>
//     `);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const updatePassword = async (req, res) => {
//   // const { token } = req.query;
//   const {token, newPassword, confirmPassword } = req.body;

//   console.log('Update Password - Token:', token); // Log the token
//   console.log('Update Password - New Password:', newPassword); // Log the new password
//   console.log('Update Password - Confirm Password:', confirmPassword); // Log the confirm password

//   // Check if the passwords match
//   if (newPassword !== confirmPassword) {
//     console.log('Update Password - Passwords do not match'); // Log passwords mismatch
//     return res.status(400).json({ error: 'Passwords do not match' });
//   }

//   try {
//     // Find user by password_reset_token and check expiration
//     const user = await UserModel.findOne({
//       password_reset_token: token,
//       password_reset_expires: { $gt: new Date() },
//     });

//     console.log('Update Password - User before update:', user); // Log user details before update

//     if (!user) {
//       console.log('Update Password - User not found or token expired'); // Log user status
//       return res.status(400).json({ error: 'Invalid or expired token update password' });
//     }

//     // Update the user's password
//     user.password = newPassword;
//     user.password_reset_token = null;
//     user.password_reset_expires = null;
//     await user.save();

//     console.log('Update Password - User after update:', user); // Log user details after update

//     res.status(200).json({ message: 'Password reset successfully' });
//   } catch (err) {
//     console.error('Update Password - Error:', err); // Log the error
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const resetPassword = async (req, res) => {
  console.log("reset pass");
  const { token } = req.query;

  // Check if the token is present
  if (!token) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  try {
    // Find user by password_reset_token and check expiration
    const user = await UserModel.findOne({
      password_reset_token: token,
      password_reset_expires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token reset password' });
    }

    // Now you can use 'formHtml' as needed in your backend response or wherever it's required

    // Render the ResetPasswordForm component with the token, updatePassword function, and redirectTo
    const formHtml = ReactDOMServer.renderToString(
      <ResetPasswordForm token={token} updatePassword={updatePassword}/>
    );
    
    res.send(formHtml);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// const resetPassword = async (req, res) => {
//   console.log("reset pass");
//   const { token } = req.query;

//   // Check if the token is present
//   if (!token) {
//     return res.status(400).json({ error: 'Invalid token' });
//   }

//   try {
//     // Find user by password_reset_token and check expiration
//     const user = await UserModel.findOne({
//       password_reset_token: token,
//       password_reset_expires: { $gt: new Date() },
//     });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid or expired token reset password' });
//     }

//     // Now you can use 'formHtml' as needed in your backend response or wherever it's required

//     // Render the ResetPasswordForm component with the token, updatePassword function, and redirectTo
//     const formHtml = ReactDOMServer.renderToString(
//       <ResetPasswordForm token={token} updatePassword={updatePassword}/>
//     );
    
//     res.send(formHtml);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };




const updatePassword = async (token, newPassword, confirmPassword) => {
  console.log("update password");
  try {
    // Find user by password_reset_token and check expiration
    const user = await UserModel.findOne({
      password_reset_token: token,
      password_reset_expires: { $gt: new Date() },
    });

    if (!user) {
      throw new Error('Invalid or expired token update password');
    }

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Update the user's password
    user.password = newPassword;
    user.password_reset_token = null;
    user.password_reset_expires = null;

    await user.save();
    console.log('Password updated successfully');

    // You can log or return any additional information if needed
    return { message: 'Password updated successfully' };
  } catch (err) {
    console.error('Update Password - Error:', err);
    throw err; // Propagate the error to be handled where the function is called
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.json({ msg: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error getting user", err });
  }
};





module.exports = {
  // createUser: [uploadImage, createUser],
  uploadImage,
  checkToken,
  myInfo,
  usersList,
  count,
  createUser,
  login,
  changeRole,
  changeActive,
  createResetToken,
  forgotPassword,
  resetPassword,
  updatePassword,
  getUserById
};