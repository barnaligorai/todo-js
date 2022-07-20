const markItem = (items) => (req, res) => {
  const { itemId } = req.params;
  const markedAs = items.mark(itemId);
  res.json({ markedAs });
};

exports.markItem = markItem;
