const { updateFile } = require('./signUpHandler.js');

const deleteList = (lists, listsFile, fs) => (req, res) => {
  const deletedList = lists.remove(req.params.listId);

  updateFile(lists.getLists(), listsFile, fs);

  res.json({ deletedList });

  // delete items of that particular list
};

module.exports = { deleteList };