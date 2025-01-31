const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/fileupload");

router.post("/file", uploadFile);

module.exports = router;
