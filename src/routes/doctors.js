const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctorController');

// Get all doctors
router.get('/', DoctorController.getAllDoctors);

// Get specific doctor
router.get('/:id', DoctorController.getDoctorById);

// Create new doctor
router.post('/', DoctorController.createDoctor);

// Update doctor
router.put('/:id', DoctorController.updateDoctor);

// Delete doctor
router.delete('/:id', DoctorController.deleteDoctor);

module.exports = router; 