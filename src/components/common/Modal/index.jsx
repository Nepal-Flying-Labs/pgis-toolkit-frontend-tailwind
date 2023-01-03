import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export default function Modal({
  title,
  subtitle,
  show,
  onClose,
  children,
  className,
  headerContent,
  helpContent,
  zIndex,
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
        } naxatw-fixed naxatw-inset-0 naxatw-h-screen naxatw-w-screen naxatw-overflow-y-auto 
          naxatw-overflow-x-hidden naxatw-z-[11111] naxatw-p-4 md:naxatw-inset-0 naxatw-h-modal
          md:naxatw-h-full naxatw-flex naxatw-justify-center naxatw-bg-grey-700/50
      `}
        style={{ zIndex }}
      >
        <div
          ref={nodeRef}
          className="naxatw-fixed naxatw-inset-0 naxatw-overflow-y-auto"
        >
          <div
            className="naxatw-flex naxatw-min-h-full naxatw-items-center 
            naxatw-justify-center naxatw-p-4"
          >
            <div
              className="naxatw-relative naxatw-flex naxatw-flex-col naxatw-justify-center
              naxatw-items-center naxatw-w-full naxatw-max-w-2xl naxatw-h-full md:naxatw-h-auto"
            >
              <div
                className={`naxatw-relative naxatw-bg-white naxatw-rounded-[20px] naxatw-shadow
                   naxatw-w-[42rem] naxatw-overflow-hidden naxatw-max-h-[calc(100vh-4rem)] ${className}`}
              >
                <div
                  className={`naxatw-flex naxatw-justify-between naxatw-items-start
                    naxatw-rounded-t-[20px] naxatw-px-7 ${
                      !subtitle ? 'naxatw-py-7' : 'naxatw-py-5'
                    }`}
                  style={{
                    boxShadow: helpContent
                      ? '0px 2px 20px 4px rgba(0, 0, 0, 0.12)'
                      : '',
                  }}
                >
                  {headerContent || (
                    <div className="naxatw-space-y-1">
                      <h3 className="naxatw-font-bold naxatw-tracking-wider">
                        {title}
                      </h3>
                      <p className="naxatw-text-body-lg">{subtitle}</p>
                    </div>
                  )}

                  <button
                    type="button"
                    className="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 
                      hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5
                      naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
                    onClick={onClose}
                  >
                    <i className="material-icons">close</i>
                    <span className="naxatw-sr-only">Close modal</span>
                  </button>
                </div>
                <div className="naxatw-flex">
                  <div
                    className="naxatw-grow naxatw-max-h-[calc(100vh-10rem)] naxatw-overflow-y-auto scrollbar
                      naxatw-px-7 naxatw-py-5"
                  >
                    {children}
                  </div>

                  {helpContent && (
                    <div
                      className="naxatw-w-[21.375rem] naxatw-bg-secondary-50 naxatw-ml-auto naxatw-p-5
                        naxatw-max-h-[calc(100vh-10rem)] naxatw-overflow-y-auto scrollbar"
                    >
                      {helpContent}
                    </div>
                  )}
                </div>
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
  subtitle: '',
  show: false,
  onClose: () => {},
  children: '',
  className: '',
  headerContent: null,
  helpContent: null,
  zIndex: '11111',
};

Modal.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  headerContent: PropTypes.node,
  helpContent: PropTypes.node,
  zIndex: PropTypes.string,
};
