const Joi = require('joi');
const ErrorConstructor = require('../utils/ErrorConstructor');
const { badRequest } = require('../utils/dictionaryStatusCode');
const { User } = require('../models');
const { generateToken } = require('./auth'); 

require('dotenv').config();

const loginSchema = Joi.object({
  email: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

// Req 2
const login = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw new ErrorConstructor(badRequest, error.message);

  const user = await User.findOne({ where: { email } });

  if (!user) throw new ErrorConstructor(badRequest, 'Invalid fields');
  
  // console.log('user login service', user);
  // console.log('user.dataValues login service', user.dataValues);

  const tokenGenerate = generateToken({ data: user }); 
  // console.log('token generate service', tokenGenerate)

  return { toke: tokenGenerate };
};

module.exports = { login };