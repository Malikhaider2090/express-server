const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PatientService {
  async getAllPatients() {
    return await prisma.patient.findMany();
  }

  async getPatientById(id) {
    return await prisma.patient.findUnique({
      where: { id }
    });
  }

  async createPatient(data) {
    return await prisma.patient.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: new Date(data.dateOfBirth),
        address: data.address
      }
    });
  }

  async updatePatient(id, data) {
    return await prisma.patient.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        address: data.address
      }
    });
  }

  async deletePatient(id) {
    return await prisma.patient.delete({
      where: { id }
    });
  }
}

module.exports = new PatientService(); 