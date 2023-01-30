import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/routeAnalysis';
import RouteAnalysisActions from '@Actions/bufferAnalysis';
import IconButton from '@Components/common/IconButton';
import RoutePopupSkeleton from '@Components/common/SkeletonLoader/RoutePopupSkeleton';
import { checkIfLoading } from '@Utils/loaderSelector';
import Chip from '@Components/ProjectDashboard/Analysis/OptimalRoute/MapSidebar/Chip/index';
import { VerticalBlockChart } from '@Components/common/VerticleAndHorizontalBlockChart/index';
import Select from '@Components/common/Select/index';

const { setRouteAnalysisState } = Creators;

export default function BufferPopup() {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const analysisResults = useSelector(
    state => state.bufferAnalysis.results.analysisResults,
  );
  const poiLayersData = useSelector(state => state.bufferAnalysis.poiLayers);
  const categoryListData = useSelector(
    state => state.bufferAnalysis.detailsCategory.data,
  );
  const popupActiveTab = useSelector(
    state => state.bufferAnalysis.popupActiveTab,
  );

  // const routePopupData = useSelector(
  //   state => state.routeAnalysis.routePopupData,
  // );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ROUTE_POPUP_DATA_REQUEST]),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedLayer !== null) {
      dispatch(
        RouteAnalysisActions.getDetailsCategoryRequest({
          analysis: analysisResults?.[0]?.id,
          layer: selectedLayer,
          view: 'chart',
        }),
      );
    }
    return () => {};
  }, [selectedLayer]);
  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(
        RouteAnalysisActions.getDetailsChartRequest({
          analysis: analysisResults?.[0]?.id,
          layer: selectedLayer,
          view: 'chart',
          field: selectedCategory,
        }),
      );
    }
    return () => {};
  }, [selectedCategory]);
  // useEffect(() => {
  //   if (!selectedRouteId) return;
  //   dispatch(getRoutePopupDataRequest(selectedRouteId));
  // }, [dispatch, selectedRouteId]);

  return (
    <div
      className="naxatw-absolute naxatw-top-4 naxatw-right-4  naxatw-z-10
        naxatw-bg-white naxatw-text-grey-800 naxatw-rounded-[20px] naxatw-border naxatw-border-grey-300 
        naxatw-shadow-3xl naxatw-w-[20.3rem]"
    >
      <div className="naxatw-px-5 naxatw-py-3.5 naxatw-flex naxatw-items-center naxatw-justify-between naxatw-rounded-t-[20px]">
        <h4>Buffer Analysis </h4>
        <div className="naxatw-flex naxatw-items-center">
          <IconButton
            name="close"
            onClick={() =>
              dispatch(
                setRouteAnalysisState({
                  selectedRouteId: null,
                  routePopupData: null,
                }),
              )
            }
          />
        </div>
      </div>

      <div
        className="naxatw-px-5 naxatw-pb-3.5 naxatw-overflow-y-auto scrollbar naxatw-text-body-md"
        style={{
          maxHeight: `calc(100vh - ${projectHeaderHeight}px - 14rem)`,
        }}
      >
        {loading ? (
          <RoutePopupSkeleton />
        ) : (
          <>
            <div className="naxatw-flex naxatw-gap-1">
              <Chip
                label="Summary"
                active={popupActiveTab === 'Summary'}
                onClick={() =>
                  dispatch(RouteAnalysisActions.setPopupActiveTab('Summary'))
                }
              />
              <Chip
                label="Details"
                active={popupActiveTab === 'Details'}
                onClick={() =>
                  dispatch(RouteAnalysisActions.setPopupActiveTab('Details'))
                }
              />
            </div>

            <p className="naxatw-btn-text naxatw-mt-3 naxatw-mb-2">
              {popupActiveTab === 'Summary' ? (
                <div className="naxatw-flex naxatw-flex-col naxatw-px-2 naxatw-gap-3">
                  {/* <ul className="naxatw-flex naxatw-flex-col naxatw-gap-2">
                    {graphData?.map(itm => (
                      <li className="naxatw-flex naxatw-justify-between">
                        <span className="naxatw-text-body-lg">{itm?.key}</span>
                        <span className="naxatw-text-body-lg">
                          {itm?.value}
                        </span>
                      </li>
                    ))}
                  </ul> */}
                  {/* <div className="naxatw-flex naxatw-gap-0 naxatw-w-full naxatw-h-5">
                    {graphData?.map((itm, index) => {
                      const pWidth = parseInt(
                        calPercentage(itm?.[dataKey], data, dataKey),
                        10,
                      );
                      return (
                        <span
                          className="naxatw-h-full naxatw-border-0 first:naxatw-rounded-tl-lg first:naxatw-rounded-bl-lg last:naxatw-rounded-tr-lg last:naxatw-rounded-br-lg "
                          style={{
                            width: `${pWidth}%`,
                            backgroundColor: `${colorCode[index]}`,
                          }}
                        />
                      );
                    })}
                  </div> */}
                  <VerticalBlockChart
                    data={analysisResults?.[0]?.poiChartData}
                    dataKey="count"
                  />
                </div>
              ) : (
                <div className="naxatw-space-y-2">
                  <div>
                    <label className="naxatw-label">Select Layer*</label>
                    <Select
                      options={poiLayersData}
                      onChange={selected => setSelectedLayer(selected.id)}
                      selectedValue={selectedLayer}
                      labelKey="name"
                      valueKey="id"
                    />
                  </div>
                  <div>
                    <label className="naxatw-label">Select Category*</label>
                    <Select
                      options={categoryListData}
                      onChange={selected => setSelectedCategory(selected.name)}
                      selected={selectedCategory}
                      labelKey="name"
                      valueKey="name"
                    />
                  </div>
                </div>
              )}
            </p>

            {/* <div className="naxatw-grid naxatw-grid-cols-3 naxatw-items-center naxatw-gap-2.5">
              {routePopupData?.obstacles?.map(item => (
                <React.Fragment key={item.layer_id}>
                  <p>{item.layer_name}</p>
                  <p>{item.count}</p>
                  <Toggle
                    isSm
                    className="naxatw-ml-auto"
                    checked={item.checked}
                    onChange={e => {
                      dispatch(
                        handleObstaclesToggle({
                          layerId: item.layer_id,
                          checked: e.target.checked,
                        }),
                      );
                    }}
                  />
                </React.Fragment>
              ))}
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
