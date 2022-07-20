const { indexPage } = require('./indexPage.js');

const serveIndexPage = (req, res, next) => {
  if (!req.session.isNew) {
    res.redirect(302, '/home');
    return;
  }

  res.type('html');
  res.end(indexPage());
};

module.exports = { serveIndexPage };
