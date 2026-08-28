// Server Entry Point
// TODO: Initialize server and connect to database
require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});