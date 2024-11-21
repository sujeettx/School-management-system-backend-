const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const AdminMiddleware = require('../middleware/AdminMiddleware');

// CRUD Operations
router.post('/', AdminMiddleware, teacherController.addTeacher);
router.get('/', AdminMiddleware, teacherController.getAllTeachers);
router.get('/:id', AdminMiddleware, teacherController.getTeacherById);
router.put('/:id', AdminMiddleware, teacherController.updateTeacher);
router.delete('/:id', AdminMiddleware, teacherController.deleteTeacher);

module.exports = router;
