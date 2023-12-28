const { StudentProjectModel } = require("../models/studentProjectModel");
const { createProject } = require("./project");

const createStudentProject = async (req, res) => {
  try {
    let studentProject = new StudentProjectModel(req.body);
    await studentProject.save();
    res.status(201).json(studentProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating student project", err });
  }
};

const getStudentProjects = async (req, res) => {
    try {
      const studentProjects = await StudentProjectModel.find();
      res.json(studentProjects);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Error getting student projects", err });
    }
  };

module.exports = {
  createStudentProject,
  getStudentProjects,
};
