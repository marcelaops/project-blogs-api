// const { created } = require('../utils/dictionaryStatusCode');

const User = require('../services/user');

// Req 1
const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    // console.log('req.body controller', req.body);

    // const user = await User.create(displayName, email, password, image);
    // console.log('user controller', user);

    const { data, code } = await User.create(displayName, email, password, image);
    return res.status(code).json(data);
  } catch (error) {
    // console.log('error controler', error);
    console.log(`POST - create user -> ${error}`);
    return next(error);
  }
};

module.exports = { create };