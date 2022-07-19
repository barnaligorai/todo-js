const signUpHandler = (users) => (req, res, next) => {
  if (!req.session.isNew) {
    res.redirect('/home');
    return;
  }

  const { name, password } = req.body;

  if (users[name]) {
    res.status(409).send({ status: 'Already Exists' });
    return;
  }

  users[name] = { name, password };
  res.status(200).send({ status: 'success' });
};

module.exports = { signUpHandler };
