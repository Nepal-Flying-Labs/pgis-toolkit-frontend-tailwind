import React from 'react';
import NoDataYetImg from '@Assets/images/no-data-yet.png';

export default function NoDataYet() {
  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-px-5 naxatw-py-10 naxatw-items-center">
      <img width={60} height={60} src={NoDataYetImg} alt="no-data-yet" />
      <h3 className="naxatw-mt-7 naxatw-font-bold">No data yet</h3>
      <p className="naxatw-mt-2 naxatw-text-center">
        Upload your datasets, import from OSM or add WMS layer through the above
        buttons.
      </p>
    </div>
  );
}
