const mongoose = require("mongoose");
const { ProjectModel } = require("./projectModel");

const creatorProjectSchema = new mongoose.Schema({
  workDomain: { type: String, required: true },
  // Add other fields specific to creator projects
});

const CreatorProjectModel = ProjectModel.discriminator("creatorProjects", creatorProjectSchema);

module.exports = {
  CreatorProjectModel,
};
