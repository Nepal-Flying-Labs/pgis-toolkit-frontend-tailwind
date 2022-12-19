import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastActions from '@Actions/toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ type, message, clearToast }) {
  useEffect(() => {
    if (type && message) setTimeout(clearToast, 7000);
    switch (type) {
      case 'success':
        toast.success(` ${message}`);
        break;
      case 'danger':
        toast.error(` ${message}`);
        break;
      case 'warning':
        toast.warn(`${message}`);
        break;
      default:
        break;
    }
  }, [type, message, clearToast]);

  if (type && typeof message === 'string') {
    return (
      <ToastContainer style={{ zIndex: 111111 }} />
      // <div className={`alert alert-${type}`}>
      //   <p>{message}</p>
      // </div>
    );
  }

  return null;
}

const mapStateToProps = state => {
  const {
    toast: { type, message },
  } = state;
  return {
    type,
    message,
  };
};

const mapDispatchToProps = dispatch => ({
  clearToast: () => dispatch(toastActions.clear()),
});

Toast.defaultProps = {
  type: null,
  message: null,
};

Toast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  clearToast: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
