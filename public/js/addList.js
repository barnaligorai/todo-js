const sendRequest = ({ method, url, body = '', headers = [] }, callBack) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => callBack(xhr.status, xhr.response);
  xhr.open(method, url);

  headers.forEach(({ header, value }) => {
    xhr.setRequestHeader(header, value);
  });

  xhr.send(body);
};

const displayNewAddedList = (status, res) => {
  if (status !== 200) {
    console.log('error');
    return;
  }
  const { id, title } = JSON.parse(res);
  const newList = createList(id, title, []);
  const lists = document.querySelector('.lists');
  lists.prepend(newList);
  newList.querySelector('input').focus();
};

const newListReq = () => {
  const formElement = document.querySelector('#add-list');
  const formData = new FormData(formElement);
  const title = formData.get('title');
  const body = { title };

  const req = {
    url: '/list/add-list',
    method: 'POST',
    headers: [{ header: 'content-type', value: 'application/json' }],
    body: JSON.stringify(body)
  };
  sendRequest(req, displayNewAddedList);
  formElement.reset();
};

const addNewList = () => {
  const form = document.querySelector('#add-list');
  form.onsubmit = (event) => {
    event.preventDefault();
    newListReq();
  };
};

const renderLists = (lists) => {
  const listsElement = document.querySelector('.lists');
  listsElement.replaceChildren();

  lists.forEach(({ id, title, tasks }) => {
    const list = createList(id, title, tasks);
    listsElement.appendChild(list);
  });
};

const generateHomePage = (status, res) => {
  if (status !== 200) {
    console.log('Something went wrong');
    return;
  }
  renderLists(JSON.parse(res).reverse());
};

const generateAllLists = () => {
  const req = {
    url: '/list/all-lists',
    method: 'GET'
  };

  sendRequest(req, generateHomePage);
};

const main = () => {
  generateAllLists();
  enableSearch();
  addNewList();
};

window.onload = main;
