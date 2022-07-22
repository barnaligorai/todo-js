const { updateFile } = require('../../utils/updateFile.js');

const deleteItem = (items, itemsFile, fs) => (req, res) => {
  const { itemId } = req.params;
  const deletedItem = items.remove(itemId);

  updateFile(itemsFile, items.getItems(), fs);

  res.json({ deletedItem });
};

exports.deleteItem = deleteItem;
