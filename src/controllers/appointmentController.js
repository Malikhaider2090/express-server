const appointmentService = require('../services/appointmentService');

class AppointmentController {
  async getAllAppointments(req, res) {
    try {
      const appointments = await appointmentService.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAppointmentById(req, res) {
    try {
      const appointment = await appointmentService.getAppointmentById(parseInt(req.params.id));
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createAppointment(req, res) {
    try {
      const appointment = await appointmentService.createAppointment(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateAppointment(req, res) {
    try {
      const appointment = await appointmentService.updateAppointment(
        parseInt(req.params.id),
        req.body
      );
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteAppointment(req, res) {
    try {
      await appointmentService.deleteAppointment(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAppointmentsByDateRange(req, res) {
    try {
      const { start, end } = req.query;
      const appointments = await appointmentService.getAppointmentsByDateRange(
        new Date(start),
        new Date(end)
      );
      res.json(appointments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AppointmentController(); 