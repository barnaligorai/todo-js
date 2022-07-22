const { updateFile } = require('../../utils/updateFile.js');

const signUpHandler = (users, usersFile, fs) => (req, res, next) => {
  const { name, password } = req.body;

  if (users[name]) {
    res.redirect('/sign-up?status=605');
    return;
  }

  users[name] = { name, password };

  updateFile(usersFile, users, fs);

  res.redirect(302, '/sign-up?status=606');
};

module.exports = { signUpHandler };
