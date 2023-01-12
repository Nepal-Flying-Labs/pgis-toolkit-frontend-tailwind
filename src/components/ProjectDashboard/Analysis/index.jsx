import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/routeAnalysis';
import { checkIfLoading } from '@Utils/loaderSelector';
import Header from './Header';
import HelpContent from './HelpContent';
import DataCleaning from './DataCleaning';
import OptimalRoute from './OptimalRoute';
import AnalysisLoader from './AnalysisLoader';

const { checkProcessingStatusRequest } = Creators;

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
  const analysisTaskId = useSelector(
    state => state.routeAnalysis.analysisTaskId,
  );
  const isProcessing = useSelector(state =>
    checkIfLoading(state, [Types.CHECK_PROCESSING_STATUS_REQUEST]),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!analysisTaskId) return;
    dispatch(checkProcessingStatusRequest({ task_id: analysisTaskId }));
  }, [dispatch, analysisTaskId]);

  return (
    <div>
      {isProcessing && <AnalysisLoader />}

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
