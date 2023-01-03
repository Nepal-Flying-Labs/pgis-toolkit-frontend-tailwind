import React from 'react';
import { useParams } from 'react-router';
import Header from './Header';
import HelpContent from './HelpContent';
import OptimalRoute from './OptimalRoute';

function getAnalysisContent(type) {
  switch (type) {
    case 'optimal-route':
      return <OptimalRoute />;

    default:
      return '';
  }
}

export default function Analysis() {
  const { analysisType } = useParams();

  return (
    <div>
      <Header />

      <div className="naxatw-flex">
        {getAnalysisContent(analysisType)}

        <HelpContent />
      </div>
    </div>
  );
}
