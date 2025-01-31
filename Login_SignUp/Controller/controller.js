const bcrypt = require("bcrypt");
const userModal = require("../Model/Model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userModal.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error In Hashing Password",
      });
    }

    const newUser = await userModal.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    let user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
    console.log(user);
    user = user.toObject();
    user.token = token;
    console.log(user);
    user.password = undefined;
    console.log(user);

    const options = {
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    };

    res.cookie("AniketKaToken", token, options).status(200).json({
      success: true,
      user,
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
