const login = (status, res) => {
  const messageBlock = document.querySelector('#login-message');

  if (status === 200) {
    window.location.assign('/home');
    return;
  }

  let message = 'Wrong password';

  if (status === 404) {
    message = 'Username doesn\'t exist'
  }

  showMessage(messageBlock, message);
};

const loginRequest = (event) => {
  const messageBlock = document.querySelector('#login-message');
  const formElement = document.querySelector('#login-form');
  const formData = new FormData(formElement);

  if (!formData.get('name')) {
    const message = 'Username required';
    showMessage(messageBlock, message);
    return;
  }

  if (!formData.get('password')) {
    const message = 'Password required';
    showMessage(messageBlock, message);
    return;
  }

  const body = new URLSearchParams(formData);
  const req = {
    method: 'POST',
    url: '/login',
    body
  }

  makeReq(req, login);
};

const mainLogin = () => {
  const button = document.querySelector('#login-button');
  button.onclick = loginRequest;
};
