/*
const errorTypeOne = {'message': 'Params is missing'}
const errorTypeTwo = {
  "message": "Error Occured",
  "Error": [
      {
          "errorName": "username",
          "details": "A user with that username already exists."
      },
      {
          "errorName": "full_name",
          "details": "This field may not be blank."
      },
      {
          "errorName": "email",
          "details": "Enter a valid email address."
      }
  ]
}
const errorTypeThree1 = {
  non_field_errors: ['Default Theme name must be unique'],
};
const errorTypeThree2 = {
  image: ['No file was submitted.'],
};
*/
export default function errorResponseHandler(errorResponse) {
  const errorData = errorResponse.response.data;
  const error =
    errorData instanceof ArrayBuffer
      ? JSON.parse(String.fromCharCode.apply(null, new Uint8Array(errorData)))
      : errorData;
  // handle error type two
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
  // handle error type one
  if (error.message) return error.message;
  if (error.detail) return error.detail;
  // handle error type three
  if (typeof error === 'object') {
    const errorStrings = [];
    Object.values(error).forEach(value => {
      if (Array.isArray(value)) {
        value.forEach(item => errorStrings.push(item));
      } else {
        errorStrings.push(value);
      }
    });
    return `
          <ul>
          ${errorStrings.map(err => `<li>${err}</li> `).join('')}
          </ul>
        `;
  }
  return 'Something went wrong!';
}
