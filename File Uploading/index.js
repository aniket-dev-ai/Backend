const express = require("express");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(fileUpload());
app.use(express.json());
 
require("./src/config/db").connect();
require("./src/config/cloudinary").cloudinaryConnect();

// Routes
const uploadRoutes = require("./src/routes/FileUpload");
app.use("/api/v1/upload", uploadRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
