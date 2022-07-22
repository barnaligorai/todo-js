const { signUpErrorHandler, loginErrorHandler } = require('../handlers/auth/authErrorHandler.js');
const { newLogin } = require('../handlers/auth/loginHandler.js');
const { logout } = require('../handlers/auth/logout.js');
const { signUpHandler } = require('../handlers/auth/signUpHandler.js');

const alreadyLoggedIn = (req, res, next) => {
  if (!req.session.isNew) {
    res.redirect(302, '/home');
    return;
  }
  next();
};

const authRouter = (users, usersFile, fs) => {
  const router = require('express').Router();

  router.get('/logout', logout);

  router.get('/login', alreadyLoggedIn, loginErrorHandler);
  router.post('/login', alreadyLoggedIn, newLogin(users));

  router.get('/sign-up', alreadyLoggedIn, signUpErrorHandler);
  router.post('/sign-up', alreadyLoggedIn, signUpHandler(users, usersFile, fs));

  return router;
};

module.exports = { authRouter };
