const User = require('../services/user');
const { unauthorized, noContent } = require('../utils/dictionaryStatusCode');

// Req 1
const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    // console.log('req.body controller', req.body);

    const { data, code } = await User.create(displayName, email, password, image);
    return res.status(code).json(data);
  } catch (error) {
    console.log(`POST - create user-> ${error.message}`);
    return next(error);
  }
};

// Req 3
const getAll = async (req, res, next) => {
  try {
    const { data, code } = await User.getAll();
    // console.log('code getAll controller', code);
    // console.log('data getAll controller', data);

    return res.status(code).json(data);
  } catch (error) {
    console.log(`GET - get all users -> ${error.message}`);
    return next(error);
  }
};

// Req 4
const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, code } = await User.findById(id);

    const token = req.headers.authorization;
    if (!token) return res.status(unauthorized).json({ message: 'Token not found' });

    return res.status(code).json(data);
  } catch (error) {
    console.log(`GET - find user by id -> ${error.message}`);
    return next(error);
  }
};

// Req 12
const remove = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    await User.remove(userId);

    return res.status(noContent).json();
  } catch (error) {
    console.log(`DELETE - delete user me -> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  create,
  getAll,
  findById,
  remove,
};