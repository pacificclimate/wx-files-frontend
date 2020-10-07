// `useLocalStorage` hook.
// Returns a state value and setter.
// Note: localStorage only stores strings. FFS.

import { useEffect, useState } from 'react';

export function useLocalStorage(key, deflt) {
  // key is localStorage key
  // deflt is default value to use when localStorage key is undefined
  const ls = localStorage.getItem(key);
  const [value, setValue] = useState(
    ls ? JSON.parse(ls) : deflt
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
