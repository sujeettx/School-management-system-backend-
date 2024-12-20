const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Teacher's full name
    email: { type: String, unique: true, required: true }, // Unique email for login/identification
    subject: { type: String, required: true }, // Main subject taught by the teacher
    profileImageUrl: { type: String, default: null }, // Optional profile image URL
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }], // Array of classes taught
    createdAt: { type: Date, default: Date.now }, // Timestamp for creation
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

module.exports = mongoose.model('Teacher', teacherSchema);
