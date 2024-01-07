const mongoose = require("mongoose");
const { ProjectModel } = require("./projectModel");

const creatorProjectSchema = new mongoose.Schema({
  experienceLevel: { type: String, required: true }, // Beginner, Intermediate, Advanced, etc.
  teamSize: { type: Number, required: true }, // Number of team members required for the creator project
  toolsPreferred: [String], // Array of tools preferred for the creator project
  skillrequired:[String]
});

const CreatorProjectModel = ProjectModel.discriminator("creatorProjects", creatorProjectSchema);

module.exports = {
  CreatorProjectModel,
};