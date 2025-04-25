const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  state: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  zipCode: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  phone: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Hotel = mongoose.model('hotels', hotelSchema);

module.exports = Hotel;
