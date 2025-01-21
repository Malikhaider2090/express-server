require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    await prisma.appointment.deleteMany({});
    await prisma.doctor.deleteMany({});
    await prisma.patient.deleteMany({});
    await prisma.category.deleteMany({});
    console.log('🧹 Cleaned database');
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
    throw error;
  }
}

async function seedCategories() {
  try {
    const categories = await prisma.category.createMany({
      data: [
        { name: 'CARDIOLOGY', description: 'Heart and cardiovascular system specialists' },
        { name: 'DENTIST', description: 'Oral health specialists' },
        { name: 'DERMATOLOGY', description: 'Skin specialists' },
        { name: 'ENT', description: 'Ear, Nose, and Throat specialists' },
        { name: 'ORTHOPAEDIC', description: 'Bone and joint specialists' },
        { name: 'PEDIATRICS', description: 'Child health specialists' }
      ].map(category => ({
        ...category,
        name: category.name.toUpperCase()
      }))
    });
    console.log('🏥 Created categories');
    return categories;
  } catch (error) {
    console.error('❌ Error creating categories:', error);
    throw error;
  }
}

async function seedDoctors() {
  try {
    const categories = await prisma.category.findMany();

    const doctors = await prisma.doctor.createMany({
      data: [
        {
          email: 'john.cardio@hospital.com',
          firstName: 'John',
          lastName: 'Smith',
          phoneNumber: '1234567890',
          categoryId: categories.find(c => c.name === 'CARDIOLOGY').id,
          bio: 'Experienced cardiologist with 15 years of practice'
        },
        {
          email: 'sarah.dental@hospital.com',
          firstName: 'Sarah',
          lastName: 'Johnson',
          phoneNumber: '2345678901',
          categoryId: categories.find(c => c.name === 'DENTIST').id,
          bio: 'Specialized in cosmetic dentistry'
        },
        {
          email: 'mike.derm@hospital.com',
          firstName: 'Michael',
          lastName: 'Brown',
          phoneNumber: '3456789012',
          categoryId: categories.find(c => c.name === 'DERMATOLOGY').id,
          bio: 'Board certified dermatologist'
        },
        {
          email: 'lisa.ent@hospital.com',
          firstName: 'Lisa',
          lastName: 'Davis',
          phoneNumber: '4567890123',
          categoryId: categories.find(c => c.name === 'ENT').id,
          bio: 'ENT specialist with focus on pediatric cases'
        }
      ]
    });

    console.log('👨‍⚕️ Created doctors');
    return doctors;
  } catch (error) {
    console.error('❌ Error creating doctors:', error);
    throw error;
  }
}

async function seedPatients() {
  try {
    const patients = await prisma.patient.createMany({
      data: [
        {
          email: 'patient1@example.com',
          firstName: 'Alice',
          lastName: 'Wilson',
          dateOfBirth: new Date('1990-01-15'),
          phoneNumber: '5678901234',
          address: '123 Main St, City',
          medicalHistory: 'No major health issues'
        },
        {
          email: 'patient2@example.com',
          firstName: 'Bob',
          lastName: 'Taylor',
          dateOfBirth: new Date('1985-03-22'),
          phoneNumber: '6789012345',
          address: '456 Oak St, City',
          medicalHistory: 'Allergic to penicillin'
        },
        {
          email: 'patient3@example.com',
          firstName: 'Carol',
          lastName: 'Anderson',
          dateOfBirth: new Date('1995-07-08'),
          phoneNumber: '7890123456',
          address: '789 Pine St, City',
          medicalHistory: 'Asthma'
        },
        {
          email: 'patient4@example.com',
          firstName: 'David',
          lastName: 'Martinez',
          dateOfBirth: new Date('1982-11-30'),
          phoneNumber: '8901234567',
          address: '321 Elm St, City',
          medicalHistory: 'Hypertension'
        }
      ]
    });
    console.log('🏃 Created patients');
    return patients;
  } catch (error) {
    console.error('❌ Error creating patients:', error);
    throw error;
  }
}

async function seedAppointments() {
  try {
    const doctors = await prisma.doctor.findMany();
    const patients = await prisma.patient.findMany();

    const appointments = [];
    const startDate = new Date();
    startDate.setHours(9, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const appointmentDate = new Date(startDate);
      appointmentDate.setDate(startDate.getDate() + i);

      for (let j = 0; j < 3; j++) {
        const appointmentTime = new Date(appointmentDate);
        appointmentTime.setHours(9 + j * 2, 0, 0, 0);

        appointments.push({
          patientId: patients[Math.floor(Math.random() * patients.length)].id,
          doctorId: doctors[Math.floor(Math.random() * doctors.length)].id,
          startTime: appointmentTime,
          endTime: new Date(appointmentTime.getTime() + 60 * 60 * 1000),
          status: 'SCHEDULED',
          notes: 'Regular checkup'
        });
      }
    }

    await prisma.appointment.createMany({
      data: appointments
    });
    console.log('📅 Created appointments');
  } catch (error) {
    console.error('❌ Error creating appointments:', error);
    throw error;
  }
}

async function main() {
  try {
    await cleanDatabase();
    await seedCategories();
    await seedDoctors();
    await seedPatients();
    await seedAppointments();
    console.log('✅ Seed completed successfully');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });