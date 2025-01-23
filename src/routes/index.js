const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const appointmentRoutes = require('./appointments');
const doctorRoutes = require('./doctors');
const patientRoutes = require('./patients');

// Define a rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Apply the rate limiter to all requests
router.use(limiter);

router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

router.use('/appointments', appointmentRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);

module.exports = router; 