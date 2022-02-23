const Joi = require('joi');
const { User } = require('../models');
const ErrorConstructor = require('../utils/ErrorConstructor');
const { badRequest, conflict, ok, created, notFound } = require('../utils/dictionaryStatusCode');
const { generateToken } = require('./auth'); 

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

// Req 1 - Ajuda dos colega Ricardo
const create = async (displayName, email, password, image) => {
  const { error } = userSchema.validate({ displayName, email, password, image });
  // console.log('error service', error);

  if (error) throw new ErrorConstructor(badRequest, error.message);
  
  // A maneira que usei o findOne foi retirado do código do amigo Felipe: https://github.com/tryber/sd-013-c-project-blogs-api/pull/40
  const verifyEmail = await User.findOne({ where: { email } });
  // console.log('verifyEmail service', verifyEmail);

  if (verifyEmail) throw new ErrorConstructor(conflict, 'User already registered');

  const { dataValues: { id } } = await User.create({ displayName, email, password, image });
  const data = { id, displayName, email, image };
  
  const token = generateToken(data); 
  // console.log('token service', token);

  return { code: created, data: { token } };
};

// Req 3
const getAll = async () => {
  const data = await User.findAll();

  return { code: ok, data };
};

// Req 4
const findById = async (id) => {
  const data = await User.findOne({ where: { id } });

  if (!data) throw new ErrorConstructor(notFound, 'User does not exist');
  // console.log('data findById service user', data);

  return { code: ok, data };
};

// Req 12
// const remove = async (id) => {
//   await User.destroy({ where: { id } });

//   return true;
// };

module.exports = {
  create,
  getAll,
  findById,
  // remove,
};