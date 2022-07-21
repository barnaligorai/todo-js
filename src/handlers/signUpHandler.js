const updateFile = (users, usersFile, fs) => {
  fs.writeFileSync(usersFile, JSON.stringify(users), 'utf8');
};

const signUpHandler = (users, usersFile, fs) => (req, res, next) => {
  const { name, password } = req.body;

  if (users[name]) {
    res.redirect('/sign-up?err=605');
    return;
  }

  users[name] = { name, password };

  updateFile(users, usersFile, fs);

  res.redirect(302, '/sign-up?err=606');
};

module.exports = { signUpHandler };
