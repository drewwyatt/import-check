const { compose } = require('ramda');
const { printOutput } = require('../utils');

const toPattern = directory => (
  [directory, '**', '*.ts?(x)'].join('/')
);

const list = compose(
  printOutput(require('./get-imports-for-pattern')),
  toPattern,
);

module.exports = {
  list,
};
