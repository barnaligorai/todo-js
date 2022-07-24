const { updateFile } = require('../../utils/updateFile.js');

const editListTitle = (lists, listsFile, fs) => (req, res) => {
  const { id, title } = req.body;
  const update = lists.updateTitle(id, title);
  updateFile(listsFile, lists.getLists(), fs);
  res.json(update);
};

module.exports = { editListTitle };
