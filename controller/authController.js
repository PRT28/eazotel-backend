
const { default: axios } = require('axios');
const User = require('../models/User');
const { createToken } = require('../utils/jwt');
const Hotel = require('../models/Hotel');
const { twilio } = require('../utils/twilio');

const currentOtps = {}

const sendOtp = async (req, res) => {
  try {
    const {phoneNumber, phoneCode} = req.body;
    if (!(phoneNumber || phoneCode)) {
      return res.status(400).json({ message: 'Phone number and phone code are required' });
    }

    const otp = generateUniqueOTP();
    twilio.messages
    .create({
      body: `Your OTP is: ${otp}`,
      to: `+${phoneCode}${phoneNumber}`, // Text your number
      from: process.env.TWILIO_NUMBER, // From a valid Twilio number
    })
    .then((message) => {
        currentOtps[phoneNumber] = otp;
        res.status(200).json({
            message: 'OTP sent successfully',
            data: response.data,
            sid: message.sid
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error sending OTP',
            error: error.message
        })
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const verifyOtp = async (req, res) => {
    try{
    const { otp, phoneNumber, phoneCode} = req.body;
    if (!( otp || phoneNumber || phoneCode )) {
      return res.status(400).json({ message: 'Phone Number and OTP are required' });
    }
    if (currentOtps[phoneNumber] === otp) {
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message, success: false });
  }
};

const createNewUser = async (req, res) => {
    try {
        const {name, phoneNum, email, role, hotelId} = req.body;
        if (!(name || phoneNum || email || role || hotelId)) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.create({
            name,
            phoneNum,
            email,
            role,
            hotelId
        })
        if (user) {
            const token = createToken(user);
            res.status(200).json({
                message: 'User created successfully',
                data: user,
                token: token,
                success: true
            })
        } else {
            res.status(400).json({
                message: 'Error creating user',
                success: false
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message, success: false });
    }
}

const listAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        if (hotels) {
            res.status(200).json({
                message: 'Hotels fetched successfully',
                data: hotels,
                success: true
            })
        } else {
            res.status(400).json({
                message: 'Error fetching hotels',
                success: false
            })
        }
    } catch (error) {
        console.error(error);  
        res.status(500).json({ message: 'Internal server error', error: error.message, success: false });
    }
}


module.exports = { sendOtp, verifyOtp, createNewUser, listAllHotels };
