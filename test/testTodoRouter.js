const request = require('supertest');
const { createApp } = require('../src/app.js');
const assert = require('assert');

const doNothing = (req, res, next) => {
  next();
};

describe('Todo Router', () => {
  let config;
  let myApp;
  let cookie;

  before((done) => {
    config = {
      staticDir: 'public',
      session: { name: 'mySession', keys: ['myKey'] },
      users: { bani: { name: 'bani', password: 'abcd' } },
      itemsDb: { id: 0, items: {} },
      listsDb: { id: 0, lists: {} }
    };

    myApp = createApp(config, doNothing);
    request(myApp)
      .post('/login')
      .send('name=bani&&password=abcd')
      .end((err, res) => {
        cookie = res.headers['set-cookie'];
        done();
      });
  });

  beforeEach(() => {
    config = {
      staticDir: 'public',
      session: { name: 'mySession', keys: ['myKey'] },
      users: { bani: { name: 'bani', password: 'abcd' } },
      itemsDb: { id: 0, items: {} },
      listsDb: { id: 0, lists: {} }
    };

    myApp = createApp(config, doNothing);
  });

  describe('/list', () => {
    describe('GET /list/all-lists', () => {

      it('should serve the lists of the user for GET /list/all-lists', (done) => {
        request(myApp)
          .get('/list/all-lists')
          .set('Cookie', cookie)
          .expect('content-type', /json/)
          .expect(200, done);
      });

      it('should redirect to login page for GET /list/all-lists when the user is not logged in', (done) => {
        request(myApp)
          .get('/list/all-lists')
          .expect('location', /login/)
          .expect(302, done);
      });

    });

    describe('POST /list/add-list', () => {

      it('should redirect to login page for POST /list/add-list when the user is not logged in', (done) => {
        request(myApp)
          .post('/list/add-list')
          .expect('location', '/login')
          .expect(302, done);
      });

      it('should add a list for POST /list/add-list when the user is logged in', (done) => {
        const listsDb = { id: 0, lists: {} };
        config.listsDb = listsDb;
        const myApp = createApp(config, doNothing);

        request(myApp)
          .post('/list/add-list')
          .send({ title: 'shopping' })
          .set('Cookie', cookie)
          .expect(200)
          .end((err, res) => {
            assert.deepStrictEqual(listsDb.lists['l0'], JSON.parse(res.text))
            done();
          });

      });
    });
  });
});
