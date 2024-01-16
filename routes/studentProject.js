const { StudentProjectModel } = require("../models/studentProjectModel");
const { createProject } = require("./project");
const { StudentModel } = require("../models/studentModel");

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
const getFilteredSProjects = async (req, res) => {
  try {
    const projects = await StudentProjectModel.find();

    // Specify the fields you want to include in the project
    const allowedFields = [
      'duration', 'description', 'profession', 'flexible', 'workEnvironment', 'style', 'teamSize', 'active',
      'createdBy', 'projectSize', 'academicLevel', 'mentorshipRequired', 'developmentTools', 'interests' /* add more fields as needed */
    ];

    // Specify the fields you want to include from the student details
    const studentFields = ['experience', 'location', 'active','_id'];

    // Filter projects to include only existing fields and values
    const filteredProjects = await Promise.all(projects.map(async (project) => {
      const filteredProject = {};

      // Include only allowed fields in the project
      for (const field of allowedFields) {
        // Check if the field exists in the project
        // if (project.hasOwnProperty(field)) {
        // If the field is 'createdBy', fetch the student details
        if (field === 'createdBy') {
          const studentId = project[field];
          const student = await StudentModel.findById(studentId);

          // Include specified fields from the student details directly in 'createdBy'
          if (student) {
            filteredProject[field] = {};
            studentFields.forEach(studentField => {
              filteredProject[field][studentField] = student[studentField];
            });
          } else {
            // Handle the case where the student is not found
            console.error(`Student with ID ${studentId} not found.`);
          }
        } else {
          // For other fields, copy the value from the project
          filteredProject[field] = project[field];
        }
        // }
      }

      return filteredProject;
    }));

    res.json(filteredProjects);
  } catch (err) {
    console.error("Error getting projects:", err);
    res.status(500).json({ msg: "Error getting projects", err: err.message });
  }
};



module.exports = {
  createStudentProject,
  getStudentProjects,
  getFilteredSProjects
};
