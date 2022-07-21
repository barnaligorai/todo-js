const addNewList = (lists) => (req, res, next) => {
  const { title } = req.body;
  const { name } = req.session;
  const list = lists.addList(title, name);
  res.json(list);
};

module.exports = { addNewList };
