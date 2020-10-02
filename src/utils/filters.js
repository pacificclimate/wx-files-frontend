import { mapWithKey } from './lodash-fp-extras';


// Abstraction of a common numeric filter input UI onChange function.
export const makeFilterNumberInputOnChange =
  ({ filterValue: prevFilterValues, setFilter }, index) => e =>
{
  const inputValue = e.target.value;
  const nextFilterValues = mapWithKey((prevFilterValue, i) =>
    i === index ? inputValue && Number(inputValue) : prevFilterValue
  )(prevFilterValues);
  setFilter(nextFilterValues);
};
