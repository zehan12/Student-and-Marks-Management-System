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

app.get("*", function (_, res) {
  res.send({ message: "route not exit" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
