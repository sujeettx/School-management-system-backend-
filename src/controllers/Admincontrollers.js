const jwt = require('jsonwebtoken');
const User = require('../models/AdminModel');  // Import the User model

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if(await User.findOne({ name})){
            return res.status(400).json({
                message: "this name is taken by someone else please choose a different name"
            })
        }

        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) || // Check for at least one uppercase letter
            !/[a-z]/.test(password) || // Check for at least one lowercase letter
            !/[0-9]/.test(password) || // Check for at least one number
            !/[!@#$%^&*(),.?":{}|<>]/.test(password) // Check for at least one special character
        ) {
            return res.status(400).json({ 
                message: 'Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.' 
            });
        }
        

        // If no role is provided, set role to 'student'
        const userRole = role || 'student';

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
            role: userRole,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user and return JWT token
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email (or maybe this user is not exist please your cheack your email) ' });
        }

        // Check if password matches
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'wrong password please try to remeber the correct password' });
        }

        // Create and send JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all Admins

const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' });
        res.json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser ,getAdmins};
