const express = require('express');
const { addNewItem } = require('./addNewItem');
const { addNewList } = require('./addNewList');
const { deleteItem } = require('./deleteItem');
const { deleteList } = require('./deleteList');
const { markItem } = require('./markItem');
const { serveLists } = require('./serveLists');

const auth = (req, res, next) => {
  if (req.session.isNew) {
    res.redirect(302, '/login');
    return;
  }
  next();
};

const todoHandler = (lists, items, { itemsFile, listsFile }, fs) => {
  const todoRouter = express.Router();
  todoRouter.use(auth);

  todoRouter.post('/add-item', addNewItem(items, itemsFile, fs));
  todoRouter.post('/markItem/:itemId', markItem(items, itemsFile, fs));
  todoRouter.post('/deleteItem/:itemId', deleteItem(items, itemsFile, fs));

  todoRouter.get('/all-lists', serveLists(lists, items));
  todoRouter.post('/add-list', addNewList(lists, listsFile, fs));
  todoRouter.post('/deleteList/:listId', deleteList(lists, listsFile, fs));

  return todoRouter;
};


module.exports = { todoHandler };
