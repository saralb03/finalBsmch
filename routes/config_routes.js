const express = require("express");
const { auth, authAdmin } = require("../middlewares/auth");
const userController = require("./users");
const studentController = require("./student");
const creatorController = require("./creator");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Users work" });
});

// Other routes from user.controller.js
router.get("/checkToken", auth, userController.checkToken);
router.get("/myInfo", auth, userController.myInfo);
router.get("/usersList", authAdmin, userController.usersList);
router.get("/count", authAdmin, userController.count);
router.post("/", userController.createUser);
router.post("/login", userController.login);
router.patch("/changeRole/:userID", authAdmin, userController.changeRole);
router.patch("/changeActive/:userID", authAdmin, userController.changeActive);

// Additional routes from student.controller.js
router.post("/student", studentController.createStudent);

// Additional routes from creator.controller.js
router.post("/creator", creatorController.createCreator);

module.exports = { routesInit: (app) => app.use("/", router) };
