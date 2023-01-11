import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Header from './Header';
import HelpContent from './HelpContent';
import DataCleaning from './DataCleaning';

function getAnalysisContent(type) {
  switch (type) {
    case 'data-cleaning':
      return <DataCleaning />;

    default:
      return '';
  }
}

export default function Analysis() {
  const { tabname } = useParams();
  const selectedLayer = useSelector(state => state.dataCleaning.selectedLayer);

  return (
    <div>
      <Header />

      <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)]">
        {getAnalysisContent(tabname)}

        {!selectedLayer && <HelpContent />}
      </div>
    </div>
  );
}
