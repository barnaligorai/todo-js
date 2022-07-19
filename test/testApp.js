const request = require('supertest');
const { createApp } = require('../src/app.js');

const doNothing = (req, res, next) => {
  next();
};

describe('Test todo', () => {
  let config;
  let myApp;

  beforeEach(() => {
    config = { staticDir: 'public', session: { name: 'mySession', keys: ['myKey'] } };

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
        .expect(/login/)
        .expect(200, done);
    });
  });
});