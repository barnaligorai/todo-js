const displayNewTitle = (list) => (status, res) => {
  if (status === 200) {
    const { newTitle } = JSON.parse(res);
    const headerTemplate = ['div', { className: 'title' }, newTitle];
    const titleElement = createElementTree(headerTemplate);
    list.querySelector('.list-header > .title').replaceWith(titleElement);
    return;
  }
  console.log('Something went wrong');
};

const editTitleRequest = (event) => {
  const list = event.target.closest('.list');
  const listId = list.id;
  const input = list.querySelector('.list-header input');
  const req = {
    url: '/list/edit-title',
    method: 'post',
    headers: [{ header: 'content-type', value: 'application/json' }],
    body: JSON.stringify({ id: listId, title: input.value })
  }
  sendRequest(req, displayNewTitle(list));
};

const editTitle = (event) => {
  if (event.key === 'Enter') {
    editTitleRequest(event);
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
