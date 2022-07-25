const displayEditedTitle = (list) => (status, res) => {
  if (status === 200) {
    const { newTitle } = JSON.parse(res);
    const titleTemplate = ['div', { className: 'title' }, newTitle];
    const titleElement = createElementTree(titleTemplate);
    list.querySelector('.list-header > .title').replaceWith(titleElement);

    const editTemplate = ['div', { className: 'edit fa-solid fa-pencil', onclick: editListTitle }, ''];
    const editElement = createElementTree(editTemplate);
    const cancel = list.querySelector('.cancel');
    cancel.replaceWith(editElement);
    return;
  }
  console.log('Something went wrong');
};

const editTitle = (event) => {
  if (event.key === 'Enter') {
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
  }
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
      required: true,
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
  if (status === 200) {
    const { newTask } = JSON.parse(res);
    const taskTemplate = ['div', { className: 'task' }, newTask];
    const taskElement = createElementTree(taskTemplate);
    item.querySelector('.task').replaceWith(taskElement);

    const editTemplate = ['div', { className: 'edit fa-solid fa-pencil', onclick: editTask }, ''];
    const editElement = createElementTree(editTemplate);
    const cancel = item.querySelector('.cancel');
    cancel.replaceWith(editElement);
    return;
  }
  console.log('Something went wrong');
};

const editTaskReq = (event) => {
  if (event.key === 'Enter') {
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
  }
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
