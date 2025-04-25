const jwt = require('jsonwebtoken');

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '100y' });
};

module.exports = { createToken };
