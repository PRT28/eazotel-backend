const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, createNewUser, listAllHotels, createNewHotel} = require('../controller/authController');

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/user/create', createNewUser);
router.get('/hotels/list', listAllHotels);

module.exports = router;
