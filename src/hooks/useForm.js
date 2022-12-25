import { useState, useCallback, useEffect, useRef } from 'react';

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
  onErrorSubmit = () => {},
  required = [],
  validationSchema = {},
}) => {
  const [inputs, setInputs] = useState(initialValues);
  const [requiredFields, setRequiredFields] = useState(required);
  const [meta, setMeta] = useState(getMetaState(initialValues, required));
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const isRequiredFieldsChanged = useRef(false);

  useEffect(() => {
    isRequiredFieldsChanged.current = true;
  }, [requiredFields]);

  useEffect(() => {
    if (!isRequiredFieldsChanged.current) return;
    setMeta(getMetaState(inputs, requiredFields));
    isRequiredFieldsChanged.current = false;
  }, [inputs, requiredFields]);

  const isValid = (name, value) =>
    Object.prototype.hasOwnProperty.call(validationSchema, name)
      ? validationSchema[name](value)
      : { error: !value, message: 'Required' };

  const handleChange = e => {
    const { name, value, type, files } = e.target;
    setFieldsChanged(true);
    setInputs(prev => ({ ...prev, [name]: type === 'file' ? files : value }));
    if (!requiredFields.includes(name)) return;
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

  const handleCustomChange = (name, value) => {
    // const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleBlur = e => {
    const { name, value } = e.target;

    if (!requiredFields.includes(name)) return;
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
      onErrorSubmit();
    } else {
      onSubmit(inputs, fieldsChanged);
    }
  };

  const inputProps = {
    onBlur: handleBlur,
  };

  const resetFormState = useCallback(() => {
    setInputs(initialValues);
    setMeta(getMetaState(initialValues, requiredFields));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    values: inputs,
    inputProps,
    handleChange,
    handleCustomChange,
    handleBlur,
    handleSubmit,
    meta,
    setValues: setInputs,
    setRequiredFields,
    resetFormState,
  };
};

export default useForm;
