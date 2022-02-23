const Post = require('../services/post');
const { created } = require('../utils/dictionaryStatusCode');

// Req 7
const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;
    // console.log('req.user.id post controller', req.user.id);
    // console.log('userId post controller', userId);

    const post = await Post.create(userId, title, content, categoryIds);
    return res.status(created).json(post);
  } catch (error) {
    console.log(`POST - create post-> ${error.message}`);
    return next(error);
  }
};

// Req 8
const getAll = async (req, res, next) => {
  try {
    const { code, data } = await Post.getAll();

    return res.status(code).json(data);
  } catch (error) {
    console.log(`GET - get all posts -> ${error.message}`);
    return next(error);
  }
};

// Req 9
const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, data } = await Post.findById(id);

    return res.status(code).json(data);
  } catch (error) {
    console.log(`GET - find post by id -> ${error}`);
    return next(error);
  }
};

module.exports = { 
  create,
  getAll,
  findById,
};