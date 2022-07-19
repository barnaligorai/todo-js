const cookieSession = require('cookie-session');
const express = require('express');
const morgan = require('morgan');
const { serveStartPage } = require('./handlers/serveStartPage');

const createApp = (config) => {
  const { staticDir, session } = config;
  const app = express();
  app.use(morgan('tiny'));
  app.use(cookieSession(session));
  app.get('/', serveStartPage);

  app.use(express.static(staticDir));
  return app;
}

module.exports = { createApp };
