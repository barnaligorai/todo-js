class Lists {
  constructor(lists) {
    this.lists = lists;
  }

  #filter(lists, filterBy) {
    if (filterBy === 'all') {
      return lists;
    }

    const filteredList = [];
    const status = filterBy === 'done';
    lists.forEach(list => {
      const { id, title, tasks } = list;
      const items = tasks.filter(task => task.done === status);
      if (items.length > 0) filteredList.push({ id, title, tasks: items });
    });

    return filteredList;
  }

  searchListsWith(text, filterBy) {
    let lists = this.lists.slice(0);

    if (text) {
      lists = this.lists.filter(({ title }) =>
        title.toLowerCase().includes(text.toLowerCase()));
    }

    return this.#filter(lists, filterBy);
  }

  searchItemsWith(text, filterBy) {
    let lists = this.lists.slice(0);

    if (text) {
      lists = [];
      this.lists.forEach(list => {
        const { id, title, tasks } = list;
        const items = tasks.filter(({ task }) =>
          task.toLowerCase().includes(text.toLowerCase()));

        if (items.length > 0) lists.push({ id, title, tasks: items });
      });
    }

    return this.#filter(lists, filterBy);
  }

  getAll() {
    return this.lists;
  }
}

const search = () => {
  const req = {
    url: '/list/all-lists',
    method: 'GET'
  };

  sendRequest(req, (status, res) => {
    if (status !== 200) {
      console.log('something went wrong.');
      return;
    }

    dataStore = new Lists(JSON.parse(res));

    const searchForm = document.querySelector('.search-form');
    const formData = new FormData(searchForm);
    const query = formData.get('query');
    const searchFor = formData.get('search-for');
    const filterBy = formData.get('filter-by');

    if (searchFor === 'list') {
      renderLists(dataStore.searchListsWith(query, filterBy).reverse());
      return;
    }

    if (searchFor === 'task') {
      renderLists(dataStore.searchItemsWith(query, filterBy).reverse());
      return;
    }
  });
};

const enableSearch = () => {
  const searchForm = document.querySelector('.search-form');

  const searchList = searchForm.querySelector('.search-options');
  const filterList = searchForm.querySelector('.filter');

  searchForm.onsubmit = (event) => {
    event.preventDefault();
    search();
  };

  searchList.onchange = search;
  filterList.onchange = search;
  searchForm.onkeydown = search;
};

let dataStore;
