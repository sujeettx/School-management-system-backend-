const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Student's full name
    email: { type: String, unique: true, required: true }, // Unique email for login/identification
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Reference to the class
    profileImageUrl: { type: String, default: null }, // Optional profile image URL
    createdAt: { type: Date, default: Date.now }, // Timestamp for creation
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

module.exports = mongoose.model('Student', studentSchema);
