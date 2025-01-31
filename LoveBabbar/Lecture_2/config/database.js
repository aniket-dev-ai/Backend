const mongoose = require("mongoose");

require("dotenv").config();

console.log(process.env.DATABASE_URL)
const dbConnect = () => {
    mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => {
        console.log("Database Connected");
      })
      .catch((error) => {
        console.log("Database connection failed", error.message);
      });
  };
  
module.exports = dbConnect;
