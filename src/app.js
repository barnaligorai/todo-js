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
  // const itemsDb = {};
  // const listsDb = {};
  const listsDb = {
    0: {
      id: 0,
      title: 'shopping',
      createdBy: 'bani',
      createdOn: '1/1/1'
    },
    1: {
      id: 1,
      title: 'shopping',
      createdBy: 'sourav',
      createdOn: '1/1/1'
    },
    2: {
      id: 2,
      title: 'medicine',
      createdBy: 'sourav',
      createdOn: '1/1/1'
    }
  };
  const itemsDb = {
    0: {
      id: 0,
      listId: 0,
      task: 'a',
      createdOn: '1/2/3',
      done: true
    },
    1: {
      id: 1,
      listId: 0,
      task: 'b',
      createdOn: '1/2/3',
      done: false
    },
    2: {
      id: 2,
      listId: 1,
      task: 'c',
      createdOn: '1/2/3',
      done: false
    },
    3: {
      id: 3,
      listId: 2,
      task: 'd',
      createdOn: '1/2/3',
      done: false
    }
  };

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
