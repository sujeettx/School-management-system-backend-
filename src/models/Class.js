const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Class name (e.g., "10th Grade")
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Reference to the teacher
    studentCount: { type: Number, default: 0 }, // Auto-calculated based on students array length
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Array of student references
    createdAt: { type: Date, default: Date.now }, // Timestamp for creation
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

module.exports = mongoose.model('Class', classSchema);
