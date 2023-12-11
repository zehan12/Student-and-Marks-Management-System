require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("./prisma/generated/client");

const PORT = process.env.PORT;
const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send({ message: "hello from backend" });
});

app.get("/students", async (req, res) => {
  const { page = 1, length = 10, query = "" } = req.query;
  const skip = (page - 1) * length;

  try {
    const students = await prisma.student.findMany({
      where: {
        OR: [
          { student_name: { contains: query, mode: "insensitive" } },
          { standard: { contains: query, mode: "insensitive" } },
        ],
      },
      skip,
      take: parseInt(length),
    });

    const totalStudents = await prisma.student.count({
      where: {
        OR: [
          { student_name: { contains: query, mode: "insensitive" } },
          { standard: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    const totalPages = Math.ceil(totalStudents / length);

    res.status(200).json({
      students,
      pagination: {
        totalStudents,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(length),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/fetch_results', async (req, res) => {
  const { student_id } = req.query;

  try {
    let students = [];

    if (student_id) {
      students = await prisma.student.findMany({
        where: { student_id: parseInt(student_id) },
        include: { marks: true },
      });
    } else {
      students = await prisma.student.findMany({ include: { marks: true } });
    }

    const results = students.map((student) => {
      const totalMarks = student.marks.reduce((sum, mark) => sum + mark.marks, 0);
      const percentage = (totalMarks / (student.marks.length * 100)) * 100;
      let result = '';

      if (percentage < 35) {
        result = 'Fail';
      } else if (percentage >= 35 && percentage < 60) {
        result = 'Second Class';
      } else if (percentage >= 60 && percentage < 85) {
        result = 'First Class';
      } else {
        result = 'Distinction';
      }

      return {
        student_name: student.student_name,
        percentage: percentage.toFixed(2),
        result,
      };
    });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("*", function (_, res) {
  res.send({ message: "route not exit" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
