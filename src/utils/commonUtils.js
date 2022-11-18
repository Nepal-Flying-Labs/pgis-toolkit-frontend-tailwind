/**
 *
 * Check if an object or an array is empty.
 *
 * @param {object|array} obj  - object or array
 * @returns {boolean} boolean value whether the object or array is empty or not.
 */
export function isEmpty(obj) {
  if (!obj) return true;
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  return Object.keys(obj)?.length === 0;
}

/**
 *
 * Convert string to title case.
 *
 * @param {string} word - string
 * @returns titlecase version of the input string.
 */
export function toTitleCase(word) {
  return word.replace(/^./, match => match.charAt(0).toUpperCase());
}

/**
 *
 * Convert string to camel case.
 *
 * @param {string} word - string
 * @returns {string} camelcase version of the input string.
 */
export function toCamelCase(word) {
  return word.replace(/[_-]./g, match => match.charAt(1).toUpperCase());
}

/**
 *
 * Convert snakecase string to camelcase.
 *
 * @param {string} str - string
 * @returns {string} string with camel case.
 */
export function snakeCaseToCamel(str) {
  return str.replace(/([-_][a-z])/g, group =>
    group.toUpperCase().replace('-', '').replace('_', ''),
  );
}

/**
 *
 * Convert camelcase string to snakecase.
 *
 * @param {string} str - string
 * @returns {string} string with snake case.
 */
export function camelCaseToSnake(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 *
 * Change keys of an object to camelcase.
 *
 * @param {object} data - object
 * @returns {object}
 */
export const camelizeObjectKey = data =>
  Object.keys(data).reduce(
    (obj, item) => ({
      ...obj,
      [snakeCaseToCamel(item)]: (() => {
        if (data[item] && Array.isArray(data[item])) {
          if (data[item].length)
            return data[item].map(value => camelizeObjectKey(value));
          return [];
        }
        if (!!data[item] && typeof data[item] === 'object')
          return camelizeObjectKey(data[item]);
        return data[item];
      })(),
    }),
    {},
  );

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function getFileExtension(filename) {
  const arr = filename.split('.');
  return arr[arr.length - 1];
}

export function mapOrder(array, order, key) {
  array.sort((a, b) => {
    const A = a[key];
    const B = b[key];

    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    }
    return -1;
  });

  return array;
}

// export const searchFilterData = (rows, searchSection) => {
//   const columns = rows[0] && Object.keys(rows[0]);
//   // console.log(columns, 'columns');
//   // console.log(rows, 'rows');
//   return rows.filter(row =>
//     columns.some(
//       column =>
//         row[column] &&
//         row[column]
//           .toString()
//           .toLowerCase()
//           .indexOf(searchSection.toLowerCase()) > -1,
//     ),
//   );
// };
export const searchFilterData = (rows, searchSection, filterBy, fullData) => {
  const columns =
    fullData && fullData[0] && (filterBy || Object?.keys(rows[0]));
  if (searchSection === '') {
    return rows;
  }
  return fullData.filter(row =>
    columns.some(
      column =>
        row[column]
          ?.toString()
          .toLowerCase()
          .includes(searchSection.toString().toLowerCase()),
      // ?.includes(searchSection) > -1,
      // ?.search(new RegExp(`\\b${searchSection}\\b`)) > -1,
    ),
  );
};

// // program to convert first letter of a string to uppercase
// export const capitalizeFirstLetter = str => {
//   // converting first letter to uppercase
//   const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

//   return capitalized;
// };

export function getClassName(status) {
  switch (status) {
    case 'Open':
      return 'is-blue';
    case 'rejected':
      return 'is-red';
    case 'approved':
      return 'is-green';
    case 'pending':
      return 'is-orange';
    default:
      return '';
  }
}

export function hexToRgba(hex, opacity = 1) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  const a = opacity * 0.01;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function sortData(arr, key = 'id') {
  return arr.sort((a, b) => a[key] - b[key]);
}

export function createQueryParams(obj) {
  return Object.keys(obj).reduce((str, key) => `${str}&${key}=${obj[key]}`, '');
}

export function capitalizeFirstLetter(word) {
  return word
    .split('_')
    .map(str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
    .join(' ');
}

export function dateToUTC(date) {
  const d = new Date(date);
  const formatedDate = d.toUTCString();

  return formatedDate;
}

export function capitalizeFirstAlpha(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// export function sortDate(a, b) {
//   const d1 = new Date(a);
//   const d2 = new Date(b);

//   // eslint-disable-next-line no-console
//   console.log(d1.getDate(), d1.getUTCDate(), d1.getMonth(), d1.getUTCMonth());

//   if (d1.getUTCMonth() > d2.getUTCMonth()) {
//     return 1;
//   }
//   if (d1.getUTCMonth() < d2.getUTCMonth()) {
//     return -1;
//   }
//   // same month
//   return d1.getUTCDate() - d2.getUTCDate();
// }
