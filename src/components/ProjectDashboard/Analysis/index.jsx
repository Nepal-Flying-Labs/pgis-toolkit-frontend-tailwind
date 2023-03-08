import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AnalysisCreators, Types } from '@Actions/analysis';
import { checkIfLoading } from '@Utils/loaderSelector';
import { isEmpty } from '@Utils/commonUtils';
import Header from './Header';
import HelpContent from './HelpContent';
import DataCleaning from './DataCleaning';
import OptimalRoute from './OptimalRoute';
import BufferAnalysis from './BufferAnalysis';
import AnalysisLoader from './AnalysisLoader';

const {
  checkProcessingStatusRequest,
  getProjectThemesRequest,
  getProjectThemeLayersRequest,
  getProjectGeojsonRequest,
  resetAnalysisState,
} = AnalysisCreators;

function getAnalysisContent(type) {
  switch (type) {
    case 'optimal-route':
      return <OptimalRoute />;
    case 'buffer-analysis':
      return <BufferAnalysis />;
    case 'proximity-analysis':
      return <BufferAnalysis />;

    default:
      return '';
  }
}

export default function Analysis() {
  const { tabname, analysisType, projectId } = useParams();
  const analysisTaskId = useSelector(state => state.analysis.analysisTaskId);
  const themes = useSelector(state => state.analysis.themes);
  const layers = useSelector(state => state.analysis.layers);
  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const selectedLayer = useSelector(state => state.dataCleaning.selectedLayer);
  const isProcessing = useSelector(state =>
    checkIfLoading(state, [Types.CHECK_PROCESSING_STATUS_REQUEST]),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!analysisTaskId) return;
    dispatch(
      checkProcessingStatusRequest({
        projectId,
        taskId: analysisTaskId,
        analysisType,
      }),
    );
  }, [dispatch, analysisTaskId, projectId, analysisType]);

  // project map section
  useEffect(() => {
    if (!projectDetail || themes) return;
    dispatch(getProjectThemesRequest({ project: projectId }));
    dispatch(getProjectGeojsonRequest({ project: projectId }));
  }, [dispatch, projectId, projectDetail, themes]);

  useEffect(() => {
    if (isEmpty(themes) || layers) return;
    themes.forEach(({ id }) => {
      dispatch(getProjectThemeLayersRequest({ theme: id }));
    });
  }, [dispatch, themes, layers]);

  // reset analysis state
  useEffect(
    () => () => {
      dispatch(resetAnalysisState());
    },
    [dispatch],
  );

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

        {tabname === 'data-cleaning' && !selectedLayer && <HelpContent />}
      </div>
    </div>
  );
}
