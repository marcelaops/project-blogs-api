const jwt = require('jsonwebtoken');
const { unauthorized } = require('../utils/dictionaryStatusCode');
// const User = require('../models');

require('dotenv').config();

const jwtConfig = {
  expiresIn: '20d',
  algorithm: 'HS256',
};

const generateToken = (user) => jwt.sign({ user }, process.env.JWT_SECRET, jwtConfig);

// const verifyToken = (token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//        const { user } = decoded;
//        return user;
//   } catch (error) {
//        return null;
//   }
// };

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('token auth', token);

  if (!token) return res.status(unauthorized).json({ message: 'Token not found' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('decoded auth', decoded);sss
    // console.log('decoded.user  auth', decoded.user);

    // const userEmail = decoded.user.email;
    // console.log('userEmail auth', userEmail);

    // console.log('User model em auth', User);

    // const user = await User.findOne({ where: { email: userEmail } }); 
    // console.log('user auth', user);

    // req.user = user;

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
