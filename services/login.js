const Joi = require('joi');
const jwt = require('jsonwebtoken');
const ErrorConstructor = require('../utils/ErrorConstructor');
const { badRequest } = require('../utils/dictionaryStatusCode');
const { User } = require('../models');
require('dotenv').config();

const loginSchema = Joi.object({
  email: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

// Tirei essa configuração aí de ixo do meu projeto Cookmaster
const jwtConfig = {
  expiresIn: '20d',
  algorithm: 'HS256',
};

// Req 2
const login = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw new ErrorConstructor(badRequest, error.message);

  const user = await User.findOne({ where: { email } });

  if (!user) throw new ErrorConstructor(badRequest, 'Invalid fields');
  
  // console.log('user login service', user);
  // console.log('user.dataValues login service', user.dataValues);

  const tokenGenerate = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);
  // console.log('token generate service', tokenGenerate);

  return { toke: tokenGenerate };
  // return user.dataValues;
};

module.exports = { login };