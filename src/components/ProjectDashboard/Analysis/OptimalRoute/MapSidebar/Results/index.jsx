import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as RouteAnalysisCreators } from '@Actions/routeAnalysis';
import { Creators as CommonCreators } from '@Actions/common';
import { analysisHeaderHeight } from '@src/constants';
import Accordion from '@Components/common/Accordion';
import DropdownOptions from '@Components/common/DropdownOptions';
import LegendItem from '@Components/common/OpenLayersComponent/Legend/LegendItem';

const { setResultsState, handleRouteCheckbox } = RouteAnalysisCreators;
const { toggleModal } = CommonCreators;

export default function Results() {
  const analysisResults = useSelector(
    state => state.routeAnalysis.results.analysisResults,
  );
  const dispatch = useDispatch();

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
          setResultsState({
            zoomToRouteId: data.id,
          }),
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
        dispatch(toggleModal('view-route-attribute'));
      },
    },
    // {
    //   id: 'delete-layer',
    //   label: (
    //     <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
    //       <i className="material-icons naxatw-mr-2">delete_outline</i>
    //       <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Delete</p>
    //     </span>
    //   ),
    //   onClick: data => {
    //     // dispatch(setDeleteLayer(data));
    //     // dispatch(togglePromptDialog('delete-layer'));
    //   },
    // },
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
            header={
              <div className="naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
                <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
                  <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
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
                    <h5 className="naxatw-text-grey-800">{result.name}</h5>
                  </div>
                  <DropdownOptions options={dropdownOptions} data={result} />
                </div>
              </div>
            }
            body={
              <div className="naxatw-pl-2">
                {result.routes.map(route => (
                  <div key={route.id}>
                    <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                      <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-h-10">
                        <input
                          id={route.id}
                          type="checkbox"
                          className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4 naxatw-accent-grey-800"
                          checked={route.checked}
                          onChange={e => {
                            const { id, checked } = e.target;
                            dispatch(
                              handleRouteCheckbox({
                                resultId: result.id,
                                routeId: +id,
                                checked,
                                name: 'route',
                              }),
                            );
                          }}
                        />

                        <label
                          className="naxatw-text-body-lg naxatw-text-grey-800"
                          htmlFor={route.id}
                        >
                          {route.name}
                        </label>
                      </div>
                    </div>

                    <div className="naxatw-pl-3">
                      {route.data.map(item => (
                        <div
                          key={item.id}
                          className="naxatw-flex naxatw-justify-between naxatw-items-center"
                        >
                          <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-h-10">
                            <input
                              id={item.id}
                              type="checkbox"
                              className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4 naxatw-accent-grey-800"
                              checked={item.checked}
                              onChange={e => {
                                const { id, checked } = e.target;
                                dispatch(
                                  handleRouteCheckbox({
                                    resultId: result.id,
                                    routeId: route.id,
                                    dataId: +id,
                                    checked,
                                    name: 'data',
                                  }),
                                );
                              }}
                            />

                            <LegendItem
                              styles={item.style}
                              className="naxatw-mr-2"
                            />
                            <label
                              className="naxatw-text-body-lg naxatw-text-grey-800"
                              htmlFor={item.id}
                            >
                              {item.name}
                            </label>
                          </div>
                        </div>
                      ))}
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
