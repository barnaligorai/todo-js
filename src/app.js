const cookieSession = require('cookie-session');
const express = require('express');

const { newLogin } = require('./handlers/loginHandler.js');
const { serveIndexPage } = require('./handlers/serveIndexPage.js');
const { signUpHandler } = require('./handlers/signUpHandler.js');
const { serveHomePage } = require('./handlers/serveHomePage.js');
const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { loginErrorHandler, signUpErrorHandler } = require('./handlers/authErrorHandler.js');
const { Lists } = require('./handlers/lists.js');
const { Items } = require('./handlers/items.js');
const { logout } = require('./handlers/logout.js');
const { todoHandler } = require('./handlers/todoRouter.js');

const alreadyLoggedIn = (req, res, next) => {
  if (!req.session.isNew) {
    res.redirect(302, '/home');
    return;
  }
  next();
};

const createApp = (config, logger) => {
  const { staticDir, session, users } = config;
  const itemsDb = {};
  const listsDb = {};

  const lists = new Lists(listsDb);
  const items = new Items(itemsDb);

  const app = express();
  app.use(logger);
  app.use(cookieSession(session));
  app.use(express.raw());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', serveIndexPage);

  app.get('/logout', logout);

  app.get('/login', alreadyLoggedIn, loginErrorHandler);
  app.post('/login', alreadyLoggedIn, newLogin(users));

  app.get('/sign-up', alreadyLoggedIn, signUpErrorHandler);
  app.post('/sign-up', alreadyLoggedIn, signUpHandler(users));

  app.use(['/list', '/item'], todoHandler(lists, items));

  app.get('/home', serveHomePage(lists, items));
  app.use(express.static(staticDir));
  app.use(notFoundHandler);

  return app;
};

module.exports = { createApp };
