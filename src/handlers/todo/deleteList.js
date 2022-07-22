const { updateFile } = require('../../utils/updateFile.js');

const deleteList = (lists, listsFile, fs) => (req, res) => {
  const deletedList = lists.remove(req.params.listId);

  updateFile(listsFile, lists.getLists(), fs);

  res.json({ deletedList });

  // delete items of that particular list
};

module.exports = { deleteList };