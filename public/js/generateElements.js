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

const createList = (id, title) => {
  const listTemplate = [
    `div.list#${id}`,
    [
      'div.list-header',
      ['div.title', title],
      ['div.delete', 'deleteIcon']
    ],
    [
      'ul.items', 'Add what\'s need to be doing'
    ]
  ];

  return createElementTree(listTemplate);
};
