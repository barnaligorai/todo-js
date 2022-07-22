const { indexPage } = require('../views/indexPage.js');

const serveIndexPage = (req, res) => {
  if (req.session.isNew) {
    res.type('html');
    res.end(indexPage({}));
    return;
  }

  res.redirect(302, '/home');
};

module.exports = { serveIndexPage };
