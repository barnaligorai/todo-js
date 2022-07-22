const logout = (req, res) => {
  req.session = null;
  res.redirect(302, '/');
};

module.exports = { logout };
