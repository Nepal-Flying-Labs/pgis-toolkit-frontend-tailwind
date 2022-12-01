export default function prepareFormData(data) {
  const formData = Object.entries(data).reduce(
    (obj, item) => ({
      ...obj,
      [item[0]]:
        Array.isArray(item[1]) || typeof item[1] === 'object'
          ? JSON.stringify(item[1])
          : item[1],
    }),
    {},
  );
  const formDataObj = new FormData();
  Object.keys(formData).forEach(key => {
    formDataObj.append(key, formData[key]);
  });
  return formDataObj;
}
