/* eslint-disable prettier/prettier */
export default function errorResponseHandler(error) {
  const hasErrorField = Object.keys(error).includes('Error');
  if (hasErrorField) {
    return `
          <h4>${error.message}</h4>
          <ul>
          ${error.Error.map(
            item =>
              `<li>
              ${item?.errorName} : ${item?.details}
            </li> `,
          ).join('')}
          </ul>
        `;
  }
  return error.message;
}
