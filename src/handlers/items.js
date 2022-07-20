const createItem = (id, listId, task) => {
  return {
    id,
    listId,
    task,
    done: false,
    createdOn: new Date().getTime()
  };
};

class Items {
  #id;
  #db;

  constructor(items) {
    this.#db = items;
    this.#id = Object.keys(items).length;
  }

  addItem(listId, task) {
    const item = createItem(this.#id, listId, task);
    this.#db[this.#id] = item;
    this.#id++;
  }

  getItems() {
    return this.#db;
  }

  find(id) {
    return Object.values(this.#db).filter(({ listId }) => listId === id);
  }
}

module.exports = { Items };
