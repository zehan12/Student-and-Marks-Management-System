require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send({ message: "hello from backend" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
