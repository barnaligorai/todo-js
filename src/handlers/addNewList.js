const { updateFile } = require('./signUpHandler.js');

const addNewList = (lists, listsFile, fs) => (req, res, next) => {
  const { title } = req.body;
  const { name } = req.session;
  const list = lists.addList(title, name);

  updateFile(lists.getLists(), listsFile, fs);

  res.json(list);
};

module.exports = { addNewList };
