const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const readline = require('readline');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

app.use(bodyParser.urlencoded({ extended: true }));

// Prompt the user for the email and password
rl.question('Enter your Gmail email ID: ', (senderEmail) => {
  rl.question('Enter your password: ', (pass) => {
    rl.close();
    console.log('Server is running on port 8080');

    const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
     },
    });

    app.post('/submit', (req, res) => {
    const { email_, sub_, text_ } = req.body;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email_, 
      subject: sub_,
      text: text_
    };
    console.log(mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('<p>Error occurred while sending the email</p>');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('<p>Email sent successfully!</p>');
      }
    });
   });
  });
});

app.get('/', (req, res) => {
  res.send(`
<form method="post" action="/submit" style="background-color: #d9f0fa; padding: 10px; border-radius: 5px;">
    <label for="email_" style="display: block; margin-bottom: 5px; font-weight: bold;">Email ID:</label>
    <input type="email" id="email_" name="email_" required style="width: 60%; padding: 8px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 3px;">
    <br>
    <label for="sub_" style="display: block; margin-bottom: 5px; font-weight: bold;">Subject Txt:</label>
    <input type="text" id="sub_" name="sub_" required style="width: 60%; padding: 8px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 3px;">
    <br>
    <label for="text_" style="display: block; margin-bottom: 5px; font-weight: bold;">Message:</label>
    <textarea id="text_" name="text_" required style="width: 60%; padding: 8px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 3px; resize: vertical; height: 150px;"></textarea>
    <br>
    <input type="submit" value="Submit" style="background-color: #194d63; color: #fff; padding:10px; border: none; border-radius: 4px;">
  </form>
  `);
});

app.listen(8080, () => {

});