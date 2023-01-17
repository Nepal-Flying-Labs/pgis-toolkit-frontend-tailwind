import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/routeAnalysis';
import Toggle from '@Components/common/Toggle';
import IconButton from '@Components/common/IconButton';
import RoutePopupSkeleton from '@Components/common/SkeletonLoader/RoutePopupSkeleton';
import { checkIfLoading } from '@Utils/loaderSelector';

const {
  getRoutePopupDataRequest,
  setRouteAnalysisState,
  handleObstaclesToggle,
} = Creators;

export default function RoutePopup() {
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const selectedRoute = useSelector(state => state.routeAnalysis.selectedRoute);
  const routePopupData = useSelector(
    state => state.routeAnalysis.routePopupData,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ROUTE_POPUP_DATA_REQUEST]),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedRoute?.id) return;
    dispatch(getRoutePopupDataRequest(selectedRoute.id));
  }, [dispatch, selectedRoute]);

  if (!selectedRoute) return '';

  return (
    <div
      className="naxatw-absolute naxatw-top-4 naxatw-right-4  naxatw-z-10
        naxatw-bg-white naxatw-text-grey-800 naxatw-rounded-[20px] naxatw-border naxatw-border-grey-300 
        naxatw-shadow-3xl naxatw-w-[20.3rem]"
    >
      <div className="naxatw-px-5 naxatw-py-3.5 naxatw-flex naxatw-items-center naxatw-justify-between naxatw-rounded-t-[20px]">
        <h4>Route {routePopupData?.route_no}</h4>
        <div className="naxatw-flex naxatw-items-center">
          <IconButton
            name="close"
            onClick={() =>
              dispatch(
                setRouteAnalysisState({
                  selectedRoute: null,
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
            <div className="naxatw-grid naxatw-grid-cols-2 naxatw-items-center naxatw-gap-2.5">
              <p>Origin Point</p>
              <p>Point A</p>
              <p>Destination Point</p>
              <p>Point B</p>
              <p>Route Type</p>
              <p>Line</p>
              <p>Length</p>
              <p>{routePopupData?.length} m</p>
              <p>Travel Time</p>
              <p>{routePopupData?.travel_time} seconds</p>
            </div>

            <p className="naxatw-btn-text naxatw-mt-3 naxatw-mb-2">Obstacles</p>
            <div className="naxatw-grid naxatw-grid-cols-3 naxatw-items-center naxatw-gap-2.5">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
