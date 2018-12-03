import { compose, equals, prop } from 'ramda';

const someObj = { answer: 42 };
const hasCorrectAnswer = compose(
  equals(42),
  prop('answer'),
);
hasCorrectAnswer(someObj); // true
