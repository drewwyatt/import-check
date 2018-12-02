import * as program from 'commander';
import pkg from '../package.json';
import { list } from './actions';
import { isUnknownCommand, noArgsSpecified } from './utils';

program
  .name(pkg.name)
  .version(pkg.version)
  .description(pkg.description);

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
