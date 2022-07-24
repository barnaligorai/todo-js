const addAttributes = (element, attributes) => {
  for (const attribute in attributes) {
    element[attribute] = attributes[attribute];
  }
  return element;
};

const createElementTree = (elements) => {
  const [tag, attributes, ...children] = elements;
  const parent = document.createElement(tag);

  addAttributes(parent, attributes);

  if (children && !Array.isArray(children[0])) {
    parent.innerText = children[0].toString();
    return parent;
  }

  children.forEach(child =>
    parent.appendChild(createElementTree(child)));

  return parent;
};

const createSingleTask = (item) => {
  const { id, done, task } = item;

  const taskTemplate = [
    'li', { className: 'item', id: id },
    ['input', { type: 'checkbox', className: 'checkbox', onclick: markItem, checked: done }, ''],
    ['div', { className: 'task' }, task],
    ['div', { className: 'delete fa-solid fa-trash', onclick: deleteTask }, ''],
  ];

  const taskElement = createElementTree(taskTemplate);

  return taskElement;
};

const createTasks = (tasks) => {
  const tasksElement = document.createElement('ul');
  tasksElement.className = 'items';

  tasks.reverse().forEach(item => {
    const taskElement = createSingleTask(item);
    tasksElement.appendChild(taskElement);
  });

  return tasksElement;
};

const createList = (id, title, tasks) => {
  const listTemplate = [
    'div', { id: id, className: 'list' },
    ['h3', { className: 'list-header' },
      ['div', { className: 'title' }, title],
      ['div', { className: 'edit fa-solid fa-pencil' }, ''],
      ['div', { className: 'delete fa-solid fa-trash', onclick: deleteList }, '']],
    ['form', { className: 'add-item', onsubmit: submitNewItemReq },
      ['input', { name: 'task', required: 'true', placeholder: 'What needs to be done' }, '']]];

  const listElement = createElementTree(listTemplate);
  const tasksElement = createTasks(tasks);

  listElement.appendChild(tasksElement);
  return listElement;
};
