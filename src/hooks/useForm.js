import { useState, useCallback } from 'react';

function getMetaState(data, required) {
  return required.reduce(
    (obj, item) => ({
      ...obj,
      [item]: {
        touched: !!data[item],
        error: !data[item],
        message: '',
      },
    }),
    {},
  );
}

const useForm = ({
  initialValues = {},
  onSubmit = () => {},
  required = [],
  validationSchema = {},
}) => {
  const [inputs, setInputs] = useState(initialValues);
  const [meta, setMeta] = useState(getMetaState(initialValues, required));

  const isValid = (name, value) =>
    Object.prototype.hasOwnProperty.call(validationSchema, name)
      ? validationSchema[name](value)
      : { error: !value, message: 'Required' };

  const handleChange = e => {
    const { name, value, type, files } = e.target;

    setInputs(prev => ({ ...prev, [name]: type === 'file' ? files : value }));

    if (!required.includes(name)) return;
    setMeta(prev => {
      const valid = isValid(name, value);
      return {
        ...prev,
        [name]: {
          ...prev[name],
          error: valid.error,
          message: valid.message,
        },
      };
    });
  };

  const handleBlur = e => {
    const { name, value } = e.target;

    if (!required.includes(name)) return;
    setMeta(prev => {
      const valid = isValid(name, value);
      return {
        ...prev,
        [name]: {
          ...prev[name],
          touched: true,
          error: valid.error,
          message: valid.message,
        },
      };
    });
  };

  const handleSubmit = () => {
    const hasError = Object.values(meta).some(item => item.error);

    if (hasError) {
      setMeta(prev =>
        Object.keys(prev).reduce(
          (arr, key) => ({
            ...arr,
            [key]: {
              ...prev[key],
              touched: true,
            },
          }),
          {},
        ),
      );
    } else {
      onSubmit(inputs);
    }
  };

  const inputProps = {
    onBlur: handleBlur,
  };

  const resetFormState = useCallback(() => {
    setInputs(initialValues);
    setMeta(getMetaState(initialValues, required));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    values: inputs,
    inputProps,
    handleChange,
    handleBlur,
    handleSubmit,
    meta,
    setValues: setInputs,
    resetFormState,
  };
};

export default useForm;
