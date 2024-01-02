// emailService.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

function sendEmail(email, subject, text, callback) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred while sending the email:', error); // Log error details
      callback('Error occurred while sending the email');
    } else {
      console.log('Email sent: ' + info.response);
      callback(null, 'Email sent successfully!');
    }
  });
}

function createResetUrl(token) {
  // Assuming your reset URL structure is like "/reset-password?token=abc123"
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Replace with your actual base URL
  return `${baseUrl}/reset-password?token=${token}`;
}

module.exports = { sendEmail, createResetUrl };
