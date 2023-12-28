const mongoose = require("mongoose");
const { ProjectModel } = require("./projectModel");

const studentProjectSchema = new mongoose.Schema({
  projectSize: { type: String, required: true },
  specificDevelopmentStyle: { type: String, required: true },
  // Add other fields specific to student projects
});

const StudentProjectModel = ProjectModel.discriminator("studentProjects", studentProjectSchema);

module.exports = {
  StudentProjectModel,
};
