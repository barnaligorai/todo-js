const { updateFile } = require('../../utils/updateFile.js');

const editTask = (items, itemsFile, fs) => (req, res) => {
  const { id, task } = req.body;
  const update = items.updateTask(id, task);
  updateFile(itemsFile, items.getItems(), fs);
  res.json(update);
};

module.exports = { editTask };
