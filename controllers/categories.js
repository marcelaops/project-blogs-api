const Category = require('../services/categories');

// Req 5
const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const { data, code } = await Category.create(name);
    return res.status(code).json(data);
  } catch (error) {
    console.log(`POST - create category-> ${error.message}`);
    return next(error);
  }
};

// Req 6
const getAll = async (req, res, next) => {
  try {
    const { data, code } = await Category.getAll();

    return res.status(code).json(data);
  } catch (error) {
    console.log(`GET - get all categories -> ${error.message}`);
    return next(error);
  }
};

module.exports = { 
  create,
  getAll,
};