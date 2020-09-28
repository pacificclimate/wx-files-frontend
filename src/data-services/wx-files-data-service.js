// import axios from 'axios';
// import urljoin from 'url-join';
import locations from '../assets/locations';


export function fetchWxFilesMetadata() {
  // Fake data loading delay
  return new Promise((resolve) =>{
    setTimeout(() => {
      resolve(locations);
    }, 2000);
  });
}