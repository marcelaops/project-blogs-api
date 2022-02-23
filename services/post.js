const Joi = require('joi');
const ErrorConstructor = require('../utils/ErrorConstructor');
const { badRequest, ok, notFound, unauthorized } = require('../utils/dictionaryStatusCode');
const { BlogPost, Category, User } = require('../models');

const postSchema = Joi.object({
  title: Joi.required(),
  content: Joi.required(),
  categoryIds: Joi.required(),
});

// const removePostSchema = Joi.object({
//   title: Joi.required(),
//   content: Joi.required(),
// });

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

// Req 8 - Source: https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566
const getAll = async () => {
  const data = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });

  return { code: ok, data };
};

// Req 9
const findById = async (id) => {
  const data = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });

  if (!data) throw new ErrorConstructor(notFound, 'Post does not exist');

  return { code: ok, data };
};

// Req 10
// const update = async (id, title, content) => {
//   const data = await BlogPost.updateOne({ id, title, content });

//   return { code: ok, data };
// };

// Req 11
const remove = async (id, userId) => {
  const verifyPost = await BlogPost.findByPk(id);
  // console.log('verifyPost service post', verifyPost);
  // console.log('verifyPost.id service post', verifyPost.userId);

  if (!verifyPost) throw new ErrorConstructor(notFound, 'Post does not exist');

  const postId = verifyPost.userId;
  if (postId !== userId) throw new ErrorConstructor(unauthorized, 'Unauthorized user');

  await BlogPost.destroy({ where: { id } });
};

module.exports = { 
  create,
  getAll,
  findById,
  // update,
  remove,
};