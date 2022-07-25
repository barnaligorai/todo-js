class Lists {
  constructor(lists) {
    this.lists = lists;
  }

  searchListsWith(text) {
    let lists = this.lists.slice(0);
    if (text) {
      lists = this.lists.filter(({ title }) =>
        title.toLowerCase().includes(text.toLowerCase()));
    }
    return lists;
  }

  searchItemsWith(text) {
    let lists = this.lists.slice(0);

    if (text) {
      lists = [];
      this.lists.forEach(list => {
        const { id, title, tasks } = list;
        const items = tasks.filter(({ task }) => {
          return task.toLowerCase().includes(text.toLowerCase());
        });

        if (items.length > 0) lists.push({ id, title, tasks: items });
      });
    }

    return lists;
  }

  getAll() {
    return this.lists;
  }
}

const showListsWith = (query) => {
  const lists = dataStore.searchListsWith(query);
  renderLists(lists.reverse());
};

const showItemsWith = (query) => {
  const lists = dataStore.searchItemsWith(query);
  renderLists(lists.reverse());
};

const search = (searchForm) => {
  const req = {
    url: '/list/all-lists',
    method: 'GET'
  };

  sendRequest(req, (status, res) => {
    dataStore = new Lists(JSON.parse(res));

    const formData = new FormData(searchForm);
    const query = formData.get('query');
    const searchFor = formData.get('search-for');

    if (searchFor === 'list') {
      showListsWith(query);
      return;
    }

    if (searchFor === 'task') {
      showItemsWith(query);
      return;
    }
  });
};

const enableSearch = () => {
  const searchForm = document.querySelector('.search-form');
  searchForm.onsubmit = (event) => {
    event.preventDefault();
    search(searchForm);
  }
};

let dataStore;
