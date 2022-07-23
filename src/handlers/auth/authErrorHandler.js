const { indexPage } = require("../../views/indexPage");
const { loginPage } = require("../../views/loginPage");
const { signUpPage } = require("../../views/signUpPage");

const statusMessages = {
  601: 'Username doesn\'t exist',
  602: 'Invalid password',
  603: 'Username already exists',
};

const loginErrorHandler = (req, res) => {
  const { status } = req.query;
  const loginMessage = statusMessages[status];

  res.end(loginPage({ loginMessage }));
};

const signUpErrorHandler = (req, res) => {
  const { status } = req.query;
  const signUpMessage = statusMessages[status];

  res.end(signUpPage({ signUpMessage }));
};

module.exports = { loginErrorHandler, signUpErrorHandler };
