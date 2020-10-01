import axios from 'axios';
import urljoin from 'url-join';
import map from 'lodash/fp/map';
import mapValues from 'lodash/fp/mapValues';
import isObject from 'lodash/fp/isObject';
import moment from 'moment';


// Normalize locations data.
// Specifically, convert dates received as strings to moment objects.
// These dates are in `file.timePeriod`.
// There might be a better way to do this.
export const normalizeLocationsData =
  map(
    ({ files, ...locationRest }) => ({
      files: map(
        ({ timePeriod, ...fileRest }) => ({
          timePeriod: isObject(timePeriod)
            ? mapValues(moment)(timePeriod)
            : timePeriod,
          ...fileRest,
        }),
      )(files),
      ...locationRest,
    })
  );


export function fetchWxFilesMetadata() {
  return axios.get(
    urljoin(process.env.REACT_APP_WXFS_URL, 'locations')
  )
    .then(response => response.data)
    .then(normalizeLocationsData)
    ;
}


export function fileContentUri(endpoint) {
  return urljoin(process.env.REACT_APP_WXFS_URL, endpoint)
}