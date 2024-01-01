const express = require("express");
const { authAdmin } = require("../middlewares/auth");
const auth = require('../middlewares/auth')
const userController = require("./users");
const studentController = require("./student");
const creatorController = require("./creator");
const projectController = require("./project");
const studentProjectController = require("./studentProject");
const creatorProjectController = require("./creatorProject");
const startEmailServer = require("../utils/email2dvori");


const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Users work" });
});

// Other routes from user.controller.js
router.get("/checkToken", auth.auth, userController.checkToken);
router.get("/myInfo", auth.auth, userController.myInfo);
router.get("/usersList", authAdmin, userController.usersList);
router.get("/count", authAdmin, userController.count);
router.post("/", userController.createUser);
router.post("/login", userController.login);
router.patch("/changeRole/:userID", authAdmin, userController.changeRole);
router.patch("/changeActive/:userID", authAdmin, userController.changeActive);
router.post("/forgotPassword", userController.forgotPassword);


router.post("/student", studentController.createStudent);
router.post("/creator", creatorController.createCreator);

// Project routes
router.post("/projects", projectController.createProject);
router.get("/projects", projectController.getProjects);

// Student Project routes
router.post("/student-projects", studentProjectController.createStudentProject);
router.get("/student-projects", studentProjectController.getStudentProjects);

// Creator Project routes
router.post("/creator-projects", creatorProjectController.createCreatorProject);
router.get("/creator-projects", creatorProjectController.getCreatorProjects);

// Get projects by user ID
router.get('/projects/user/:userId', projectController.getProjectsByUserId);
router.get("/projects/:projectId", projectController.getProjectById);
router.put("/projects/:projectId", projectController.updateProject); // Add route for updating entire project
router.patch("/projects/:projectId", projectController.updateProjectFields); // Add route for updating specific fields

//email2dvori
router.get('/startEmailServer', (req, res) => {
  startEmailServer();
  res.send('Email server started!');
});
module.exports = { routesInit: (app) => app.use("/", router) };
