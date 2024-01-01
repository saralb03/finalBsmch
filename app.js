const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const fileUpload = require("express-fileupload");

//dvori
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const readline = require('readline');
//


const { routesInit } = require("./routes/config_routes"); // Ensure correct path

require("./db/mongoconnect");

const app = express();

app.use(cors());
app.use(fileUpload({ limits: { fileSize: 1024 * 1024 * 5 } }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
//dvori
// app.use(bodyParser.urlencoded({ extended: true }));
//

routesInit(app); // Use the routesInit function

const server = http.createServer(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
