const express = require('express');
const { addNewItem } = require('../handlers/todo/addNewItem');
const { addNewList } = require('../handlers/todo/addNewList');
const { deleteItem } = require('../handlers/todo/deleteItem');
const { deleteList } = require('../handlers/todo/deleteList');
const { markItem } = require('../handlers/todo/markItem');
const { serveLists } = require('../handlers/todo/serveLists');
const { editListTitle } = require('../handlers/todo/editListTitle.js');

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
  todoRouter.post('/edit-title', editListTitle(lists, listsFile, fs));
  todoRouter.post('/add-list', addNewList(lists, listsFile, fs));
  todoRouter.post('/deleteList/:listId', deleteList(lists, listsFile, fs));

  return todoRouter;
};

module.exports = { todoHandler };
