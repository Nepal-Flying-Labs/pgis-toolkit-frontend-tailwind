import React from 'react';
import { useParams } from 'react-router';
import Header from './Header';
import HelpContent from './HelpContent';
import DataCleaning from './DataCleaning';
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
  const { tabname, analysisType } = useParams();

  return (
    <div>
      <Header />

      <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)]">
        {tabname === 'data-cleaning' ? (
          <DataCleaning />
        ) : (
          getAnalysisContent(analysisType)
        )}

        {analysisType === 'data-cleaning' && <HelpContent />}
      </div>
    </div>
  );
}
