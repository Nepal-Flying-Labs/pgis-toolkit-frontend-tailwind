/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastActions from '@Actions/toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ type, message, clearToast, delay }) {
  useEffect(() => {
    if (type && message) setTimeout(clearToast, delay);
    switch (type) {
      case 'success':
        toast.success(` ${message}`);
        break;
      case 'danger':
        toast.error(<div dangerouslySetInnerHTML={{ __html: message }} />);
        break;
      case 'warning':
        toast.warn(`${message}`);
        break;
      default:
        break;
    }
  }, [type, message, clearToast, delay]);

  if (type && typeof message === 'string') {
    return (
      <ToastContainer
        style={{ zIndex: 111111, minWidth: '20rem', maxWidth: '30rem' }}
        autoClose={delay}
        className="naxatw-w-fit "
      />
      // <div className={`alert alert-${type}`}>
      //   <p>{message}</p>
      // </div>
    );
  }

  return null;
}

const mapStateToProps = state => {
  const {
    toast: { type, message, delay },
  } = state;
  return {
    type,
    message,
    delay,
  };
};

const mapDispatchToProps = dispatch => ({
  clearToast: () => dispatch(toastActions.clear()),
});

Toast.defaultProps = {
  type: null,
  message: null,
  delay: 7 * 1000,
};

Toast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  clearToast: PropTypes.func.isRequired,
  delay: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
