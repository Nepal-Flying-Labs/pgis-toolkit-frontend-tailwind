import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
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
  const manualFixLayerId = useSelector(
    state => state.analysis.manualFixLayerId,
  );

  return (
    <div>
      <Header />

      <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)]">
        {getAnalysisContent(analysisType)}

        {!manualFixLayerId && <HelpContent />}
      </div>
    </div>
  );
}
