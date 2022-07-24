const createItem = (id, listId, task) => {
  return {
    id: 'i' + id,
    listId,
    task,
    done: false,
    createdOn: new Date().getTime()
  };
};

class Items {
  #id;
  #db;

  constructor({ items, id }) {
    this.#db = items;
    this.#id = id;
  }

  addItem(listId, task) {
    const item = createItem(this.#id, listId, task);
    this.#db[item.id] = item;
    this.#id++;
    return item;
  }

  getItems() {
    const items = this.#db;
    return { id: this.#id, items };
  }

  find(id) {
    return Object.values(this.#db).filter(({ listId }) => listId === id);
  }

  mark(taskId) {
    const task = this.#db[taskId];
    task.done = !task.done;
    return task.done ? 'done' : 'undone';
  }

  remove(taskId) {
    const task = this.#db[taskId];
    delete this.#db[taskId];
    return task;
  }

  updateTask(id, newTask) {
    const item = this.#db[id];
    const oldTask = item.task;
    item.task = newTask;
    return { id, oldTask, newTask };
  }
}

module.exports = { Items };
