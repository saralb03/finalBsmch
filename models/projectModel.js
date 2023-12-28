const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true }, // Or "Frontend" or "Remote"
  languages: [String],
  tools: [String],
  skillsRequired: [String],
  flexible: { type: Boolean, default: false }, // Boolean indicating if the project is flexible
  fieldOfWork: { type: String, required: true }, // Or any appropriate field of work
  workEnvironment: { type: String, required: true }, // Or "Office" or "Hybrid"
  requiredLanguages: [String], // Or any required languages
  style: { type: String, required: true }, // Or "E-commerce" or any appropriate style
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, // Reference to the 'users' collection
});

const ProjectModel = mongoose.model("projects", projectSchema);

module.exports = {
  ProjectModel,
};
