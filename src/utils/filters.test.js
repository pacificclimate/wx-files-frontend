import each from 'jest-each';
import { makeFilterNumberInputOnChange } from './filters';


describe('makeFilterNumberInputOnChange', () => {
  each([
    [[0, 1], 0, 99],
    [[0, 1], 1, 99],
    [[0, 1], 1, '99'],
  ]).test('%p %p %p', (filterValue, index, value) => {
    const setFilter = jest.fn();
    const onChange = makeFilterNumberInputOnChange(
      { filterValue, setFilter }, index
    );

    expect(setFilter.mock.calls.length).toBe(0);

    onChange({ target: { value } });

    expect(setFilter.mock.calls.length).toBe(1);

    let newFilterValue = filterValue;
    newFilterValue[index] = Number(value);
    expect(setFilter.mock.calls[0][0]).toStrictEqual(newFilterValue);
  });
});
