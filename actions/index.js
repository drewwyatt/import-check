const R = require('ramda');

const toPattern = directory => (
  [directory, '**', '*.ts?(x)'].join('/')
);

const list = R.compose(
  require('./get-imports-for-pattern'),
  toPattern,
);

module.exports = {
  list,
};
