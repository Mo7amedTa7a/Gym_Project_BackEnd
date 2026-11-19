// Express Application Configuration
// TODO: Express app initialization, middlewares, routes, and global error handling
const express = require('express');
const errorMiddleware = require("./middleware/errorMiddleware");
const { setupSwagger } = require('./config/swagger');

const planRoutes = require('./routes/planRoutes');
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const memberRoutes = require("./routes/memberRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Global Middlewares
app.use(express.json());

// Swagger Documentation
setupSwagger(app);

// Routes
app.use("/api/auth", authRoutes);   
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/trainer", trainerRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Root Route - Redirect to API Documentation
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// Global Error Handler
app.use(errorMiddleware);


module.exports = app;