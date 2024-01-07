const { StudentModel } = require("../models/studentModel");
const { validStudent } = require("../models/studentModel");

const createStudent = async (req, res) => {
//   let validBody = validStudent(req.body); // Validate the request body
//   if (validBody.error) {
//     return res.status(400).json(validBody.error.details);
//   }
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

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.studentId; 
    const student = await StudentModel.findById(studentId);
    
    if (!student) {
      return res.json({ msg: "Student not found" });
    }
    
    res.json({ student });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error getting student", err });
  }
};

module.exports = {
  createStudent,
  getStudentById
};
