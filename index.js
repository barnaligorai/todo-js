const fs = require('fs');
const morgan = require('morgan');

const { createApp } = require('./src/app');
require('dotenv').config();

const main = (PORT) => {
  const { COOKIE_NAME, COOKIE_KEY, STATIC_DIR } = process.env;

  const itemsDb = { id: 0, items: {} };
  const listsDb = { id: 1, lists: {} };

  const config = {
    staticDir: STATIC_DIR,
    session: {
      name: COOKIE_NAME,
      keys: [COOKIE_KEY]
    },
    usersFile: 'data/users.json',
    itemsDb,
    listsDb
  };

  const logger = morgan('tiny');

  const app = createApp(config, logger, fs);

  app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`));
};

main(4444);
