// tslint:disable:no-expression-statement
import test from 'ava';
import { noArgsSpecified } from './misc';

test('noArgsSpecified', t => {
  t.is(noArgsSpecified, false);
});
