import React from 'react';
import './styles.css';

export default function AnalysisLoader() {
  return (
    <div
      className="naxatw-fixed naxatw-inset-0 naxatw-w-screen naxatw-h-screen
        naxatw-z-[111111] naxatw-overflow-hidden naxatw-flex
        naxatw-flex-col naxatw-items-center naxatw-justify-center"
    >
      <div
        className="naxatw-fixed naxatw-inset-0 naxatw-opacity-75
          naxatw-bg-grey-800 naxatw-w-full naxatw-h-screen"
      />
      <div
        className="naxatw-z-[111111] naxatw-w-full naxatw-flex
          naxatw-flex-col naxatw-items-center naxatw-justify-center
          naxatw-select-none"
      >
        <div
          className="loaderx naxatw-ease-linear naxatw-rounded-full naxatw-border-4
          naxatw-border-t-4 naxatw-border-grey-200 naxatw-h-12 naxatw-w-12
          naxatw-border-t-secondary-400 naxatw-mb-4"
        />
        <h4 className="naxatw-text-center naxatw-text-white naxatw-font-semibold">
          Processing...
        </h4>
        <p className="naxatw-w-1/3 naxatw-text-center naxatw-text-white">
          This may take some time, please don&apos;t close this page.
        </p>
      </div>
    </div>
  );
}
