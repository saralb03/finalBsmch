const mongoose = require("mongoose");
const { UserModel } = require("./userModel");

const studentSchema = new mongoose.Schema({
  // Additional properties for student
  institution: String,
  programmingEducation: String,
  linkedin: String,
  github: String,
  languages: [String],
  environments: [String],
  experience: String,
  interests: [String],
  about: String,
});

const StudentModel = UserModel.discriminator("students", studentSchema);

exports.StudentModel = StudentModel;
