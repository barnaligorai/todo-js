const createList = (id, title, createdBy) => {
  return {
    id: 'l' + id,
    title,
    createdBy,
    createdOn: new Date().getTime()
  };
};

class Lists {
  #db;
  #id;
  constructor({ id, lists }) {
    this.#db = lists;
    this.#id = id;
  }

  addList(title, createdBy) {
    const list = createList(this.#id, title, createdBy);
    this.#db[list.id] = list;
    this.#id++;
    return list;
  }

  getLists() {
    const lists = this.#db;
    return { id: this.#id, lists };
  }

  find(name) {
    return Object.values(this.#db).filter(({ createdBy }) =>
      createdBy === name);
  }

  remove(id) {
    const list = this.#db[id];
    delete this.#db[id];
    return list;
  }
}

module.exports = { Lists };
