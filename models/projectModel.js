const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },  // Change type to Number for duration
  profession: { type: String, required: true },
  flexible: { type: String, required: true },
  workEnvironment: { type: String, required: true },
  style: { type:[String] },
  teamSize: { type: Number, required: true },  // Change type to Number for teamSize
  createdBy: { type: String, required: true }, 
  dateCreated: { type: mongoose.Schema.Types.Date, required:true},
  active:{ type: Boolean, default: true}
});



const ProjectModel = mongoose.model("projects", projectSchema);

module.exports = {
  ProjectModel,
};