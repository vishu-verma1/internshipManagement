const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: [String],
  stipend: {
    amount: { type: Number, default: 0 },
    type: { type: String, enum: ['Paid', 'Free'], default: 'Free' },
  },
  duration: { type: String, required: true }, // e.g., "3 months"
  location: { type: String, required: true }, // e.g., "New York"
  mode: { type: String, enum: ['Online', 'Onsite', 'Hybrid'], required: true },
  openings: { type: Number, required: true }, // Number of openings
  deadline: { type: Date, required: true }, // Application deadline
  joinDate: { type: Date, required: true }, // When to join
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Internship', internshipSchema);