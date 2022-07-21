const createElementTree = (elements) => {
  const [tag, ...children] = elements;
  const [tagName, className, id] = tag.split(/[.#]/);
  const parent = document.createElement(tagName);

  if (className) parent.className = className;
  if (id) parent.id = id;

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
    `li.item#${id}`,
    ['div.task', task],
    ['div.delete',
      ['img.delete-icon', 'deleteIcon']],
  ];

  const taskElement = createElementTree(taskTemplate);
  const checkboxElement = document.createElement('input');
  checkboxElement.type = 'checkbox';
  checkboxElement.classList = 'checkbox'
  checkboxElement.onclick = (event) => markItem(event, taskElement);

  if (done) {
    checkboxElement.checked = true;
  }

  const deleteElement = taskElement.getElementsByClassName('delete-icon')[0];
  const deleteIcon = document.createElement('img');
  deleteIcon.src = 'images/delete.png';
  deleteElement.replaceWith(deleteIcon);
  deleteIcon.onclick = (event) => deleteTask(event, taskElement);

  taskElement.prepend(checkboxElement);
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
    `div.list#${id}`,
    ['h3.list-header',
      ['div.title', title],
      ['div.delete',
        ['img.delete-icon', 'deleteIcon']]],
  ];
  const listElement = createElementTree(listTemplate);
  const tasksElement = createTasks(tasks);

  const deleteElement = listElement.getElementsByClassName('delete-icon')[0];
  const deleteIcon = document.createElement('img');
  deleteIcon.src = 'images/remove.png';
  deleteElement.replaceWith(deleteIcon);
  deleteIcon.onclick = (event) => deleteList(event, listElement);

  const addItemForm = document.createElement('form');
  addItemForm.className = 'add-item';

  const inputElement = document.createElement('input');
  inputElement.placeholder = 'What needs to be done';
  inputElement.name = 'task';
  inputElement.onkeydown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addNewItemReq(event, id, tasksElement);
      inputElement.value = '';
    }
  };

  addItemForm.appendChild(inputElement);
  listElement.appendChild(addItemForm);
  listElement.appendChild(tasksElement);
  return listElement;
};
