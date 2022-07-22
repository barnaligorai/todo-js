const { indexPage } = require("../../views/indexPage");

const statusMessages = {
  601: 'Username doesn\'t exist',
  602: 'Invalid password',
  605: 'Username already exists',
  606: 'Successfully signed up'
};

const loginErrorHandler = (req, res) => {
  const { status } = req.query;
  const loginMessage = statusMessages[status];

  res.end(indexPage({ loginMessage }));
};

const signUpErrorHandler = (req, res) => {
  const { status } = req.query;
  const signUpMessage = statusMessages[status];

  res.end(indexPage({ signUpMessage }));
};

module.exports = { loginErrorHandler, signUpErrorHandler };
