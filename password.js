const sechash = require('sechash');

const opts = {
  algorism: 'sha512',
  iterations: 2000,
  salt: 'winston cabin red'
};

const password = {
  createHash: (password) => {
    return sechash.strongHashSync(password, opts);
  },
  check: (password, hash) => {
    return sechash.testHashSync(password, hash, opts);
  }
};

module.exports = password;