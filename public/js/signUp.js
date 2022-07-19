const displaySignUpMessage = (status, res) => {
  const messageBlock = document.querySelector('#signUp-message');
  let message = 'Successfully signed up'
  if (status === 409) {
    message = 'Username already exists'
  }
  showMessage(messageBlock, message);
};

const signUpRequest = (event) => {
  const messageBlock = document.querySelector('#signUp-message');
  const formElement = document.querySelector('#signUp-form');
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
    url: '/sign-up',
    body
  }

  makeReq(req, displaySignUpMessage);
};

const mainSignup = () => {
  const button = document.querySelector('#register');
  button.onclick = signUpRequest;
};
