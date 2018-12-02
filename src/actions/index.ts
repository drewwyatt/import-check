import { compose } from 'ramda';
import { printOutput } from '../utils';
import getImportsForPattern from './get-imports-for-pattern';


const toPattern = (directory: string) => (
  [directory, '**', '*.ts?(x)'].join('/')
);

export const list = compose(
  printOutput(getImportsForPattern),
  toPattern,
);
