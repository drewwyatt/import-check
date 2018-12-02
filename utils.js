const { any, compose, either, not, prop, propEq } = require('ramda');

const args = process.argv.slice(2);

const matchesName = propEq(
  '_name',
  args[0],
);

const matchesAlias = propEq(
  '_alias',
  args[0],
);

const isUnknownCommand = compose(
  not,
  any(either(matchesName, matchesAlias)),
  prop('commands'),
);

const noArgsSpecified = !args.length;

module.exports = {
  isUnknownCommand,
  noArgsSpecified,
};
