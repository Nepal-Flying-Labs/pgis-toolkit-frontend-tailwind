import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/routeAnalysis';
import RouteAnalysisActions from '@Actions/bufferAnalysis';
import Toggle from '@Components/common/Toggle';
import IconButton from '@Components/common/IconButton';
import RoutePopupSkeleton from '@Components/common/SkeletonLoader/RoutePopupSkeleton';
import { checkIfLoading } from '@Utils/loaderSelector';
import secondsToHMS from '@Utils/secondsToHMS';
import meterToKM from '@Utils/meterToKM';
import Chip from '@Components/ProjectDashboard/Analysis/OptimalRoute/MapSidebar/Chip/index';

const {
  getRoutePopupDataRequest,
  setRouteAnalysisState,
  handleObstaclesToggle,
} = Creators;

export default function BufferPopup() {
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const analysisResults = useSelector(
    state => state.bufferAnalysis.results.analysisResults,
  );
  const popupActiveTab = useSelector(
    state => state.bufferAnalysis.popupActiveTab,
  );
  const selectedRouteId = useSelector(
    state => state.routeAnalysis.selectedRouteId,
  );
  // const routePopupData = useSelector(
  //   state => state.routeAnalysis.routePopupData,
  // );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ROUTE_POPUP_DATA_REQUEST]),
  );
  const dispatch = useDispatch();

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

            <p className="naxatw-btn-text naxatw-mt-3 naxatw-mb-2">Obstacles</p>
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
