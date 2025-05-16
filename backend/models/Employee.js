const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  pfNumber: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  position: {
    type: String,
    required: true
  },
  aadhar: {
    type: String,
    required: true,
    match: /^\d{12}$/, // 12-digit Aadhar validation
    unique: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/ // Indian mobile number validation
  },
  pfBalance: {
    type: Number,
    default: 0
  },
  photo: {
    type: String // Path or URL to passport size photo
  },
  aadharCardImage: {
    type: String // Path or URL to Aadhar card image
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
