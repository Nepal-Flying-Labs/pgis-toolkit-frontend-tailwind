import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Creators as AnalysisCreators,
  Types as AnalysisTypes,
} from '@Actions/analysis';

import { Creators, Types } from '@Actions/routeAnalysis';
import { checkIfLoading } from '@Utils/loaderSelector';
import Header from './Header';
import HelpContent from './HelpContent';
import DataCleaning from './DataCleaning';
import OptimalRoute from './OptimalRoute';
import BufferAnalysis from './BufferAnalysis';
import AnalysisLoader from './AnalysisLoader';

const { checkProcessingStatusRequest } = Creators;
const { checkProcessingStatusRequest: checkAnalysisProcessingStatusRequest } =
  AnalysisCreators;

function getAnalysisContent(type) {
  switch (type) {
    case 'optimal-route':
      return <OptimalRoute />;
    case 'buffer-analysis':
      return <BufferAnalysis />;

    default:
      return '';
  }
}

export default function Analysis() {
  const { tabname, analysisType, projectId } = useParams();
  const analysisTaskId = useSelector(
    state => state.routeAnalysis.analysisTaskId,
  );
  const commonAnalysisTaskId = useSelector(
    state => state.analysis.analysisTaskId,
  );
  const isProcessing = useSelector(state =>
    checkIfLoading(state, [
      Types.CHECK_PROCESSING_STATUS_REQUEST,
      AnalysisTypes.CHECK_PROCESSING_STATUS_REQUEST,
    ]),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!analysisTaskId) return;
    dispatch(
      checkProcessingStatusRequest({ projectId, taskId: analysisTaskId }),
    );
  }, [dispatch, analysisTaskId, projectId]);

  useEffect(() => {
    if (!commonAnalysisTaskId) return;
    dispatch(
      checkAnalysisProcessingStatusRequest({
        projectId,
        taskId: commonAnalysisTaskId,
        analysisType,
      }),
    );
  }, [dispatch, commonAnalysisTaskId, analysisType, projectId]);

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
