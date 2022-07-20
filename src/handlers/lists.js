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
  constructor(lists) {
    this.#db = lists;
    this.#id = Object.keys(lists).length;
  }

  addList(title, createdBy) {
    const list = createList(this.#id, title, createdBy);
    this.#db[this.#id] = list;
    this.#id++;
    return list;
  }

  getLists() {
    return this.#db;
  }

  find(name) {
    return Object.values(this.#db).filter(({ createdBy }) =>
      createdBy === name);
  }

}

module.exports = { Lists };
