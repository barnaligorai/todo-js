const serveStartPage = (req, res, next) => {
  if (!req.session.isNew) {
    res.redirect('/home');
    return;
  }
  next();
};

module.exports = { serveStartPage };
