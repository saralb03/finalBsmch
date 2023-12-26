const mongoose = require("mongoose");
const Joi = require("joi");
const { UserModel } = require("./userModel");

exports.validStudent = (data) => {
    const schema = Joi.object({
      institution: Joi.string().min(2).max(99).required(),
      programmingEducation: Joi.string().min(2).max(99).required(),
      linkedin: Joi.string().min(2).max(99),
      github: Joi.string().min(2).max(99),
      languages: Joi.array().items(Joi.string().min(2).max(99)),
      environments: Joi.array().items(Joi.string().min(2).max(99)),
      experience: Joi.string().min(2).max(99),
      interests: Joi.array().items(Joi.string().min(2).max(99)),
      about: Joi.string().min(2).max(99),
    });
  
    return schema.validate(data);
  };
  
let studentSchema = new mongoose.Schema({
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

exports.StudentModel = UserModel.discriminator("students", studentSchema);

// exports.validStudent = validStudent;


  

exports.createStudent = async (req, res) => {
  let validBody = validStudent(req.body); // Validate the request body
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let student = new StudentModel(req.body);
    // Additional processing specific to student, if needed
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err from student page", err });
  }
};

// module.exports = {
//   createStudent,
// };
