import { CommanderStatic } from 'commander';
import { any, compose, either, forEach, not, propOr, propEq } from 'ramda';

const args = process.argv.slice(2);

const matchesName = propEq(
  '_name',
  args[0],
);

const matchesAlias = propEq(
  '_alias',
  args[0],
);

type Program = CommanderStatic & { commands?: Commands };
type Commands = { _alias: string; _name: string; }[];
export const isUnknownCommand = compose<Program, Commands, boolean, boolean>(
  not,
  any(either(matchesName, matchesAlias)),
  propOr([], 'commands'),
);

export const noArgsSpecified = !args.length;

const logEach = forEach(x => console.log(x));

export const printOutput = (func: (...args: any[]) => Promise<any>) => (...args: any[]): void => {
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
