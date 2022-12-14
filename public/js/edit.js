const createListHeader = (title) => {
  const headerTemplate = [
    'h3', { className: 'list-header' },
    ['div', { className: 'title' }, title],
    ['div', { className: 'edit fa-solid fa-pencil', onclick: editListTitle }, ''],
    ['div', { className: 'delete fa-solid fa-trash', onclick: deleteList }, '']];

  return createElementTree(headerTemplate);
};

const displayEditedTitle = (list) => (status, res) => {
  if (status !== 200) {
    console.log('Something went wrong');
    return;
  }

  const { newTitle } = JSON.parse(res);
  const headerElement = createListHeader(newTitle);
  list.querySelector('.list-header').replaceWith(headerElement);
};

const editTitle = (event) => {
  if (event.key !== 'Enter') {
    return;
  }

  const list = event.target.closest('.list');
  const listId = list.id;
  const input = list.querySelector('.list-header input');

  if (!input.value) {
    alert('Title can\'t be empty');
    return;
  }

  const req = {
    url: '/list/edit-title',
    method: 'post',
    headers: [{ header: 'content-type', value: 'application/json' }],
    body: JSON.stringify({ id: listId, title: input.value })
  }
  sendRequest(req, displayEditedTitle(list));
};

const abortEditTitle = (list, prevTitle) => () => {
  const titleTemplate = ['div', { className: 'title' }, prevTitle];
  const titleElement = createElementTree(titleTemplate);
  const input = list.querySelector('.title');
  input.replaceWith(titleElement);

  const editTemplate = ['div', { className: 'edit fa-solid fa-pencil', onclick: editListTitle }, ''];
  const editElement = createElementTree(editTemplate);
  const cancel = list.querySelector('.cancel');
  cancel.replaceWith(editElement);
};

const editListTitle = (event) => {
  const list = event.target.closest('.list');
  const title = list.querySelector('.title');
  const edit = list.querySelector('.edit');
  const prevTitle = title.innerText;

  const inputTemplate = [
    'input', {
      className: 'title input-title',
      type: 'text',
      placeholder: 'Enter title',
      value: prevTitle,
      onkeydown: editTitle,
      onblur: abortEditTitle(list, prevTitle)
    }, ''
  ];
  const input = createElementTree(inputTemplate);
  title.replaceWith(input);

  const cancelTemplate = [
    'div', {
      className: 'cancel fa-solid fa-xmark',
      onclick: abortEditTitle(list, prevTitle)
    }, ''];
  const cancelElement = createElementTree(cancelTemplate);
  edit.replaceWith(cancelElement);
  input.focus();
};

const displayEditedTask = (item) => (status, res) => {
  if (status !== 200) {
    console.log('Something went wrong');
    return;
  }

  const { id, done, newTask } = JSON.parse(res);
  const taskElement = createSingleTask({ id, done, task: newTask });

  item.replaceWith(taskElement);
};

const editTaskReq = (event) => {
  if (event.key !== 'Enter') {
    return;
  }
  const item = event.target.closest('.item');
  const itemId = item.id;
  const input = item.querySelector('.task');
  if (!input.value) {
    alert('Task can\'t be empty');
    return;
  }

  const req = {
    url: '/item/edit-task',
    method: 'post',
    headers: [{ header: 'content-type', value: 'application/json' }],
    body: JSON.stringify({ id: itemId, task: input.value })
  }
  sendRequest(req, displayEditedTask(item));
};

const abortEditTask = (item, prevTask) => () => {
  const taskTemplate = ['div', { className: 'task' }, prevTask];
  const taskElement = createElementTree(taskTemplate);
  const input = item.querySelector('.task');
  input.replaceWith(taskElement);

  const editTemplate = ['div', { className: 'edit fa-solid fa-pencil', onclick: editTask }, ''];
  const editElement = createElementTree(editTemplate);
  const cancel = item.querySelector('.cancel');
  cancel.replaceWith(editElement);
};

const editTask = (event) => {
  const item = event.target.closest('.item');
  const task = item.querySelector('.task');
  const edit = item.querySelector('.edit');
  const prevTask = task.innerText;

  const inputTemplate = [
    'input', {
      className: 'task input-task',
      type: 'text',
      required: true,
      placeholder: 'What needs to be done',
      value: task.innerText,
      onkeydown: editTaskReq,
      onblur: abortEditTask(item, prevTask)
    }, ''
  ];
  const input = createElementTree(inputTemplate);

  const cancelTemplate = ['div', { className: 'cancel fa-solid fa-xmark', onclick: abortEditTask(item, prevTask) }, ''];
  const cancelElement = createElementTree(cancelTemplate);

  task.replaceWith(input);
  edit.replaceWith(cancelElement);

  input.focus();
};
