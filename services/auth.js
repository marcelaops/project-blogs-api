const jwt = require('jsonwebtoken');
const { unauthorized } = require('../utils/dictionaryStatusCode');

require('dotenv').config();

const jwtConfig = {
  expiresIn: '20d',
  algorithm: 'HS256',
};

const generateToken = (user) => jwt.sign({ user }, process.env.JWT_SECRET, jwtConfig);

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('token auth', token);

  if (!token) return res.status(unauthorized).json({ message: 'Token not found' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    if (!decoded) return res.status(unauthorized).json({ message: 'Expired or invalid token' });
    // console.log('decoded')
    
    return next();
  } catch (error) {
    console.log('error verifyUserToken', error);
    return res.status(unauthorized).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
