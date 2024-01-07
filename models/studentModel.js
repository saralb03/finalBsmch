const mongoose = require("mongoose");
const Joi = require("joi");
const { UserModel } = require("./userModel");

// const validStudent = (data) => {
//   const schema = Joi.object({
//     institution: Joi.string().min(2).max(99).required(),
//     programmingEducation: Joi.string().min(2).max(99).required(),
//     linkedin: Joi.string().min(2).max(99),
//     github: Joi.string().min(2).max(99),
//     languages: Joi.array().items(Joi.string().min(2).max(99)),
//     environments: Joi.array().items(Joi.string().min(2).max(99)),
//     experience: Joi.string().min(2).max(99),
//     interests: Joi.array().items(Joi.string().min(2).max(99)),
//     about: Joi.string().min(2).max(99),
//   });

//   return schema.validate(data);
// };

const studentSchema = new mongoose.Schema({
  // Additional properties for student
  institution: String,
  linkedin: String,
  github: String,
  experience: [String],
  about: String,
});

const StudentModel = UserModel.discriminator("students", studentSchema);

exports.StudentModel = StudentModel;
// exports.validStudent = validStudent;
