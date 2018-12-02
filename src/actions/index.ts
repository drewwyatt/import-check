import { compose } from 'ramda';
import { printOutput } from '../utils/misc';
import getDependencies from './get-dependencies';
import getImportsForPattern from './get-imports-for-pattern';

const stripTrailingSlash = (path: string) =>
  path[path.length - 1] === '/' ? path.slice(0, -1) : path;

const toPattern = (directory: string) =>
  [stripTrailingSlash(directory), '**', '*.ts?(x)'].join('/');

const toPkgJsonPath = (directory: string) =>
  [stripTrailingSlash(directory), 'package.json'].join('/');

export const list = compose(
  printOutput(getImportsForPattern),
  toPattern,
);

const toErr = (missing: ReadonlyArray<string>): ReadonlyArray<string> => [
  'Error: imports missing from package.json:',
  ...missing,
];

// tslint:disable-next-line:no-expression-statement
const checkDependencies = (directory: string) =>
  Promise.all([
    getDependencies(toPkgJsonPath(directory)),
    getImportsForPattern(toPattern(directory)),
  ]).then(([dependencies, imports]) => {
    const depSet = new Set(dependencies);
    const missing = imports.filter(i => !depSet.has(i));
    if (missing.length) {
      throw toErr(missing);
    }

    return 'All imports found in package.json';
  });

export const validate = printOutput(checkDependencies);
