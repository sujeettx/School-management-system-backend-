const express = require('express');
const connectDb = require ('./config/db')
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
const AdminRoutes = require('./routes/AdminRoutes');
const { handleError } = require('./utils/errorHandler');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data

app.use(handleError);
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});

// db connection

connectDb();

// Routes
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/classes', classRoutes);
app.use('/Admins',AdminRoutes);

// Base Route
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: 'Welcome to the School Management System API!'
    });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    if (dbClient) {
        await dbClient.close();
        console.log('Database connection closed.');
    }
    process.exit(0);
});

module.exports = app;