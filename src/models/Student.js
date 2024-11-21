const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:
     { type: String, required: true },
    email: 
    { type: String, unique: true, required: true },
    classId:
     { type:Number, required: true },
    profileImageUrl:
     { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);
