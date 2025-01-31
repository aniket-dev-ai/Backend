exports.uploadFile = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("file", file);

    let path =
      __dirname + "/uploads/" + Date.now() +`.${file.name.split(".")[1]}`;
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
