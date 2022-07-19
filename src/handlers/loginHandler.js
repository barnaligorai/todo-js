const newLogin = (users) => (req, res, next) => {
  const { name, password } = req.body;
  if (!users[name]) {
    res.redirect(302, '/login?err=601');
    return;
  }

  if (users[name].password !== password) {
    res.redirect(302, '/login?err=602');
    return;
  }

  req.session.name = name;
  res.redirect(302, '/home');
};

module.exports = { newLogin };
