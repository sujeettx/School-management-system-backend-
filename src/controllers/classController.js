const Class = require("../models/Class");
const { ErrorHandler } = require("../utils/errorHandler");

exports.createClass = async (req, res) => {
  try {
    const { name, teacherId } = req.body;

    if (!teacherId) {
      return res.status(400).json({ error: "Teacher ID is required" });
    }

    const newClass = new Class({ name, teacherId });
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find(req.query)
      .populate("teacherId", "name _id")  // Populate teacherId with only name and _id
      .populate("students", "name _id");  // Populate students with only name and _id
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const singleClass = await Class.findById(req.params.id)
      .populate("teacherId", "name _id")  // Populate teacherId with only name and _id
      .populate("students", "name _id");  // Populate students with only name and _id
    
    if (!singleClass) return res.status(404).json({ error: "Class not found" });
    res.status(200).json(singleClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("teacherId", "name _id")  // Populate teacherId with only name and _id
      .populate("students", "name _id");  // Populate students with only name and _id
    
    if (!updatedClass)
      return res.status(404).json({ error: "Class not found" });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass)
      return res.status(404).json({ error: "Class not found" });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
