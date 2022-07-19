const loginHandler = (users) => (req, res, next) => {
  if (!req.session.isNew) {
    res.status(200).send({ message: "Already logged in" });
    return;
  }

  const { name, password } = req.body;
  if (!users[name]) {
    res.status(404).send({ message: 'Username doesn\'t exists' });
    return;
  }

  if (users[name].password !== password) {
    res.status(401).send({ message: 'Username doesn\'t exists' });
    return;
  }

  req.session.name = name;
  res.status(200).send({ message: "Successfully logged in" });
};
module.exports = { loginHandler };
