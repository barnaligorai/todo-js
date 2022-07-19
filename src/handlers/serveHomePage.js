const serveHomePage = (lists, items) => (req, res) => {
  if (req.session.isNew) {
    res.redirect('/');
    return;
  }

  res.end('home');
};

module.exports = { serveHomePage };
