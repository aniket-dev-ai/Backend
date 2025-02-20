const File = require("../models/file");
const cloudinary = require("cloudinary");

exports.uploadFile = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("file", file);

    let path =
      __dirname + "/uploads/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("Path =>", path);

    await file.mv(path, (err) => {
      console.log("Error", err);
    });

    res.json({
      success: true,
      message: "File uploaded successfully",
      file: file.name,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

function isFileTypeSupported(fileType, supportedTypes) {
  return supportedTypes.includes(fileType);
}

async function UploadFileToCloudinary(file, folder) {
  const options = { folder };
  await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imgUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imgFile;
    console.log("file", file);

    if (!file || !file.tempFilePath) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded or file path missing",
      });
    }

    const supportedTypes = ["png", "jpg", "jpeg", "gif"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    const uploadResponse = await UploadFileToCloudinary(file, "CodeHelp");
    console.log("uploadResponse", uploadResponse);

    // const fileData = await File.create({
    //   name,
    //   url,
    //   tags,
    //   email,
    // });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      // file: fileData,
    });
  } catch (error) {
    console.error("Error uploading file:", error); // Log the error details
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
