const express = require('express');
const router = express.Router();
const appointmentRoutes = require('./appointments');
const doctorRoutes = require('./doctors');
const patientRoutes = require('./patients');

router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

router.use('/appointments', appointmentRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);

module.exports = router; 