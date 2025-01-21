const doctorService = require('../services/doctorService');

class DoctorController {
  static async getAllDoctors(req, res) {
    try {
      const doctors = await doctorService.getAllDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDoctorById(req, res) {
    try {
      const doctor = await doctorService.getDoctorById(parseInt(req.params.id));
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createDoctor(req, res) {
    try {
      const doctor = await doctorService.createDoctor(req.body);
      res.status(201).json(doctor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateDoctor(req, res) {
    try {
      const doctor = await doctorService.updateDoctor(parseInt(req.params.id), req.body);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteDoctor(req, res) {
    try {
      await doctorService.deleteDoctor(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = DoctorController;