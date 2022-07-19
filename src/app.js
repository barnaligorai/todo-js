const cookieSession = require('cookie-session');
const express = require('express');
const { serveIndexPage } = require('./handlers/serveIndexPage');
const { signUpHandler } = require('./handlers/signUpHandler');

const createApp = (config, logger) => {
  const { staticDir, session, users } = config;

  const app = express();
  app.use(logger);
  app.use(cookieSession(session));
  app.use(express.urlencoded({ extended: true }));

  app.get('/', serveIndexPage);

  app.post('/sign-up', signUpHandler(users));

  app.use(express.static(staticDir));

  app.use((req, res) => {
    res.status(404).send('Path not found');
  });

  return app;
}

module.exports = { createApp };
