import each from 'jest-each';
import { mapWithKey } from './lodash-fp-extras';


describe('mapWithKey', () => {
  each([
    [['a', 'b'], [['a', 0], ['b', 1]], ]
  ]).test('%p', (input, expected) => {
    expect(mapWithKey((value, key) => [value, key])(input))
      .toEqual(expected)
  })
});
