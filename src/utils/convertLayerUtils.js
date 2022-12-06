/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import shpjs from 'shpjs';
import csv2geojson from 'csv2geojson';
import toGeoJSON from '@mapbox/togeojson';
import gjv from 'geojson-validation';
// import r2z from 'rar-to-zip';

function getHeaders(data) {
  return data.match(/([^\n]+)/)[0].split(',');
}

// export function convertSHPToGeoJSONRar(file) {
//   return r2z.convert(file, {}, (err, newFile) => {
//     console.log(newFile, 'newFile');
//   });
// }

export function convertSHPToGeoJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function loadReader() {
      function convertToLayer(buffer) {
        shpjs(buffer)
          .then(geojson => {
            resolve(geojson);
          })
          .catch(err => reject(err));
      }
      if (reader.readyState < 2 || reader.error) {
        // eslint-disable-next-line no-console
        console.log(reader.error);
      } else {
        convertToLayer(reader.result);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

export function getCSVHeaders(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function loadCsv() {
      const headers = getHeaders(reader.result);
      resolve(headers);
      // csv2geojson.csv2geojson(
      //   reader.result,
      //   {
      //     latfield: 'Latitude',
      //     lonfield: 'Longitude',
      //     delimiter: ',',
      //   },
      //   function (err, data) {
      //     // console.log(data);
      //   },
      // );
    };
  });
}

export function convertCSVToGeoJSON({ file, latitude, longitude }) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function loadCsv() {
      csv2geojson.csv2geojson(
        reader.result,
        {
          latfield: latitude,
          lonfield: longitude,
          delimiter: ',',
        },
        (err, data) => {
          resolve(data);
          reject(err);
        },
      );
    };
  });
}

export function convertKMLToGeoJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      const parsedXML = new DOMParser().parseFromString(
        reader.result,
        'text/xml',
      );
      const geojson = toGeoJSON.kml(parsedXML);
      resolve(geojson);
    };
  });
}

export function validateGeoJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      const geojson = reader.result;
      if (gjv.valid(JSON.parse(geojson))) {
        resolve(JSON.parse(geojson));
      } else {
        reject(new Error('Invalid geojson'));
      }
    };
  });
}
