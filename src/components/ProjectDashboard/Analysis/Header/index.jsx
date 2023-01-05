import React from 'react';
import { useHistory, useParams } from 'react-router';

const headerData = {
  'optimal-route': {
    title: 'Optimal Route Analysis',
    description: 'Baseline Datasets contains different levels of boundaries.',
  },
};

export default function Header() {
  const { organizationId, projectId, analysisType } = useParams();
  const history = useHistory();

  return (
    <div
      className="naxatw-w-full naxatw-px-10 naxatw-py-5 naxatw-sticky naxatw-top-0
        naxatw-flex naxatw-justify-between naxatw-border-b naxatw-border-b-grey-300"
    >
      <div>
        <h3>{headerData[analysisType]?.title || ''}</h3>
        <span className="naxatw-text-body-lg naxatw-mt-1">
          {headerData[analysisType]?.description || ''}
        </span>
      </div>
      <button
        type="button"
        onClick={() =>
          history.push(
            `/organizations/${organizationId}/projects/${projectId}/map`,
          )
        }
        className="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 
          hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5
          naxatw-ml-auto naxatw-inline-flex naxatw-items-center naxatw-"
      >
        <i className="material-icons">close</i>
        <span className="naxatw-sr-only">Close modal</span>
      </button>
    </div>
  );
}
