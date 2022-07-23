const afterDelete = element => (status, res) => {
  if (status === 200) {
    element.remove();
    console.log('removed:', JSON.parse(res));
    return;
  }

  console.log('Something went wrong');
};

const deleteTask = (taskElement) => {
  const req = {
    url: '/item/deleteItem/' + taskElement.id,
    method: 'POST'
  };

  sendRequest(req, afterDelete(taskElement));
};

const deleteList = (listElement) => {
  const req = {
    url: '/list/deleteList/' + listElement.id,
    method: 'POST'
  };

  sendRequest(req, afterDelete(listElement));
};

const markItem = (taskElement) => {
  const req = {
    url: '/item/markItem/' + taskElement.id,
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

const showNewItem = (tasksElement) => (status, res) => {
  if (status !== 200) {
    console.log('something went wrong');
    return;
  }
  const { id, task, done } = JSON.parse(res);
  const taskElement = createSingleTask({ id, done, task });
  tasksElement.prepend(taskElement);
};

const addNewItemReq = (id, tasksElement) => {
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

  sendRequest(req, showNewItem(tasksElement));
};
