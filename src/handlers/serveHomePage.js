const { home } = require('../views/homePage.js');

const serveHomePage = (req, res) => {
  if (req.session.isNew) {
    res.redirect(302, '/');
    return;
  }

  res.end(home(req.session.name));
};

module.exports = { serveHomePage };
