const serveHomePage = (req, res, next) => {
  if (req.session.isNew) {
    res.redirect(302, '/');
    return;
  }

  req.url = '/home.html';
  next();
};

module.exports = { serveHomePage };
