const Teacher = require('../models/Teacher');
const { ErrorHandler } = require('../utils/errorHandler');
exports.addTeacher = async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        const savedTeacher = await teacher.save();
        res.status(201).json(savedTeacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find(req.query);
        res.status(200).json(teachers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeacher) return res.status(404).json({ error: 'Teacher not found' });
        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!deletedTeacher) return res.status(404).json({ error: 'Teacher not found' });
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
