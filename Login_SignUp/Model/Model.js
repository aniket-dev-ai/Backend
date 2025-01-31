const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Admin", "Teacher"],
  },
});

module.exports = mongoose.model("Npc", userschema);
