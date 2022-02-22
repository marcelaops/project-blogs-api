const Joi = require('joi');
const { User } = require('../models');
const ErrorConstructor = require('../utils/ErrorConstructor');
const { badRequest, conflict, ok, created } = require('../utils/dictionaryStatusCode');
const { generateToken } = require('./auth'); 

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

// Req 1
const create = async (displayName, email, password, image) => {
  const { error } = userSchema.validate({ displayName, email, password, image });
  // console.log('error service', error);

  if (error) throw new ErrorConstructor(badRequest, error.message);
  
  // A maneira que usei o findOne foi retirado do código do amigo Felipe: https://github.com/tryber/sd-013-c-project-blogs-api/pull/40
  const verifyEmail = await User.findOne({ where: { email } });
  // console.log('verifyEmail service', verifyEmail);

  if (verifyEmail) throw new ErrorConstructor(conflict, 'User already registered');

  // O findOne tem essa chave dataValue. Abaixo descosntrui ela para tirar a chave id dela e conseguir colocar dentro da variável data e 
  const { dataValues: { id } } = await User.create({ displayName, email, password, image });
  const data = { id, displayName, email, image };
  
  // Ajuda do colega Ricardo.
  // Função que gere o token á partir dos valores do req.body -> Para retornar no final da função create -> Isso tudo para depois conseguir desconstruir o id do token e colocar numa constante id, que se tornará  a userId da tabela BlogPosts.
  const token = generateToken(data); 
  // console.log('token service', token);

  return { code: created, data: { token } };
};

// Req 3
const getAll = async () => {
  const data = await User.findAll();

  return { code: ok, data };
};

module.exports = {
  create,
  getAll,
};