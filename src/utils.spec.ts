// tslint:disable:no-expression-statement
import test from 'ava';
import { noArgsSpecified } from './utils';

test('noArgsSpecified', t => {
  t.is(noArgsSpecified, false);
});
