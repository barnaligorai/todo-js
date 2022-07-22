const serveLists = (lists, items) => (req, res) => {
  const { name } = req.session;
  const allLists = lists.find(name);
  const allItems = [];

  allLists.forEach(list => {
    const { id, title } = list;
    const tasks = items.find(id);
    const item = { title, id, tasks };
    allItems.push(item);
  });

  res.json(allItems);
};

module.exports = { serveLists };
