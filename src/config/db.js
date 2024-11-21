const mongoose = require('mongoose');
require('dotenv').config(); 
const connectDb = async () => {
    try {
        // Use the connection string from .env
        const uri = process.env.MONGO_URI;

        // Connect to MongoDB
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB Atlas!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if connection fails
    }
};

module.exports = connectDb;
