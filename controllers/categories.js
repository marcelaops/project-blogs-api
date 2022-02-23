const Category = require('../services/categories');

// Req 5
const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    // console.log('req.body controller', req.body);

    const { data, code } = await Category.create(name);
    return res.status(code).json(data);
  } catch (error) {
    console.log(`POST - create category-> ${error.message}`);
    return next(error);
  }
};

module.exports = { create };