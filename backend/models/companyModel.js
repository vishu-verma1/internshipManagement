const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
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
  role: { type: String, default: 'company' },
  phone: { type: String },
  address: { type: String },
  website: { type: String },
  description: { type: String },
  profilePicture: { type: String, default: null },

  // New fields
  linkedin: { type: String, default: null },
  instagram: { type: String, default: null },
  facebook: { type: String, default: null },
  industry: { type: String, default: null },
  companyType: { type: String, enum: ['Startup', 'MNC', 'NGO', 'Other'], default: 'Other' },
  numberOfEmployees: { type: Number, default: null },
  headOfficeAddress: { type: String, default: null },
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model('Company', companySchema);