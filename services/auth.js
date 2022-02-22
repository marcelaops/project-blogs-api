const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '20d',
  algorithm: 'HS256',
};

const generateToken = (user) => jwt.sign({ user }, process.env.JWT_SECRET, jwtConfig);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const { user } = decoded;
       return user;
  } catch (error) {
       return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
