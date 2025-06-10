const mongoose = require('mongoose');

const otpVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: String,
  password: String,
  role: { type: String, enum: ['user', 'company'], required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 } // 10 min expiry
});

module.exports = mongoose.model('OtpVerification', otpVerificationSchema);
