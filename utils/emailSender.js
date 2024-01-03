// emailSender.js
const emailService = require("../services/emailService");

function sendMailToUser(email, subject, body) {
  emailService.sendEmail(email, subject, body, (error, message) => {
    if (error) {
      console.error(`Error sending email: ${error}`);
    } else {
      console.log(`Email sent successfully: ${message}`);
    }
  });
}

module.exports = { sendMailToUser };
