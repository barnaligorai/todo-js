const cookieSession = require('cookie-session');
const express = require('express');

const { loginHandler } = require('./handlers/loginHandler');
const { serveIndexPage } = require('./handlers/serveIndexPage');
const { signUpHandler } = require('./handlers/signUpHandler');

const serveHomePage = (req, res) => {
  if (req.session.isNew) {
    res.redirect('/');
    return;
  }

  res.end('home');
};

const createApp = (config, logger) => {
  const { staticDir, session, users } = config;

  const app = express();
  app.use(logger);
  app.use(cookieSession(session));
  app.use(express.urlencoded({ extended: true }));

  app.get('/', serveIndexPage);
  app.get('/home', serveHomePage);

  app.post('/sign-up', signUpHandler(users));
  app.post('/login', loginHandler(users));

  app.use(express.static(staticDir));

  app.use((req, res) => {
    res.status(404).send('Path not found');
  });

  return app;
}

module.exports = { createApp };
