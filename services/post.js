const Joi = require('joi');
// const { Op } = require('sequelize');
const ErrorConstructor = require('../utils/ErrorConstructor');
const { badRequest } = require('../utils/dictionaryStatusCode');
const { BlogPost, Category } = require('../models');

const postSchema = Joi.object({
  title: Joi.required(),
  content: Joi.required(),
  categoryIds: Joi.required(),
});

// Req 7
const create = async (userId, title, content, categoryIds) => {
  const { error } = postSchema.validate({ title, content, categoryIds });

  if (error) throw new ErrorConstructor(badRequest, error.message);

  const verifyCategory = await Promise.all(categoryIds.map((id) => Category.findByPk(id)));
  // console.log('verifyCategory', verifyCategory);

  const nonExistingCategory = verifyCategory.some((category) => !category);
  // console.log('someCategoryNotExist ', someCategoryNotExist);

  if (nonExistingCategory) {
    throw new ErrorConstructor(badRequest, '"categoryIds" not found');
  }

  const data = await BlogPost.create({ userId, title, content, categoryIds });
  // console.log('data post service', data);

  return data;
};

module.exports = { 
  create,
  // getAll
};