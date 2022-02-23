const Joi = require('joi');
const ErrorConstructor = require('../utils/ErrorConstructor');
const { badRequest, created, ok } = require('../utils/dictionaryStatusCode');
const { Category } = require('../models');

const nameSchema = Joi.object({
  name: Joi.required(),
});

// Req 5
const create = async (name) => {
  const { error } = nameSchema.validate({ name });

  if (error) throw new ErrorConstructor(badRequest, error.message);

  const data = await Category.create({ name });

  return { code: created, data };
};

// Req 6
const getAll = async () => {
  const data = await Category.findAll();

  return { code: ok, data };
};

module.exports = { 
  create,
  getAll,
};