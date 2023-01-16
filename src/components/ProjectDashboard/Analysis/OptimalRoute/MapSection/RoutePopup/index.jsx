import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/routeAnalysis';
import Toggle from '@Components/common/Toggle';
import IconButton from '@Components/common/IconButton';

const { getRoutePopupDataRequest, setRouteAnalysisState } = Creators;

export default function RoutePopup() {
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const selectedRouteId = useSelector(
    state => state.routeAnalysis.selectedRouteId,
  );
  const routePopupData = useSelector(
    state => state.routeAnalysis.routePopupData,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedRouteId) return;
    dispatch(getRoutePopupDataRequest(selectedRouteId));
  }, [dispatch, selectedRouteId]);

  if (!selectedRouteId) return '';

  return (
    <div
      className="naxatw-absolute naxatw-top-4 naxatw-right-4  naxatw-z-10
        naxatw-bg-white naxatw-text-grey-800 naxatw-rounded-[20px] naxatw-border naxatw-border-grey-300 
        naxatw-shadow-3xl naxatw-w-[20.3rem]"
    >
      <div
        className="naxatw-px-5 naxatw-py-3.5 naxatw-flex naxatw-items-center naxatw-justify-between naxatw-rounded-t-[20px]"
        // style={{
        //   boxShadow: '0px 2px 20px 4px rgb(0 0 0 / 12%)',
        // }}
      >
        <h4>Route 1</h4>
        <div className="naxatw-flex naxatw-items-center">
          <IconButton
            name="close"
            onClick={() =>
              dispatch(setRouteAnalysisState({ selectedRouteId: null }))
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
        <div className="naxatw-grid naxatw-grid-cols-2 naxatw-items-center naxatw-gap-2.5">
          <p>Origin Point</p>
          <p>Point A</p>
          <p>Destination Point</p>
          <p>Point B</p>
          <p>Route Type</p>
          <p>Line</p>
          <p>Length</p>
          <p>{routePopupData?.length}</p>
          <p>Travel Time</p>
          <p>{routePopupData?.travel_time}</p>
        </div>

        <p className="naxatw-btn-text naxatw-mt-3">Obstacles</p>
        <div className="naxatw-grid naxatw-grid-cols-3 naxatw-items-center naxatw-gap-2.5">
          {routePopupData?.obstacles?.map(item => (
            <React.Fragment key={item.layer_id}>
              <p>{item.layer_name}</p>
              <p>{item.count}</p>
              <Toggle isSm className="naxatw-ml-auto" checked={item.checked} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
