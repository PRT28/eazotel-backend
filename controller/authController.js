
const { default: axios } = require('axios');
const User = require('../models/User');
const { createToken } = require('../utils/jwt');
const Hotel = require('../models/Hotel');

const otpLessHeaders = headers = {
    "clientId": process.env.CLIENT_ID,
    "clientSecret": process.env.CLIENT_SECRET,
    "Content-Type": "application/json",
}

const sendOtp = async (req, res) => {
  try {
    const {phoneNumber, phoneCode} = req.body;
    if (!(phoneNumber || phoneCode)) {
      return res.status(400).json({ message: 'Phone number and phone code are required' });
    }
    const otpLessBody = {
        phoneNumber: phoneCode + phoneNumber,
        channel: "SMS",
        otpLength: 6,
        expiry: 60
    }
    
   axios.post("https://auth.otpless.app/auth/otp/v1/send", otpLessBody, { headers: otpLessHeaders })
    .then(response => {
        res.status(200).json({
            message: 'OTP sent successfully',
            data: response.data
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error sending OTP',
            error: error.message
        })
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const verifyOtp = async (req, res) => {
    try{
    const {requestId, otp, phoneNumber, phoneCode} = req.body;
    if (!(requestId || otp)) {
      return res.status(400).json({ message: 'RequestID and OTP are required' });
    }
    
   axios.post("https://auth.otpless.app/auth/otp/v1/send", {
    requestId,
    otp
   }, { headers: otpLessHeaders })
    .then(response => {

        User.findOne({
            phoneNum: phoneCode + phoneNumber
        })
        .then(user => {
            if (user) {
                const token = createToken(user);

                res.status(200).json({
                    message: 'OTP verified successfully',
                    data: response.data,
                    token: token,
                    user: user,
                    success: true
                })
            } else {

                res.status(200).json({
                    message: 'OTP verified successfully',
                    data: response.data,
                    token: null,
                    user: null,
                    success: true
                })
                
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error finding user',
                error: error.message,
                success: false
            })
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error validating OTP',
            error: error.message,
            success: false
        })
    })
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

const createNewHotel = async (req, res) => {
    try {
        const {name, address, city, state, country, zipCode, phone, email} = req.body;
        if (!(name || address || city || state || country || zipCode || phone || email)) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        const hotel = await Hotel.create({
            name,
            address,
            city,
            state,
            country,
            zipCode,
            phone,
            email
        })
        if (hotel) {
            res.status(200).json({
                message: 'Hotel created successfully',
                data: hotel,
                success: true
            })
        } else {
            res.status(400).json({
                message: 'Error creating hotel',
                success: false
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message, success: false });
    }
}

module.exports = { sendOtp, verifyOtp, createNewUser, listAllHotels, createNewHotel };
