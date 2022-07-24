const displayEditedTitle = (list) => (status, res) => {
  if (status === 200) {
    const { newTitle } = JSON.parse(res);
    const titleTemplate = ['div', { className: 'title' }, newTitle];
    const titleElement = createElementTree(titleTemplate);
    list.querySelector('.list-header > .title').replaceWith(titleElement);
    return;
  }
  console.log('Something went wrong');
};

const editTitle = (event) => {
  if (event.key === 'Enter') {
    const list = event.target.closest('.list');
    const listId = list.id;
    const input = list.querySelector('.list-header input');
    const req = {
      url: '/list/edit-title',
      method: 'post',
      headers: [{ header: 'content-type', value: 'application/json' }],
      body: JSON.stringify({ id: listId, title: input.value })
    }
    sendRequest(req, displayEditedTitle(list));
  }
};

const editListTitle = (event) => {
  const list = event.target.closest('.list');
  const title = list.querySelector('.title');
  const inputTemplate = [
    'input', {
      className: 'title input-title',
      type: 'text',
      required: true,
      placeholder: 'Enter title',
      value: title.innerText,
      onkeydown: editTitle
    }, ''
  ];
  const input = createElementTree(inputTemplate);
  title.replaceWith(input);
  input.focus();
};

const displayEditedTask = (item) => (status, res) => {
  if (status === 200) {
    const { newTask } = JSON.parse(res);
    const taskTemplate = ['div', { className: 'task' }, newTask];
    const taskElement = createElementTree(taskTemplate);
    item.querySelector('.task').replaceWith(taskElement);
    return;
  }
  console.log('Something went wrong');
};

const editTaskReq = (event) => {
  if (event.key === 'Enter') {
    const item = event.target.closest('.item');
    const itemId = item.id;
    const input = item.querySelector('.task');
    const req = {
      url: '/item/edit-task',
      method: 'post',
      headers: [{ header: 'content-type', value: 'application/json' }],
      body: JSON.stringify({ id: itemId, task: input.value })
    }
    sendRequest(req, displayEditedTask(item));
  }
};

const editTask = (event) => {
  const item = event.target.closest('.item');
  const task = item.querySelector('.task');
  const inputTemplate = [
    'input', {
      className: 'task input-task',
      type: 'text',
      required: true,
      placeholder: 'What needs to be done',
      value: task.innerText,
      onkeydown: editTaskReq
    }, ''
  ];
  const input = createElementTree(inputTemplate);
  task.replaceWith(input);
  input.focus();
};
