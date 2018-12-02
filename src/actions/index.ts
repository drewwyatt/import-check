import { compose } from 'ramda';
import { printOutput } from '../utils';

const toPattern = (directory: string) => (
  [directory, '**', '*.ts?(x)'].join('/')
);

export const list = compose(
  printOutput(require('./get-imports-for-pattern')),
  toPattern,
);
