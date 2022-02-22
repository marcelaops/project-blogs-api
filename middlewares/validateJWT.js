// // Req 3 projeto Cookmaster

// const jwt = require('jsonwebtoken');
// const { unauthorized } = require('../utils/dictionaryStatusCode');
// const User = require('../models');
// require('dotenv').config();

// const secret = process.env.JWT_SECRET;

// const validateJWT = async (req, res, next) => {
//   const token = req.headers.authorization;
//   // console.log('token validate', token); -> tá vindo ok

//   if (!token) return res.status(unauthorized).json({ message: 'missing auth token' });
  
//   try {
//     const decoded = jwt.verify(token, secret);
//     // console.log('validateJWT decoded', decoded);
//     // console.log('validateJWT decoded.email', decoded.email);

//     // const emailUser = decoded.data.email;
//     // console.log('emailUser Validate JWT', emailUser);

//     const user = await User.findByEmail(decoded.data.email);
//     req.user = user; // Ideia do colega José Breno pelo slack.

//     // console.log('user validateJWT', user);
    
//     if (!user) return res.status(unauthorized).json({ error: 'jwt malformed' });

//     return next();
//   } catch (error) {
//     console.log('error validate', error);
//     return res.status(unauthorized).json({ message: 'jwt malformed' });
//   }
// };

// module.exports = { validateJWT };