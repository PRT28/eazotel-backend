function generateUniqueOTP() {
  return otp = Math.floor(100000 + Math.random() * 900000).toString();;
}

module.exports = {
  generateUniqueOTP,
};
