const prisma = require('../lib/prisma');

class AppointmentService {
  async getAllAppointments() {
    return prisma.appointment.findMany({
      orderBy: {
        startTime: 'asc'
      }
    });
  }

  async getAppointmentById(id) {
    return prisma.appointment.findUnique({
      where: { id }
    });
  }

  async createAppointment(data) {
    const { patientId, doctorId, startTime, endTime, notes } = data;

    // Validate time slots
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        OR: [
          {
            AND: [
              { startTime: { lte: new Date(startTime) } },
              { endTime: { gt: new Date(startTime) } }
            ]
          },
          {
            AND: [
              { startTime: { lt: new Date(endTime) } },
              { endTime: { gte: new Date(endTime) } }
            ]
          }
        ]
      }
    });

    if (existingAppointment) {
      throw new Error('Time slot is already booked');
    }

    return prisma.appointment.create({
      data: {
        patientId: parseInt(patientId),
        doctorId: parseInt(doctorId),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        notes,
        status: 'SCHEDULED'
      }
    });
  }

  async updateAppointment(id, data) {
    return prisma.appointment.update({
      where: { id },
      data
    });
  }

  async deleteAppointment(id) {
    return prisma.appointment.delete({
      where: { id }
    });
  }

  async getAppointmentsByDateRange(start, end) {
    return prisma.appointment.findMany({
      where: {
        startTime: {
          gte: start,
          lte: end
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    });
  }
}

module.exports = new AppointmentService(); 