const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  ///1 create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,

    port: process.env.EMAIL_PORT || 2525,
    /* secure: false, */
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },

    //In gmail use less secure app option
  });
  ///2 Define email options
  const mailOptions = {
    from: "Monkeys <info@monkeys.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
    //html
  };
  ///3 send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
