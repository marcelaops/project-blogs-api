const Post = require('../services/post');
const { created, noContent } = require('../utils/dictionaryStatusCode');

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

// Req 10
// const update = async (req, res, next) => {
//   try {
//     const { id: userId } = req.params;
//     const { title, content } = req.body;
//     const data = await Post.update(userId, title, content);

//     return res.status(ok).json(data);
//   } catch (error) {
//     console.log(`PUT - update post by id -> ${error.message}`);
//     return next(error);
//   }
// };

// Req 11
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    // console.log('userId controller post', id);

    await Post.remove(id, userId);

    return res.status(noContent).json();
  } catch (error) {
    console.log(`DELETE - delete post by id -> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  create,
  getAll,
  findById,
  // update,
  remove,
};