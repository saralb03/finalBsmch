const mongoose = require("mongoose");
const { ProjectModel } = require("./projectModel");

const studentProjectSchema = new mongoose.Schema({
  projectSize: { type: String, required: true },
  academicLevel: { type: String, required: true }, 
  mentorshipRequired: { type: Boolean, default: false }, // Indicates if mentorship is required for the student project
  developmentTools: { type:[String]},
  interests: { type: String }, 
});

const StudentProjectModel = ProjectModel.discriminator("studentProjects", studentProjectSchema);

module.exports = {
  StudentProjectModel,
};