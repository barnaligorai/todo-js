const deleteList = (lists) => (req, res) => {
  const deleted = lists.remove(req.params.listId);
  res.json({ deleted });

  // delete items of that particular list
};

module.exports = { deleteList };