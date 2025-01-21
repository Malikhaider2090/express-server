const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/patientController');

// Get all patients
router.get('/', PatientController.getAllPatients);

// Get specific patient
router.get('/:id', PatientController.getPatientById);

// Create new patient
router.post('/', PatientController.createPatient);

// Update patient
router.put('/:id', PatientController.updatePatient);

// Delete patient
router.delete('/:id', PatientController.deletePatient);

module.exports = router; 