const afterDelete = listElement => (status, res) => {
  if (status === 200) {
    listElement.remove();
    console.log('removed list:', JSON.parse(res));
    return;
  }

  console.log('Something went wrong');
};

const deleteList = (event, listElement) => {
  console.log('here');
  console.log(listElement.id);
  const req = {
    url: '/list/delete/' + listElement.id,
    method: 'POST'
  };
  sendRequest(req, afterDelete(listElement));
};
