const { indexPage } = require("./indexPage");

const errorMessage = (code) => {
  const messages = {
    601: 'Username doesn\'t exist',
    602: 'Invalid password',
    605: 'Username already exists',
    606: 'Successfully signed up'
  };
  return messages[code];
};

const loginErrorHandler = (req, res, next) => {
  const { err } = req.query;
  const message = errorMessage(err);
  res.end(indexPage('', message));
};

const signUpErrorHandler = (req, res, next) => {
  const { err } = req.query;
  const message = errorMessage(err);
  res.end(indexPage(message, ''));
};

module.exports = { loginErrorHandler, signUpErrorHandler };
