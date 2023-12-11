require("dotenv").config();
const { PrismaClient } = require('./prisma/generated/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function seedData() {
  try {
    const jsonData = fs.readFileSync('studentsData.json', 'utf8');
    const studentsData = JSON.parse(jsonData);

    for (const studentData of studentsData) {
      await prisma.student.create({
        data: {
          student_name: studentData.student_name,
          standard: studentData.standard,
          marks: {
            create: studentData.marks,
          },
        },
      });
    }

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
