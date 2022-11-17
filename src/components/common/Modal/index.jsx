import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ title, show, onClose, children }) {
  return (
    <div
      tabindex="-1"
      aria-hidden="true"
      className={`${
        show ? '' : 'hidden'
      } naxatw-fixed naxatw-top-0 naxatw-left-0 naxatw-h-screen naxatw-w-screen naxatw-overflow-y-auto naxatw-overflow-x-hidden naxatw-z-50 naxatw-p-4 naxatw-md:inset-0 naxatw-h-modal naxatw-md:h-full naxatw-flex naxatw-justify-center naxatw-bg-grey-500/50`}
    >
      <div className="naxatw-relative naxatw-flex naxatw-flex-col naxatw-justify-center naxatw-items-center naxatw-w-full naxatw-max-w-2xl naxatw-h-full naxatw-md:h-auto">
        <div className="naxatw-relative naxatw-bg-white naxatw-rounded-3xl naxatw-shadow naxatw-p-4">
          <div className="naxatw-flex naxatw-justify-between naxatw-items-start naxatw-p-4 naxatw-rounded-t">
            <h3 className="naxatw-font-bold naxatw-tracking-wide">{title}</h3>
            <button
              type="button"
              className="naxatw-text-gray-400 naxatw-bg-transparent naxatw-hover:bg-gray-200 naxatw-hover:text-gray-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center naxatw-"
              data-modal-toggle="defaultModal"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                className="naxatw-w-5 naxatw-h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="naxatw-sr-only">Close modal</span>
            </button>
          </div>
          <div className="naxatw-p-6 naxatw-space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
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
