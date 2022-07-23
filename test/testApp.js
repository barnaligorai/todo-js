const request = require('supertest');
const { createApp } = require('../src/app.js');
const assert = require('assert');

const mockedFs = (files, contents) => {
  let index = -1;
  return {
    readFileSync: (fileName) => {
      index++;
      assert.strictEqual(fileName, files[index]);
      return contents[fileName];
    },

    writeFileSync: () => { },
  };
};

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
      files: {
        usersFile: 'users',
        itemsFile: 'items',
        listsFile: 'lists',
      }
    };
    const files = ['users', 'lists', 'items'];
    const contents = {
      users: '{"bani": {"name": "bani","password": "abcd"}}',
      items: '{"id":0,"items":{}}',
      lists: '{"id":0,"lists":{}}'
    };
    myApp = createApp(config, doNothing, mockedFs(files, contents));
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
        .expect('location', '/login')
        .expect(302, done);
    });

    it('should not serve home page for GET /home when the user is not already logged in', (done) => {
      request(myApp)
        .get('/home')
        .expect('location', '/login')
        .expect(302, done);
    });

    it('should serve home page for GET /home when the user is already logged in', (done) => {
      let cookie;
      request(myApp)
        .post('/login')
        .send('name=bani&&password=abcd')
        .end((err, res) => {
          cookie = res.headers['set-cookie'];
          request(myApp)
            .get('/home')
            .set('Cookie', cookie)
            .expect(/TODO/)
            .expect(200, done);
        });
    });
  });

  describe('POST /sign-up', () => {
    it('should register the user for POST /sign-up when the user is new', (done) => {
      request(myApp)
        .post('/sign-up')
        .send('name=barnali&&password=abcd')
        .expect('location', '/login')
        .expect(302, done)
    });

    it('should give user exists error for POST /sign-up when the username already exists', (done) => {
      request(myApp)
        .post('/sign-up')
        .send('name=bani&&password=abcd')
        .expect('location', /603/)
        .expect(302, done);
    });
  });

  describe('POST /login', () => {
    it('should log the user in for POST /login when the user has no session', (done) => {
      request(myApp)
        .post('/login')
        .send('name=bani&&password=abcd')
        .expect('location', '/')
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

    it('should serve home page for GET /login when the user is already logged in', (done) => {
      let cookie;
      request(myApp)
        .post('/login')
        .send('name=bani&&password=abcd')
        .end((err, res) => {
          cookie = res.headers['set-cookie'];
          request(myApp)
            .get('/login')
            .set('Cookie', cookie)
            .expect('location', '/')
            .expect(302, done);
        });
    });
  });
});
