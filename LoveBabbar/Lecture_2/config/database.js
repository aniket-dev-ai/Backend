const mongoose = require("mongoose");

require("dotenv").config();

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
