const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const AdminMiddleware = require('../middleware/AdminMiddleware');

// CRUD Operations
router.post('/', AdminMiddleware, classController.createClass);
router.get('/', AdminMiddleware, classController.getAllClasses);
router.get('/:id', AdminMiddleware, classController.getClassById);
router.put('/:id', AdminMiddleware, classController.updateClass);
router.delete('/:id', AdminMiddleware, classController.deleteClass);

module.exports = router;
