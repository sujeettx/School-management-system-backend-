const express = require('express');
const AdminMiddleware = require('../middleware/AdminMiddleware');
const { registerUser, loginUser ,getAdmins} = require('../controllers/Admincontrollers');  // Import controllers
const router = express.Router();

// Route for registering a user
router.post('/register', registerUser);

// Route for logging in a user
router.post('/login', loginUser);

// Route for getting all admins
router.get('/',getAdmins);

module.exports = router;
