const serveIndexPage = (req, res, next) => {
  if (!req.session.isNew) {
    res.redirect(302, '/home');
    return;
  }

  next();
};

module.exports = { serveIndexPage };
