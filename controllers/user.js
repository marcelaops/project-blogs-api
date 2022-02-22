const User = require('../services/user');

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
    console.log(`GET - get all recipes -> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  create,
  getAll,
};