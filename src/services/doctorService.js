const prisma = require('../lib/prisma');

class DoctorService {
  async getAllDoctors() {
    return prisma.doctor.findMany({
      include: {
        category: true
      }
    });
  }

  async getDoctorById(id) {
    return prisma.doctor.findUnique({
      where: { id },
      include: {
        category: true
      }
    });
  }

  async createDoctor(data) {
    const { email, firstName, lastName, phoneNumber, categoryId, bio } = data;
    return prisma.doctor.create({
      data: {
        email,
        firstName,
        lastName,
        phoneNumber,
        categoryId: parseInt(categoryId),
        bio
      }
    });
  }

  async updateDoctor(id, data) {
    return prisma.doctor.update({
      where: { id },
      data
    });
  }

  async deleteDoctor(id) {
    return prisma.doctor.delete({
      where: { id }
    });
  }
}

module.exports = new DoctorService(); 