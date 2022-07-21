const request = require('supertest');
const { createApp } = require('../src/app.js');
const assert = require('assert');

const doNothing = (req, res, next) => {
  next();
};

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

describe('Todo Router', () => {
  let config;
  let myApp;
  let cookie;
  const files = ['users', 'lists', 'items'];
  const contents = {
    users: '{"bani": {"name": "bani","password": "abcd"}}',
    items: '{"id":1,"items":{"i0":{"id":"i0","task":"buy gift","done":"false"}}}',
    lists: '{"id":1,"lists":{"l0":{"id":"l0","title":"shopping"}}}'
  };

  before((done) => {
    config = {
      staticDir: 'public',
      session: { name: 'mySession', keys: ['myKey'] },
      users: { bani: { name: 'bani', password: 'abcd' } },
      files: {
        usersFile: 'users',
        itemsFile: 'items',
        listsFile: 'lists',
      }
    };

    myApp = createApp(config, doNothing, mockedFs(files, contents));
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
      files: {
        usersFile: 'users',
        itemsFile: 'items',
        listsFile: 'lists',
      }
    };

    myApp = createApp(config, doNothing, mockedFs(files, contents));
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
        request(myApp)
          .post('/list/add-list')
          .send({ title: 'shopping' })
          .set('Cookie', cookie)
          .expect(/title.*shopping/)
          .expect(200, done)
      });
    });

    describe('POST /list/deleteList', () => {

      it('should redirect to login page for POST /list/deleteList/:listId when the user is not logged in', (done) => {
        request(myApp)
          .post('/list/deleteList/l0')
          .expect('location', '/login')
          .expect(302, done);
      });

      it('should delete the mentioned list for POST /list/deleteList/:listId when the user is logged in', (done) => {
        request(myApp)
          .post('/list/deleteList/l0')
          .set('Cookie', cookie)
          .send({ listId: 'l0' })
          .expect(/deleted.*l0/)
          .expect(200, done)
      });

    });
  });

  describe('/item', () => {
    describe('POST /item/add-item', () => {

      it('should redirect to login page for POST /item/add-item when user is not logged in', (done) => {
        request(myApp)
          .post('/item/add-item')
          .send({ id: 'i0', task: 'sleep' })
          .expect('location', '/login')
          .expect(302, done);
      });

      it('should add an item for POST /item/add-item when user is logged in', (done) => {
        request(myApp)
          .post('/item/add-item')
          .set('Cookie', cookie)
          .send({ id: 'i0', task: 'sleep' })
          .expect(/sleep/)
          .expect(200, done)
      });
    });

    describe('POST /item/markItem', () => {

      it('should redirect to login page for POST /markItem/:itemId when the user is not logged in', (done) => {
        request(myApp)
          .post('/item/markItem/i0')
          .expect('location', '/login')
          .expect(302, done);
      });

      it('should mark the item for POST /markItem/:itemId when the user is logged in', (done) => {
        request(myApp)
          .post('/item/markItem/i0')
          .set('Cookie', cookie)
          .expect(/mark.*done/)
          .expect(200, done);
      });
    });

    describe('POST /item/deleteItem', () => {

      it('should redirect to login page for POST /items/deleteItem/:itemId when the user is not logged in', (done) => {
        request(myApp)
          .post('/item/deleteItem/i0')
          .expect('location', '/login')
          .expect(302, done);
      });

      it('should delete the mentioned item for POST /items/deleteItem/:itemId when the user is logged in', (done) => {
        request(myApp)
          .post('/item/deleteItem/i0')
          .set('Cookie', cookie)
          .send({ listId: 'i0' })
          .expect(/deleted.*i0/)
          .expect(200, done);
      });
    });
  });
});
