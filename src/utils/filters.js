import { mapWithKey } from './lodash-fp-extras';


// Abstraction of a common numeric filter input UI onChange function.
export const makeFilterNumberInputOnChange = (setFilter, index) => e => {
  const val = e.target.value
  setFilter(
    (prevFilterValues = []) => mapWithKey(
      (prevFilterValue, i) => i === index ? val && Number(val) : prevFilterValue
    )(prevFilterValues)
  );
};
