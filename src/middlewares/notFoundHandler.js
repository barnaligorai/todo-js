const notFoundHandler = (req, res) => {
  res.status(404).send('Path not found, go to <a href="/">home</a>');
};

module.exports = { notFoundHandler };
