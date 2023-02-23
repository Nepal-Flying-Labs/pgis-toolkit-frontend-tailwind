import React from 'react';

export default function AppLoader() {
  return (
    <div>
      <h3
        className="naxatw-fixed naxatw-inset-0 naxatw-flex naxatw-justify-center
          naxatw-items-center naxatw-font-normal"
      >
        <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-end">
          Initializing App{' '}
          <span className="naxatw-w-2 naxatw-h-2 naxatw-rounded-full naxatw-bg-grey-800 naxatw-animate-loader " />
          <span className="naxatw-w-2 naxatw-h-2 naxatw-rounded-full naxatw-bg-grey-800 naxatw-animate-loader animation-delay-200" />
          <span className="naxatw-w-2 naxatw-h-2 naxatw-rounded-full naxatw-bg-grey-800 naxatw-animate-loader animation-delay-400" />
        </div>
      </h3>
    </div>
  );
}
