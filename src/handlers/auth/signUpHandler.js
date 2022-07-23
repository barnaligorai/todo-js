const { updateFile } = require('../../utils/updateFile.js');

const signUpHandler = (users, usersFile, fs) => (req, res) => {
  const { name, password } = req.body;

  if (users[name]) {
    res.redirect('/sign-up?status=603');
    return;
  }

  users[name] = { name, password };
  updateFile(usersFile, users, fs);

  res.redirect(302, '/login');
};

module.exports = { signUpHandler };
