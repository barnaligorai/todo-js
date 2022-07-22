const { updateFile } = require('../../utils/updateFile.js');

const addNewList = (lists, listsFile, fs) => (req, res) => {
  const { title } = req.body;
  const { name } = req.session;
  const list = lists.addList(title, name);

  updateFile(listsFile, lists.getLists(), fs);

  res.json(list);
};

module.exports = { addNewList };
