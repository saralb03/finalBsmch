const express = require("express");
const { authAdmin } = require("../middlewares/auth");
const auth = require('../middlewares/auth')
const userController = require("./users");
const studentController = require("./student");
const creatorController = require("./creator");
const projectController = require("./project");
const studentProjectController = require("./studentProject");
const creatorProjectController = require("./creatorProject");
const messageController = require("./message");
// const { addMessage, getMessages } = require("./message");


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
// Route for resetting the password
router.get('/reset-password', userController.resetPassword);
router.get('/reset-password', userController.resetPassword);
router.get('/getUserFilteredProjects/:userType/:user_id', userController.getUserFilteredProjects);


// Route for updating the password
router.get('/getUserById/:userId', userController.getUserById);


router.post("/student", studentController.createStudent);
router.post("/creator", creatorController.createCreator);

// Project routes
router.post("/projects", projectController.createProject);
router.get("/projects", projectController.getProjects);
router.get("/getFilteredProjects", projectController.getFilteredProjects);

// Student Project routes
router.post("/student-projects", studentProjectController.createStudentProject);
router.get("/student-projects", studentProjectController.getStudentProjects);
router.get("/getFilteredSProjects", studentProjectController.getFilteredSProjects);

// Creator Project routes
router.post("/creator-projects", creatorProjectController.createCreatorProject);
router.get("/creator-projects", creatorProjectController.getCreatorProjects);
router.get("/getFilteredCProjects", creatorProjectController.getFilteredCProjects);

// Get projects by user ID
router.get('/projects/user/:userId', projectController.getProjectsByUserId);
router.get("/projects/:projectId", projectController.getProjectById);
router.put("/projects/:projectId", projectController.updateProject); // Add route for updating entire project
router.patch("/projects/:projectId", projectController.updateProjectFields); // Add route for updating specific fields

//message

router.post("/addmsg/:userId", auth.auth ,messageController.addMessage);
router.post("/getmsg/:userId", auth.auth,messageController.getMessages);
// router.post("/addmsg", messageController.addMessage);
// router.post("/getmsg",messageController.getMessages);

//students
router.get('/getStudentById/:studentId', studentController.getStudentById);

//creator
router.get('/getCreatorById/:creatorId', creatorController.getCreatorById);

module.exports = { routesInit: (app) => app.use("/", router) };
