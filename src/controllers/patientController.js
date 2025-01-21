const patientService = require('../services/patientService');

class PatientController {
  static async getAllPatients(req, res) {
    try {
      const patients = await patientService.getAllPatients();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPatientById(req, res) {
    try {
      const patient = await patientService.getPatientById(parseInt(req.params.id));
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createPatient(req, res) {
    try {
      const patient = await patientService.createPatient(req.body);
      res.status(201).json(patient);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updatePatient(req, res) {
    try {
      const patient = await patientService.updatePatient(parseInt(req.params.id), req.body);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.json(patient);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deletePatient(req, res) {
    try {
      await patientService.deletePatient(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PatientController; 