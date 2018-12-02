const program = require('commander');
const package = require('./package.json');
const { list } = require('./actions')
const { isUnknownCommand, noArgsSpecified } = require('./utils');

program
  .name(package.name)
  .version(package.version)
  .description(package.description);

program
  .command('list <directory>')
  .alias('l')
  .description('list all imports in ts/tsx files in a given directory.')
  .action(list);

program.parse(process.argv);

// fallback
const unrecognizedCommand = isUnknownCommand(program);
if (noArgsSpecified || unrecognizedCommand) {
  if (unrecognizedCommand) {
    console.log('Unrecognized command');
  }
  program.help()
};
