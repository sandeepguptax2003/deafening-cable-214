const mongoose = require("mongoose");

const loginSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
  },
  {
    versionkey: false,
  }
);

const loginModel = mongoose.model("login", loginSchema);
module.exports = { loginModel };