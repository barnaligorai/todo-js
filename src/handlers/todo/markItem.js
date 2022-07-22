const { updateFile } = require('../../utils/updateFile.js');

const markItem = (items, itemsFile, fs) => (req, res) => {
  const { itemId } = req.params;
  const markedAs = items.mark(itemId);

  updateFile(itemsFile, items.getItems(), fs);

  res.json({ markedAs });
};

exports.markItem = markItem;
