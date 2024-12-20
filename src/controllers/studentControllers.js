const Student = require("../models/Student");
const Class = require("../models/Class");
const { ErrorHandler } = require("../utils/errorHandler");

exports.addStudent = async (req, res) => {
  try {
    const { classId } = req.body;

    if (!classId) {
      return res.status(400).json({ error: "Class ID is required" });
    }

    const student = new Student(req.body);
    const savedStudent = await student.save();

    // Update the class to include the student
    await Class.findByIdAndUpdate(classId, {
      $push: { students: savedStudent._id },
      $inc: { studentCount: 1 },
    });

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find(req.query).populate("classId");
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("classId");
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("classId");
    if (!updatedStudent)
      return res.status(404).json({ error: "Student not found" });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) return res.status(404).json({ error: "Student not found" });

    // Update the class to remove the student
    await Class.findByIdAndUpdate(student.classId, {
      $pull: { students: student._id },
      $inc: { studentCount: -1 },
    });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
