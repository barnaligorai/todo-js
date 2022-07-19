const fs = require('fs');
const morgan = require('morgan');

const { createApp } = require('./src/app');
require('dotenv').config();

const main = (PORT) => {
  const users = { bani: { name: 'bani', password: 'abcd' } };
  const { COOKIE_NAME, COOKIE_KEY, STATIC_DIR } = process.env;
  const config = {
    staticDir: STATIC_DIR,
    session: {
      name: COOKIE_NAME,
      keys: [COOKIE_KEY]
    },
    users
  };

  const logger = morgan('tiny');
  const app = createApp(config, logger);
  app.listen(PORT, () =>
    console.log(`App listening on ${8080}`));
};

main(8080);
