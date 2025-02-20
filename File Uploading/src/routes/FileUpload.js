const express = require("express");
const router = express.Router();
const { uploadFile, imgUpload } = require("../controllers/fileupload");

router.post("/imgUpload", imgUpload);
router.post("/file", uploadFile);

module.exports = router;
