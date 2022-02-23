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
    console.log(`POST - create category-> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  create,
  // getAll,
};