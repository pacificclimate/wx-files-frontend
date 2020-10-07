// `useFavourites` hook.
// Favourites is a list of location id's. The list is initialized with values
// from localStorage, and localStorage is updated whenever it changes.
// Note: localStorage only stores strings. FFS.

import { useEffect, useState } from 'react';

export function useFavourites(localStorageKey = 'favourites') {
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem(localStorageKey) || '[]')
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(favourites));
  }, [favourites]);

  return [favourites, setFavourites];
}
