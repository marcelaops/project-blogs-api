const Joi = require('joi');
const ErrorConstructor = require('../utils/ErrorConstructor');
const { badRequest, created } = require('../utils/dictionaryStatusCode');
const { Category } = require('../models');

const nameSchema = Joi.object({
  name: Joi.required(),
});

// Req 5
const create = async (name) => {
  const { error } = nameSchema.validate({ name });
  // console.log('error service', error);

  if (error) throw new ErrorConstructor(badRequest, error.message);

  const data = await Category.create({ name });

  return { code: created, data };
};

module.exports = { create };