const markItem = (event, taskElement) => {
  const req = {
    url: '/item/mark/' + taskElement.id,
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