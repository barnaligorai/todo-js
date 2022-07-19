const cookieSession = require('cookie-session');
const express = require('express');
const { serveIndexPage } = require('./handlers/serveIndexPage');

const createApp = (config, logger) => {
  const { staticDir, session } = config;

  const app = express();
  app.use(logger);
  app.use(cookieSession(session));

  app.get('/', serveIndexPage);

  app.use(express.static(staticDir));

  app.use((req, res) => {
    res.status(404).send('Path not found');
  });

  return app;
}

module.exports = { createApp };
