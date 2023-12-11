require("dotenv").config();
const express = require("express");
const { PrismaClient } = require('./prisma/generated/client');

const PORT = process.env.PORT;
const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "hello from backend" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
