const addNewList = (lists) => (req, res, next) => {
  if (req.session.isNew) {
    res.redirect(302, '/');
    return;
  }

  const { title } = req.body;
  const { name } = req.session;
  const list = lists.addList(title, name);
  res.json(list);
};

module.exports = { addNewList };
