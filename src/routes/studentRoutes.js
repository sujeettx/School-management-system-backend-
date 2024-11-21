const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentControllers');
const AdminMiddleware = require('../middleware/AdminMiddleware');

// CRUD Operations
router.post('/', AdminMiddleware, studentController.addStudent);
router.get('/', AdminMiddleware, studentController.getAllStudents);
router.get('/:id', AdminMiddleware, studentController.getStudentById);
router.put('/:id', AdminMiddleware, studentController.updateStudent);
router.delete('/:id', AdminMiddleware, studentController.deleteStudent);

module.exports = router;
