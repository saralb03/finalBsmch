const { StudentModel } = require("../models/studentModel");

const createStudent = async (req, res) => {
//   let validBody = validStudent(req.body);
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
    res.status(500).json({ msg: "err", err });
  }
};

// Additional functions specific to student, if needed
// ...

module.exports = {
  createStudent,
  // Export additional functions specific to student, if needed
  // ...
};
