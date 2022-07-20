const addNewItem = (items) => (req, res, next) => {
  const { id, task } = req.body;
  const item = items.addItem(id, task);
  res.json(item);
};

module.exports = { addNewItem };
