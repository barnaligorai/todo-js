const request = require('supertest');
const { createApp } = require('../src/app.js');

const doNothing = (req, res, next) => {
  next();
};

describe('Test todo', () => {
  let config;
  let myApp;
  let users = { bani: { name: 'bani', password: 'abcd' } };

  beforeEach(() => {
    config = { staticDir: 'public', session: { name: 'mySession', keys: ['myKey'] }, users };

    myApp = createApp(config, doNothing);
  });

  describe('GET /wrongUrl', () => {
    it('should serve the not found page for GET /wrongUrl', (done) => {
      request(myApp)
        .get('/wrongUrl')
        .expect(/not found/)
        .expect(404, done);
    });
  });

  describe('GET /', () => {
    it('should serve the start page for GET /', (done) => {
      request(myApp)
        .get('/')
        .expect('content-type', /html/)
        .expect(/Stay/)
        .expect(200, done);
    });

  });

  describe('POST /sign-up', () => {
    it('should register the user for POST /sign-up when the user is new', (done) => {
      request(myApp)
        .post('/sign-up')
        .send('name=barnali&&password=abcd')
        .expect(/success/)
        .expect(200, done)
    });

    it('should give user exists error for POST /sign-up when the user already exists', (done) => {
      request(myApp)
        .post('/sign-up')
        .send('name=bani&&password=abcd')
        .expect(/Exists/)
        .expect(409, done);
    });
  });
});
