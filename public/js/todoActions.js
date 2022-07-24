const afterDelete = id => (status, res) => {
  if (status === 200) {
    const element = document.getElementById(id);
    element.remove();
    console.log('removed:', JSON.parse(res));
    return;
  }

  console.log('Something went wrong');
};

const deleteTask = (event) => {
  const id = event.target.closest('.item').id;

  const req = {
    url: '/item/deleteItem/' + id,
    method: 'POST'
  };

  sendRequest(req, afterDelete(id));
};

const deleteList = (event) => {
  e = event;
  const id = event.target.closest('.list').id;
  const req = {
    url: '/list/deleteList/' + id,
    method: 'POST'
  };

  sendRequest(req, afterDelete(id));
};

const markItem = (event) => {
  const id = event.target.closest('.item').id;

  const req = {
    url: '/item/markItem/' + id,
    method: 'post',
  };

  sendRequest(req, (status, res) => {
    if (status !== 200) {
      console.log('something went wrong');
      return;
    }
    console.log(res);
  });
};

const showNewItem = (listId) => (status, res) => {
  const tasksElement = document.querySelector(`#${listId}>.items`);
  console.log(tasksElement);
  if (status !== 200) {
    console.log('something went wrong');
    return;
  }
  const { id, task, done } = JSON.parse(res);
  const taskElement = createSingleTask({ id, done, task });
  tasksElement.prepend(taskElement);
};

const addNewItemReq = (id) => {
  const form = document.querySelector(`#${id} > form`);
  const formData = new FormData(form);
  const task = formData.get('task');
  const body = { id, task };
  const req = {
    url: '/item/add-item',
    method: 'POST',
    headers: [{ header: 'content-type', value: 'application/json' }],
    body: JSON.stringify(body)
  };

  sendRequest(req, showNewItem(id));
  form.reset();
};

const submitNewItemReq = (event) => {
  const id = event.target.closest('.list').id;
  event.preventDefault();
  addNewItemReq(id);
};
