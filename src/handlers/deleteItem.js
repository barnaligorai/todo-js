const { updateFile } = require('./signUpHandler.js');

const deleteItem = (items, itemsFile, fs) => (req, res) => {
  const { itemId } = req.params;
  const deletedItem = items.remove(itemId);

  updateFile(items.getItems(), itemsFile, fs);

  res.json({ deletedItem });
};

exports.deleteItem = deleteItem;
