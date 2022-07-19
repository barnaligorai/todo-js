
const cookieSession = require('cookie-session');
const express = require('express');

const { newLogin } = require('./handlers/loginHandler');
const { serveIndexPage } = require('./handlers/serveIndexPage');
const { signUpHandler } = require('./handlers/signUpHandler');
const { serveHomePage } = require('./handlers/serveHomePage.js');
const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { loginErrorHandler, signUpErrorHandler } = require('./handlers/authErrorHandler');

const alreadyLoggedIn = (req, res, next) => {
  if (!req.session.isNew) {
    res.redirect(302, '/home');
    return;
  }
  next();
};

const createApp = (config, logger) => {
  const { staticDir, session, users } = config;
  const listsDb = {};
  const itemsDb = {};

  const app = express();
  app.use(logger);
  app.use(cookieSession(session));
  app.use(express.raw());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', serveIndexPage);
  app.get('/home', serveHomePage(listsDb, itemsDb));

  app.use(alreadyLoggedIn);

  app.get('/login', loginErrorHandler);
  app.get('/sign-up', signUpErrorHandler);
  app.post('/login', newLogin(users));
  app.post('/sign-up', signUpHandler(users));

  app.use(express.static(staticDir));

  app.use(notFoundHandler);

  return app;
}

module.exports = { createApp };
