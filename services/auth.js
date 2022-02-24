const jwt = require('jsonwebtoken');
const { unauthorized } = require('../utils/dictionaryStatusCode');
// const { User } = require('../models');

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
    // console.log('decoded', decoded);

    if (!decoded) return res.status(unauthorized).json({ message: 'Expired or invalid token' });
    // console.log('decoded.user.email', decoded.user.email)
    
    // const { email } = decoded.user;
    // console.log('decode.user auth', decoded.user);
    // console.log('email auth', email);

    // problema está  aqui
    // const user = await User.findOne({ where: { email } });
    // console.log('user auth', user);

    // req.user = user;
    req.user = decoded.user;
    // console.log('req.user veriFyToken', req.user);
    
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
