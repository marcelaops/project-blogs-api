const Joi = require('joi');
const ErrorConstructor = require('../utils/ErrorConstructor');
const { badRequest, ok } = require('../utils/dictionaryStatusCode');
const { BlogPost, Category, User } = require('../models');

const postSchema = Joi.object({
  title: Joi.required(),
  content: Joi.required(),
  categoryIds: Joi.required(),
});

// Req 7 - Ajuda monitor Eric
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

// Req 8 - reference: https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566
const getAll = async () => {
  const data = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });

  return { code: ok, data };
};

module.exports = { 
  create,
  getAll,
};