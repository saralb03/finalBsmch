// Import necessary modules and libraries
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { UserModel, createToken } = require("../models/userModel");
const emailSender = require("../utils/emailSender");

const createResetUrl = (token) => {
  // Assuming you have a frontend running on localhost:3000
  return `http://localhost:3001/reset-password?token=${token}`;
};

const createResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes expiration

  return { passwordResetToken, passwordResetExpires };
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { passwordResetToken, passwordResetExpires } = createResetToken();

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
      const resetUrl = createResetUrl(passwordResetToken);
      const subject = "Reset Password";
      const body = `Click the following link to reset your password: ${resetUrl}`;

      emailSender.sendMailToUser(email, subject, body);
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (!token) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  try {
    const user = await UserModel.findOne({
      password_reset_token: token,
      password_reset_expires: { $gt: new Date() },
    });

    console.log('Update Password - User before update:', user);

    if (!user) {
      console.log('Update Password - User not found or token expired');
      return res.status(400).json({ error: 'Invalid or expired token update password' });
    }

    user.password = newPassword;
    user.password_reset_token = null;
    user.password_reset_expires = null;
    await user.save();

    console.log('Update Password - User after update:', user);

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Update Password - Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createResetToken,
  forgotPassword,
  resetPassword,
};
