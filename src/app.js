const cookieSession = require('cookie-session');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const { Lists } = require('./models/lists.js');
const { Items } = require('./models/items.js');
const { serveHomePage } = require('./handlers/serveHomePage.js');
const { notFoundHandler } = require('./middlewares/notFoundHandler.js');
const { todoHandler } = require('./routes/todoRouter.js');
const { authRouter } = require('./routes/auth.js');

const readFiles = (files, fs) => {
  const { usersFile, listsFile, itemsFile } = files;

  const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  const listsDb = JSON.parse(fs.readFileSync(listsFile, 'utf8'));
  const itemsDb = JSON.parse(fs.readFileSync(itemsFile, 'utf8'));

  return { users, listsDb, itemsDb };
};

const createApp = (config, logger, fs) => {
  const { staticDir, session, files } = config;

  const { users, listsDb, itemsDb } = readFiles(files, fs);

  const lists = new Lists(listsDb);
  const items = new Items(itemsDb);

  const app = express();

  app.use(logger);
  app.use(favicon(path.join('public/favicon', 'favicon.ico')));
  app.use(cookieSession(session));
  app.use(express.raw());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get(['/', '/home'], serveHomePage);

  app.use(authRouter(users, files.usersFile, fs));

  app.use(['/list', '/item'], todoHandler(lists, items, files, fs));

  app.use(express.static(staticDir));
  app.use(notFoundHandler);

  return app;
};

module.exports = { createApp };
