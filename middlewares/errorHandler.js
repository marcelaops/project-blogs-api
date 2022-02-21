const { serverError } = require('../utils/dictionaryStatusCode');
const ErrorConstructor = require('../utils/ErrorConstructor');

module.exports = (error, _req, res, _next) => {
  if (error instanceof ErrorConstructor) {
    // console.log('error instanceof', error);
    return res.status(error.status).json({ message: error.message });
  }

  console.error('error middleware', error);
  return res.status(serverError).json({ message: 'Internal Server Error' });
};