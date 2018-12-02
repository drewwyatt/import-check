const { any, compose, either, forEach, not, prop, propEq } = require('ramda');

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

const logEach = forEach(x => console.log(x));

const printOutput = func => (...args) => {
  func(...args)
    .then(x => {
      Array.isArray(x)
        ? logEach(x)
        : console.log(x);

      process.exit(0);
    })
    .catch(e => {
      console.log(e);
      process.exit(1);
    });
};

module.exports = {
  isUnknownCommand,
  noArgsSpecified,
  printOutput,
};
