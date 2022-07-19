const makeReq = ({ url, method, body = '' }, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    cb(xhr.status, xhr.response);
  };

  xhr.open(method, url);
  xhr.send(body);
};
