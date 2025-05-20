const mongoose = require('mongoose');

const BookingRequestSchema = new mongoose.Schema({
  ndid: {
    type: String,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Contact: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Subject: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  },
  Created_at: {
    type: Date,
    required: true
  },
  Remark: {
    type: String,
    default: ''
  },
  converted_by: {
    type: String,
    default: ''
  },
  created_from: {
    type: String,
    default: 'Website'
  },
  is_convertable: {
    type: Boolean,
    default: true
  },
  is_converted: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Pending'],
    default: 'Open'
  },
  updated_at: {
    type: Date
  }
});

module.exports = mongoose.model('BookingRequest', BookingRequestSchema);
