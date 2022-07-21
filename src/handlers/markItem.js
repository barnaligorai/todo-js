const { updateFile } = require('./signUpHandler.js');

const markItem = (items, itemsFile, fs) => (req, res) => {
  const { itemId } = req.params;
  const markedAs = items.mark(itemId);

  updateFile(items.getItems(), itemsFile, fs);

  res.json({ markedAs });
};

exports.markItem = markItem;
