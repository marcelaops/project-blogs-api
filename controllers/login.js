const Login = require('../services/login');
const { ok } = require('../utils/dictionaryStatusCode');

// Req 2
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Login.login(email, password);

    return res.status(ok).json(user);
  } catch (error) {
    console.log(`POST - create login -> ${error.message}`);
    return next(error);
  }
};

module.exports = { login };