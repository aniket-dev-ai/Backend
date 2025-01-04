const express = require("express");
const app = express();

const ser = 3000;

app.listen(ser, () => {
  console.log(`Server Started at ${ser}`);
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello ji");
});

app.get("/api/cars", (req, res) => {
  const { name, brand } = req.body;
  console.log(name, brand);
  res.send("Car created successfully");
});

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/myDataBase")
  .then(() => {
    console.log("Connection Established");
  })
  .catch((e) => {
    console.log("Connection failed", e);
  });

