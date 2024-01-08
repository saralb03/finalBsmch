const mongoose = require("mongoose");
const { ProjectModel } = require("./projectModel");

const creatorProjectSchema = new mongoose.Schema({
  experienceLevel: { type: String, required: true }, // Beginner, Intermediate, Advanced, etc.
  toolsPreferred: [String], // Array of tools preferred for the creator project
  skillrequired:[String]
});

const CreatorProjectModel = ProjectModel.discriminator("creatorProjects", creatorProjectSchema);

module.exports = {
  CreatorProjectModel,
};