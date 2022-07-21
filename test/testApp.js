const request = require('supertest');
const { createApp } = require('../src/app.js');

const doNothing = (req, res, next) => {
  next();
};

describe('Test todo', () => {
  let config;
  let myApp;

  beforeEach(() => {
    config = {
      staticDir: 'public',
      session: { name: 'mySession', keys: ['myKey'] },
      users: { bani: { name: 'bani', password: 'abcd' } }
    };

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
        .expect('location', /606/)
        .expect(302, done)
    });

    it('should give user exists error for POST /sign-up when the username already exists', (done) => {
      request(myApp)
        .post('/sign-up')
        .send('name=bani&&password=abcd')
        .expect('location', /605/)
        .expect(302, done);
    });
  });

  describe('POST /login', () => {
    it('should log the user in for POST /login when the user has no session', (done) => {
      request(myApp)
        .post('/login')
        .send('name=bani&&password=abcd')
        .expect('location', /home/)
        .expect(302, done);
    });

    it('should give user doesn\'t exist error for POST /login when the username is wrong', (done) => {
      request(myApp)
        .post('/login')
        .send('name=barnali&&password=abcd')
        .expect('location', /601/)
        .expect(302, done);
    });

    it('should give invalid password error for POST /login when the password is wrong', (done) => {
      request(myApp)
        .post('/login')
        .send('name=bani&&password=dcba')
        .expect('location', /602/)
        .expect(302, done);
    });

  });

});
