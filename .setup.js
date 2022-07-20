const fs = require('fs');

const main = () => {
  const dotenvFile = '.env';
  const dotenvFileContent = "COOKIE_NAME='session'\nCOOKIE_KEY='key1'\nSTATIC_DIR='public'";
  fs.writeFileSync(dotenvFile, dotenvFileContent, 'utf8');
};

main();
