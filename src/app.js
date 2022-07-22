const cookieSession = require('cookie-session');
const express = require('express');

const { Lists } = require('./models/lists.js');
const { Items } = require('./models/items.js');
const { serveIndexPage } = require('./handlers/serveIndexPage.js');
const { serveHomePage } = require('./handlers/serveHomePage.js');
const { notFoundHandler } = require('./middlewares/notFoundHandler.js');
const { todoHandler } = require('./routes/todoRouter.js');
const { authRouter } = require('./routes/auth.js');

const readFile = (files, fs) => {
  const { usersFile, listsFile, itemsFile } = files;
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  const listsDb = JSON.parse(fs.readFileSync(listsFile, 'utf8'));
  const itemsDb = JSON.parse(fs.readFileSync(itemsFile, 'utf8'));
  return { users, listsDb, itemsDb };
};

const createApp = (config, logger, fs) => {
  const { staticDir, session, files } = config;

  const { users, listsDb, itemsDb } = readFile(files, fs);

  const lists = new Lists(listsDb);
  const items = new Items(itemsDb);

  const app = express();
  app.use(logger);
  app.use(cookieSession(session));
  app.use(express.raw());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', serveIndexPage);

  app.use(authRouter(users, files.usersFile, fs));

  app.use(['/list', '/item'], todoHandler(lists, items, files, fs));

  app.get('/home', serveHomePage);
  app.use(express.static(staticDir));
  app.use(notFoundHandler);

  return app;
};

module.exports = { createApp };
