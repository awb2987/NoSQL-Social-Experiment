// config/connection.js
const mongoose = require('mongoose');
require('dotenv').config();

// Define the connection string, using an environment variable or a local database
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB';

// Connect to MongoDB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Successfully connected to MongoDB!');
})
.catch(err => {
    console.error('Error with connection to MongoDB:', err);
});

// Export the connection for use in other files
module.exports = mongoose.connection;
