const deleteList = (lists) => (req, res) => {
  const deletedList = lists.remove(req.params.listId);
  res.json({ deletedList });

  // delete items of that particular list
};

module.exports = { deleteList };