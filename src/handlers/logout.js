const logout = (req, res, next) => {
  req.session = null;
  res.redirect(302, '/');
};

module.exports = { logout };
