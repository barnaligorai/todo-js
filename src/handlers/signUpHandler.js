const signUpHandler = (users) => (req, res, next) => {
  const { name, password } = req.body;

  if (users[name]) {
    res.redirect('/sign-up?err=605');
    return;
  }

  users[name] = { name, password };
  res.redirect(302, '/sign-up?err=606');
};

module.exports = { signUpHandler };
