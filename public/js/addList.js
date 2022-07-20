const sendRequest = ({ method, url, body = '', headers = [] }, callBack) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => callBack(xhr.status, xhr.response);
  xhr.open(method, url);

  headers.forEach(({ header, value }) => {
    xhr.setRequestHeader(header, value);
  });

  xhr.send(JSON.stringify(body));
};

const displayNewAddedList = (status, res) => {
  if (status !== 200) {
    console.log('error');
    return;
  }
  const { id, title } = JSON.parse(res);
  const newList = createList(id, title, []);
  const lists = document.getElementsByClassName('lists')[0];
  lists.prepend(newList);
};

const newListReq = (event) => {
  const formElement = document.getElementById('add-list');
  const formData = new FormData(formElement);
  const title = formData.get('title');
  const req = {
    url: '/add-list',
    method: 'POST',
    headers: [{ header: 'content-type', value: 'application/json' }],
    body: { title }
  };
  sendRequest(req, displayNewAddedList);
};

const addNewList = () => {
  const button = document.getElementById('add-list-button');
  button.onclick = newListReq;
};

const generateHomePage = (status, res) => {
  if (status !== 200) {
    console.log('Something went wrong');
    return;
  }

  const listsElement = document.getElementsByClassName('lists')[0];
  const lists = JSON.parse(res).reverse();

  lists.forEach(({ id, title, tasks }) => {
    const list = createList(id, title, tasks);
    listsElement.appendChild(list);
  });
};

const generateAllLists = () => {
  const req = {
    url: '/home/all-lists',
    method: 'GET'
  };
  sendRequest(req, generateHomePage);
};

const main = () => {
  generateAllLists();
  addNewList();
};

window.onload = main;
