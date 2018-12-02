#!/usr/bin/env node
import program from 'commander';
import { list, validate } from './actions';
import { isUnknownCommand, noArgsSpecified } from './utils/misc';

program.name('import-check').version('0.1.0');

program
  .command('list <directory>')
  .alias('l')
  .description('list all imports in ts/tsx files in a given directory.')
  .action(list);

program
  .command('validate <project>')
  .alias('v')
  .description('ensure all imports used in project are listed in package.json')
  .action(validate);

program.parse(process.argv);

// fallback
const unrecognizedCommand = isUnknownCommand(program);
if (noArgsSpecified || unrecognizedCommand) {
  if (unrecognizedCommand) {
    console.log('Unrecognized command');
  }
  program.help();
}
