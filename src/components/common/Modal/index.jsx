import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ title, show, onClose, children }) {
  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        show ? '' : 'naxatw-hidden'
      } naxatw-fixed naxatw-top-0 naxatw-left-0 naxatw-h-screen naxatw-w-screen naxatw-overflow-y-auto naxatw-overflow-x-hidden naxatw-z-[11111] naxatw-p-4 md:naxatw-inset-0 naxatw-h-modal md:naxatw-h-full naxatw-flex naxatw-justify-center naxatw-bg-grey-500/50`}
    >
      <div className="naxatw-relative naxatw-flex naxatw-flex-col naxatw-justify-center naxatw-items-center naxatw-w-full naxatw-max-w-2xl naxatw-h-full md:naxatw-h-auto">
        <div className="naxatw-relative naxatw-bg-white naxatw-rounded-3xl naxatw-shadow naxatw-py-5 naxatw-px-6 naxatw-w-[42rem]">
          <div className="naxatw-flex naxatw-justify-between naxatw-items-start naxatw-rounded-t naxatw-p-1">
            <h3 className="naxatw-font-bold naxatw-tracking-wider">{title}</h3>
            <button
              type="button"
              className="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
              onClick={onClose}
            >
              <i className="material-icons">close</i>
              <span className="naxatw-sr-only">Close modal</span>
            </button>
          </div>
          <div className="naxatw-p-1 naxatw-mt-5 naxatw-space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  title: '',
  show: false,
  onClose: () => {},
  children: '',
};

Modal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
