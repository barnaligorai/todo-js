const { updateFile } = require('../../utils/updateFile.js');

const addNewItem = (items, itemsFile, fs) => (req, res, next) => {
  const { id, task } = req.body;
  const item = items.addItem(id, task);

  updateFile(itemsFile, items.getItems(), fs);

  res.json(item);
};

module.exports = { addNewItem };
