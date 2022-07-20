const showNewItem = (tasksElement) => (status, res) => {
  if (status !== 200) {
    console.log('something went wrong');
    return;
  }
  const { id, listId, task, done } = JSON.parse(res);
  const taskElement = createSingleTask({ id, done, task });
  tasksElement.prepend(taskElement);
};

const addNewItemReq = (event, id, tasksElement) => {
  const form = event.path[1];
  const formData = new FormData(form);
  const task = formData.get('task');
  const body = { id, task };
  const req = {
    url: '/add-item',
    method: 'POST',
    headers: [{ header: 'content-type', value: 'application/json' }],
    body: JSON.stringify(body)
  }
  sendRequest(req, showNewItem(tasksElement));
};