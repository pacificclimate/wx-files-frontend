// Custom filters (functions, not UIs) for this project.
import includes from 'lodash/fp/includes';


// "Favourites" filter. If row is in favourites list (which is an array
// of location id's), pass it.
export const favourite = (rows, ids, filterValue) => {
  return rows.filter(row => {
    return includes(row.original.id, row.values.favourites);
  })
};
favourite.autoRemove = val => !val


export function textStartsWith(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue !== undefined
      ? String(rowValue)
      .toLowerCase()
      .startsWith(String(filterValue).toLowerCase())
      : true
  });
}
textStartsWith.autoRemove = val => !val;


// A more forgiving 'includes' filter.

export const includesIfDefined = (rows, ids, filterValue) => {
  return rows.filter(row => {
    return ids.some(id => {
      const rowValue = row.values[id]
      return rowValue && rowValue.includes(filterValue)
    })
  })
}
includesIfDefined.autoRemove = val => !val || !val.length;


// An includes filter for array-valued rows; array elements of single type.
// Matches any row whose array contains the filter value, or
// passes all rows for specified "all" value.

export const includesInArrayOfType = (type, all) => (rows, ids, filterValue) => {
  if (filterValue === all) {
    return rows;
  }
  return rows.filter(row => {
    return ids.some(id => {
      const rowValue = row.values[id]
      return rowValue.includes(type(filterValue))
    });
  });
}

includesInArrayOfType.autoRemove = val => !val || !val.length


// Custom filter that matches exactly or passes all rows with specified "all"
// value.

export const exactOrAll = all => (rows, ids, filterValue) => {
  if (filterValue === all) {
    return rows;
  }
  return rows.filter(row => {
    return ids.some(id => {
      const rowValue = row.values[id];
      return rowValue === filterValue;
    });
  });
}

exactOrAll.autoRemove = val => typeof val === 'undefined'



// Custom filter for coordinates within a bounding box defined in km.

export function coordinatesInBox(rows, id, filterValue) {
  const [latCentre, lonCentre, distance] = filterValue;

  const bounds = (center, tolerance) =>
    [center - tolerance, center + tolerance];

  const inBounds = (value, [min, max]) => value >= min && value <= max;

  // approx km / deg lat at Canadian latitudes
  // (varies by < 1% from equator to pole, according to ellipsoid)
  const latTolerance = distance / 111.2;
  const latBounds = bounds(latCentre, latTolerance);

  // approx km / deg lon at specified latitude; if latitude unspecified, use
  // a default value of 55.
  const lonTolerance =
    distance / (111.32 * Math.cos((latCentre || 55.0) / 180 * Math.PI));
  const lonBounds = bounds(lonCentre, lonTolerance);

  return rows.filter(row => {
    const [latitude, longitude] = row.values[id];
    return (
      (!latCentre || inBounds(latitude, latBounds)) &&
      (!lonCentre || inBounds(longitude, lonBounds))
    );
  });
}
coordinatesInBox.autoRemove = val =>
  !val || (typeof val[0] !== 'number' && typeof val[1] !== 'number' &&
  typeof val[2] !== 'number');


// Custom filter for coordinates within a radius in km.

export function coordinatesWithinRadius(rows, id, filterValue) {
  const [latCentre, lonCentre, distance] = filterValue;

  const dist = (lat1, lon1, lat2, lon2) => {
    // Compute distance between two lat-lon points using haversine formula.
    // Courtesy of http://www.movable-type.co.uk/scripts/latlong.html .
    // Cool new thing: Many non-ascii characters are legit in JS identifiers!
    const R = 6371; // km
    const d2R = Math.PI / 180;
    const φ1 = lat1 * d2R;
    const φ2 = lat2 * d2R;
    const Δφ = (lat2-lat1) * d2R;
    const Δλ = (lon2-lon1) * d2R;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  return rows.filter(row => {
    // We don't want to auto-remove the filter if a single value is transiently
    // undefined. So we do this filtering instead.
    if (!latCentre || !lonCentre || !distance) {
      return true;
    }
    const [latitude, longitude] = row.values[id];
    return dist(latCentre, lonCentre, latitude, longitude) < distance;
  });
}
coordinatesWithinRadius.autoRemove = val =>
  !val || (typeof val[0] !== 'number' && typeof val[1] !== 'number' &&
  typeof val[2] !== 'number');
