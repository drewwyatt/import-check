const program = require('commander');
const package = require('./package.json');
const { directory } = require('./actions')
const { isUnknownCommand, noArgsSpecified } = require('./utils');

program
  .name(package.name)
  .version(package.version)
  .description(package.description);

program
  .command('directory <directory>')
  .alias('dir')
  .description('list all imports in ts/tsx files in a given directory.')
  .action(directory);

program.parse(process.argv);

// fallback
const unrecognizedCommand = isUnknownCommand(program);
if (noArgsSpecified || unrecognizedCommand) {
  if (unrecognizedCommand) {
    console.log('Unrecognized command');
  }
  program.help()
};
