import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export default function Modal({
  title,
  show,
  onClose,
  children,
  className,
  headerContent,
}) {
  const nodeRef = useRef();

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      timeout={150}
      unmountOnExit
      classNames={{
        enter: 'naxatw-opacity-0 naxatw-scale-95',
        enterActive:
          'naxatw-opacity-100 naxatw-scale-100 naxatw-transition-all naxatw-ease-in naxatw-duration-150',
        enterDone: 'naxatw-opacity-100 naxatw-scale-100',
        exit: 'naxatw-opacity-50 naxatw-scale-75 naxatw-transition-all naxatw-ease-out naxatw-duration-150',
        exitActive: 'naxatw-opacity-0 naxatw-scale-50',
      }}
    >
      <div
        tabIndex="-1"
        className={`${
          show ? '' : ''
        } naxatw-fixed naxatw-inset-0 naxatw-h-screen naxatw-w-screen naxatw-overflow-y-auto naxatw-overflow-x-hidden naxatw-z-[11111]
        naxatw-p-4 md:naxatw-inset-0 naxatw-h-modal md:naxatw-h-full naxatw-flex naxatw-justify-center naxatw-bg-grey-700/50
      `}
      >
        <div
          ref={nodeRef}
          className="naxatw-fixed naxatw-inset-0 naxatw-overflow-y-auto"
        >
          <div className="naxatw-flex naxatw-min-h-full naxatw-items-center naxatw-justify-center naxatw-p-4">
            <div className="naxatw-relative naxatw-flex naxatw-flex-col naxatw-justify-center naxatw-items-center naxatw-w-full naxatw-max-w-2xl naxatw-h-full md:naxatw-h-auto">
              <div
                className={`naxatw-relative naxatw-bg-white naxatw-rounded-3xl naxatw-shadow naxatw-py-5 naxatw-px-6 naxatw-w-[42rem] ${className}`}
              >
                <div className="naxatw-flex naxatw-justify-between naxatw-items-start naxatw-rounded-t naxatw-p-1">
                  {headerContent || (
                    <h3 className="naxatw-font-bold naxatw-tracking-wider">
                      {title}
                    </h3>
                  )}

                  <button
                    type="button"
                    className="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
                    onClick={onClose}
                  >
                    <i className="material-icons">close</i>
                    <span className="naxatw-sr-only">Close modal</span>
                  </button>
                </div>
                <div className="naxatw-p-1 naxatw-space-y-6">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

Modal.defaultProps = {
  title: '',
  show: false,
  onClose: () => {},
  children: '',
  className: '',
  headerContent: null,
};

Modal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  headerContent: PropTypes.node,
};
