const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [6, "Please enter email length above 6 characters"],
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [6, "Please enter length of password above 6 characters"],
  },
  role: { type: String, enum: ["user", "company"], default: "user" },

  otp: String,
  otpExpires: Date,
  resumeUrl: String,
  skills: [String],
  
  // New fields for additional details:
  phone: { type: String },
  education: { type: String },
  experience: { type: String },
  address: { type: String },
  profilePicture: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);