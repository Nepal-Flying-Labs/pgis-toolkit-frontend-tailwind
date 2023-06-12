import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as BufferAnalysisCreators } from '@Actions/bufferAnalysis';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import { analysisHeaderHeight } from '@src/constants';
import DropdownOptions from '@Components/common/DropdownOptions';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';
import { getAnalysisType } from '@src/constants/analysis';

const {
  handleBufferCheckbox,
  setResultsState,
  setBufferAnalysisState,
  downloadBufferAnalysisRequest,
} = BufferAnalysisCreators;
const { toggleModal, togglePromptDialog } = CommonCreators;
const { getAnalysisResultDetailRequest } = AnalysisCreators;

export default function Results() {
  const { analysisType, projectId } = useParams();
  const analysisResults = useSelector(
    state => state.bufferAnalysis.results.analysisResults,
  );
  const dispatch = useDispatch();

  const proximityAnalysisException = ['attribute-table'];

  const dropdownOptions = [
    {
      id: 'zoom-to-layer',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">zoom_in</i>
          <p className="naxatw-text-body-lg">Zoom To Result</p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setResultsState({ zoomToBuffer: { id: data.id, bbox: data.bbox } }),
        );
      },
    },
    {
      id: 'attribute-table',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-symbols-outlined naxatw-mr-2">table_chart</i>
          <p className="naxatw-text-body-lg">Attribute Table</p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setResultsState({
            selectedAnalysis: data,
          }),
        );
        dispatch(toggleModal('view-buffer-attribute'));
      },
    },
    // {
    //   id: 'summary',
    //   label: (
    //     <span className="naxatw-flex naxatw-items-center">
    //       <i className="material-symbols-outlined naxatw-mr-2">monitoring</i>
    //       <p className="naxatw-text-body-lg">Summary</p>
    //     </span>
    //   ),
    //   onClick: data => {
    //     dispatch(
    //       setResultsState({
    //         showResultsPopup: true,
    //         selectedResultId: data.id,
    //       }),
    //     );
    //     dispatch(
    //       setBufferAnalysisState({
    //         popupActiveTab: 'Summary',
    //         detailsCategory: [],
    //         detailsChartData: {},
    //         detailsListData: [],
    //       }),
    //     );
    //   },
    // },
    {
      id: 'save-layer',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-symbols-outlined naxatw-mr-2">download</i>
          <p className="naxatw-text-body-lg">Download Result</p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setResultsState({
            selectedAnalysis: data,
          }),
        );
        dispatch(
          downloadBufferAnalysisRequest({ buffer_analysis_id: data.id }),
        );
        // dispatch(togglePromptDialog('save-buffer-layer'));
      },
    },
    {
      id: 'discard',
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">
            Delete Result
          </p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setResultsState({
            selectedAnalysis: data,
          }),
        );
        dispatch(togglePromptDialog('delete-buffer-result'));
      },
    },
  ];

  return (
    <div className=" naxatw-h-full">
      <div
        className="naxatw-flex naxatw-flex-col naxatw-gap-y-5 naxatw-overflow-y-auto scrollbar"
        style={{
          height: `calc(100vh - ${analysisHeaderHeight} - 3.5rem)`,
        }}
      >
        {analysisResults.results.map(result => {
          const hasData = !!result.layer;
          return (
            <div
              key={result.id}
              className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-bg-white naxatw-px-2 naxatw-py-3 naxatw-rounded-sm"
            >
              <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                <div
                  className="naxatw-w-6 naxatw-h-6 naxatw-flex naxatw-mr-1
                          naxatw-items-center naxatw-justify-center naxatw-p-4"
                >
                  <input
                    id={result.id}
                    type="checkbox"
                    className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4 naxatw-accent-grey-800"
                    checked={result.checked}
                    onChange={e => {
                      const { id, checked } = e.target;
                      if (!hasData) {
                        dispatch(
                          getAnalysisResultDetailRequest({
                            project: projectId,
                            id: result.id,
                            analysis_type: getAnalysisType(analysisType),
                          }),
                        );
                      }
                      dispatch(
                        handleBufferCheckbox({
                          resultId: +id,
                          checked,
                          name: 'result',
                        }),
                      );
                    }}
                  />
                </div>

                {hasData && (
                  <LegendItem
                    styles={{ ...result.style, geometryType: 'Point' }}
                    className="naxatw-mr-2"
                  />
                )}

                <label
                  title={result.name}
                  className="naxatw-text-body-lg naxatw-text-grey-800 naxatw-w-[9rem]
                          naxatw-truncate"
                  htmlFor={result.id}
                >
                  {result.name}
                </label>
              </div>

              <div className="naxatw-flex">
                <DropdownOptions
                  options={
                    analysisType === 'proximity-analysis'
                      ? dropdownOptions.filter(
                          option =>
                            !proximityAnalysisException.includes(option.id),
                        )
                      : dropdownOptions
                  }
                  data={result}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
