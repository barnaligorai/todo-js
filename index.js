const fs = require('fs');

const { createApp } = require('./src/app');

const main = (PORT) => {
  const session = JSON.parse(fs.readFileSync('data/secret.json', 'utf-8'));
  const config = { staticDir: 'public', session };
  const app = createApp(config);
  app.listen(PORT, () =>
    console.log(`App listening on ${8080}`));
};

main(8080);
