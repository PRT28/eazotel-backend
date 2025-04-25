
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNum: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  role: {
    type: mongoose.Schema.Types.String,
    enum: ['hotelOwner', 'manager', 'staff'],
    required: true,
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', 
    required: true
  },
}, { timestamps: true });

const User = mongoose.model('hotel_users', userSchema);

module.exports = User;
