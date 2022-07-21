const { updateFile } = require("./signUpHandler");

const addNewItem = (items, itemsFile, fs) => (req, res, next) => {
  const { id, task } = req.body;
  const item = items.addItem(id, task);

  updateFile(items.getItems(), itemsFile, fs);

  res.json(item);
};

module.exports = { addNewItem };
