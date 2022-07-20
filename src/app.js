const cookieSession = require('cookie-session');
const express = require('express');

const { newLogin } = require('./handlers/loginHandler');
const { serveIndexPage } = require('./handlers/serveIndexPage');
const { signUpHandler } = require('./handlers/signUpHandler');
const { serveHomePage } = require('./handlers/serveHomePage.js');
const { notFoundHandler } = require('./handlers/notFoundHandler.js');
const { loginErrorHandler, signUpErrorHandler } = require('./handlers/authErrorHandler');
const { Lists } = require('./handlers/lists');
const { Items } = require('./handlers/items');
const { addNewList } = require('./handlers/addNewList');
const { serveLists } = require('./handlers/serveLists');
const { logout } = require('./handlers/logout');


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
  app.get('/sign-up', alreadyLoggedIn, signUpErrorHandler);
  app.post('/login', alreadyLoggedIn, newLogin(users));
  app.post('/sign-up', alreadyLoggedIn, signUpHandler(users));

  app.get('/home/all-lists', serveLists(lists, items));

  app.get('/home', serveHomePage(lists, items));

  app.post('/add-list', addNewList(lists));

  app.use(express.static(staticDir));

  app.use(notFoundHandler);

  return app;
}

module.exports = { createApp };
