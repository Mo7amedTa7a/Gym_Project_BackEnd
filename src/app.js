// Express Application Configuration
// TODO: Express app initialization, middlewares, routes, and global error handling
const express = require('express');
const errorMiddleware = require("./middleware/errorMiddleware");
const planRoutes = require('./routes/planRoutes');
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const memberRoutes = require("./routes/memberRoutes");
const trainerRoutes = require("./routes/trainerRoutes");

const app = express();


//Global Middlewares
app.use(express.json());


// Routes

app.use("/api/auth", authRoutes);   
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/trainer",trainerRoutes)


// Test Route
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Gym Management System API'
//     });
// });

// Global Error Handler
app.use(errorMiddleware);


module.exports = app;