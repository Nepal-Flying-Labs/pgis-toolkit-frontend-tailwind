import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as BufferAnalysisCreators } from '@Actions/bufferAnalysis';
import { Creators as CommonCreators } from '@Actions/common';
import { analysisHeaderHeight } from '@src/constants';
import Accordion from '@Components/common/Accordion';
import DropdownOptions from '@Components/common/DropdownOptions';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';

const { handleRouteCheckbox, setResultsState, setBufferAnalysisState } =
  BufferAnalysisCreators;
const { toggleModal, togglePromptDialog } = CommonCreators;

export default function Results() {
  const { analysisType } = useParams();
  const analysisResults = useSelector(
    state => state.bufferAnalysis.results.analysisResults,
  );
  const dispatch = useDispatch();

  const bufferAnalysisException = ['attribute-table', 'visualize'];

  const dropdownOptions = [
    {
      id: 'zoom-to-layer',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">zoom_in</i>
          <p className="naxatw-text-body-lg">Zoom To Layer</p>
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
    {
      id: 'visualize',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-symbols-outlined naxatw-mr-2">monitoring</i>
          <p className="naxatw-text-body-lg">Visualize</p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setResultsState({
            showResultsPopup: true,
            selectedResultId: data.id,
          }),
        );
        dispatch(
          setBufferAnalysisState({
            popupActiveTab: 'Summary',
            detailsCategory: [],
            detailsChartData: {},
            detailsListData: [],
          }),
        );
      },
    },
    {
      id: 'save-layer',
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-symbols-outlined naxatw-mr-2">save</i>
          <p className="naxatw-text-body-lg">Save Layer</p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setResultsState({
            selectedAnalysis: data,
          }),
        );
        dispatch(togglePromptDialog('save-buffer-layer'));
      },
    },
    {
      id: 'discard',
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Discard</p>
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
        {analysisResults.map(result => (
          <Accordion
            key={result.id}
            className="!naxatw-py-2 !naxatw-px-4"
            header={
              <div className="naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
                <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
                  <div className="naxatw-flex naxatw-items-center ">
                    <input
                      id={result.id}
                      type="checkbox"
                      className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4 naxatw-accent-grey-800"
                      checked={result.checked}
                      onChange={e => {
                        const { id, checked } = e.target;
                        dispatch(
                          handleRouteCheckbox({
                            resultId: +id,
                            checked,
                            name: 'result',
                          }),
                        );
                      }}
                    />
                    <LegendItem
                      styles={{ ...result.style, geometryType: 'Point' }}
                      className="naxatw-mr-2"
                    />
                    <label
                      htmlFor={result.id}
                      className="naxatw-text-grey-800 naxatw-text-body-lg"
                    >
                      {result.name}
                    </label>
                  </div>
                  <DropdownOptions
                    options={
                      analysisType === 'buffer-analysis'
                        ? dropdownOptions.filter(
                            option =>
                              !bufferAnalysisException.includes(option.id),
                          )
                        : dropdownOptions
                    }
                    data={result}
                  />
                </div>
              </div>
            }
            body={
              <div className="naxatw-pl-2">
                {result.buffer_areas.map(area => (
                  <div key={area.id}>
                    <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                      <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-h-10">
                        <input
                          id={area.id}
                          type="checkbox"
                          className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4 naxatw-accent-grey-800"
                          checked={area.checked}
                          onChange={e => {
                            const { id, checked } = e.target;
                            dispatch(
                              handleRouteCheckbox({
                                resultId: result.id,
                                areaId: +id,
                                checked,
                                name: 'area',
                              }),
                            );
                          }}
                        />
                        <LegendItem
                          styles={{
                            ...area.originStyle,
                            geometryType: 'Point',
                          }}
                          className="naxatw-mr-2 !naxatw-rounded-full"
                          size="20px"
                        />

                        <label
                          className="naxatw-text-body-lg naxatw-text-grey-800"
                          htmlFor={area.id}
                        >
                          {area.name || '-'}
                        </label>
                      </div>
                      <MaterialIcon
                        name="zoom_in"
                        className="naxatw-cursor-pointer"
                        onIconClick={() =>
                          dispatch(
                            setResultsState({
                              zoomToBuffer: { id: area.id, bbox: area.bbox },
                            }),
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
