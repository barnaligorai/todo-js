const deleteItem = (items) => (req, res) => {
  const { itemId } = req.params;
  const deletedItem = items.remove(itemId);
  res.json({ deletedItem });
};

exports.deleteItem = deleteItem;
