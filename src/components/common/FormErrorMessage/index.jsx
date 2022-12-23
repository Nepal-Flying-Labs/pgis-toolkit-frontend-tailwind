import React from 'react';
import PropTypes from 'prop-types';

const FormErrorMessage = ({ message }) => (
  <p className="naxatw-text-body-md naxatw-text-[#FF0F0F] naxatw-mt-2 naxatw-pl-1">
    {message}
  </p>
);

export default FormErrorMessage;

FormErrorMessage.propTypes = {
  message: PropTypes.string,
};

FormErrorMessage.defaultProps = {
  message: '',
};
