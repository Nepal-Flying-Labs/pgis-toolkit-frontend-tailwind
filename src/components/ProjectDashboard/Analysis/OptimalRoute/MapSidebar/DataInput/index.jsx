/* eslint-disable no-nested-ternary */
import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/routeAnalysis';
import toastActions from '@Actions/toast';
import { analysisHeaderHeight } from '@src/constants';
import Button from '@Components/common/Button';
import Chip from '../Chip';

const { setDataInputState, handleCheckbox, applyRouteAnalysisRequest } =
  Creators;

const modeOfTransportData = [
  { label: 'Drive', value: 'drive', icon: 'directions_car' },
  { label: 'Cycle', value: 'cycle', icon: 'directions_bike' },
  { label: 'Walk', value: 'walk', icon: 'directions_walk' },
];

const originPointData = [
  { label: 'Search', value: 'search', icon: 'search' },
  { label: 'Map', value: 'map', icon: 'map' },
  { label: 'Layer', value: 'layer', icon: 'format_list_bulleted' },
];

const drawPointData = [
  {
    label: 'Draw Starting Point',
    value: 'start',
    icon: 'radio_button_checked',
  },
  {
    label: 'Draw Destination Point',
    value: 'destination',
    icon: 'radio_button_checked',
  },
];

// eslint-disable-next-line
function Container({ children }) {
  return <div className="naxatw-space-y-2">{children}</div>;
}

function getGeojsonCoordinates(geojson) {
  const {
    coordinates: [lat, lng],
  } = geojson.geometry;
  const latitude = lat.toFixed(5);
  const longitude = lng.toFixed(5);
  return `${latitude}, ${longitude}`;
}

export default function DataInput() {
  const { projectId } = useParams();
  const roadNetworkLayer = useSelector(
    state => state.routeAnalysis.roadNetworkLayer,
  );
  const obstacleLayers = useSelector(
    state => state.routeAnalysis.obstacleLayers,
  );
  const selectedModeOfTransport = useSelector(
    state => state.routeAnalysis.dataInput.selectedModeOfTransport,
  );
  const originPointType = useSelector(
    state => state.routeAnalysis.dataInput.originPointType,
  );
  const drawPointType = useSelector(
    state => state.routeAnalysis.dataInput.drawPointType,
  );
  const startGeojson = useSelector(
    state => state.routeAnalysis.dataInput.startGeojson,
  );
  const destinationGeojson = useSelector(
    state => state.routeAnalysis.dataInput.destinationGeojson,
  );
  const alternativePaths = useSelector(
    state => state.routeAnalysis.dataInput.alternativePaths,
  );
  const outputName = useSelector(
    state => state.routeAnalysis.dataInput.outputName,
  );
  const dispatch = useDispatch();

  const handleApply = () => {
    if (!startGeojson || !destinationGeojson || !outputName) {
      dispatch(
        toastActions.error({
          message: 'Please input all the required fields!',
        }),
      );
      return;
    }
    const [originLat, originLong] = startGeojson.geometry.coordinates;
    const [destinationLat, destinationLong] =
      destinationGeojson.geometry.coordinates;
    const selectedObstacles = obstacleLayers
      .filter(item => item.checked)
      .map(item => item.id);
    const payloadData = {
      source: 'system',
      road_network: roadNetworkLayer.id,
      mode: selectedModeOfTransport,
      origin_long: originLong,
      origin_lat: originLat,
      destination_long: destinationLong,
      destination_lat: destinationLat,
      paths: alternativePaths,
      obstcles: JSON.stringify(selectedObstacles),
      name: outputName,
      project: projectId,
      type: 'Optimum Path Analysis',
    };
    dispatch(applyRouteAnalysisRequest(payloadData));
  };

  return (
    <div className=" naxatw-h-full">
      <div
        className="naxatw-flex naxatw-flex-col naxatw-gap-y-5 naxatw-overflow-y-auto scrollbar"
        style={{
          height: `calc(100vh - ${analysisHeaderHeight} - 7.5rem)`,
        }}
      >
        <Container>
          <label className="naxatw-label">Mode of Transport</label>
          <div className="naxatw-flex naxatw-space-x-2">
            {modeOfTransportData.map(({ label, value, icon }) => (
              <Chip
                key={value}
                active={selectedModeOfTransport === value}
                label={label}
                iconClassName="material-symbols-outlined"
                iconLeft={icon}
                onClick={() => {
                  dispatch(
                    setDataInputState({
                      selectedModeOfTransport: value, // 'drive', 'cycle', walk
                    }),
                  );
                }}
              />
            ))}
          </div>
        </Container>

        <Container>
          <label className="naxatw-label">Origin & Destination Point</label>
          <div className="naxatw-flex naxatw-space-x-2">
            {originPointData.map(({ label, value, icon }) => (
              <Chip
                key={value}
                active={originPointType === value}
                label={label}
                iconClassName="material-symbols-outlined"
                iconLeft={icon}
                onClick={() => {
                  dispatch(
                    setDataInputState({
                      originPointType: value,
                    }),
                  );
                }}
              />
            ))}
          </div>

          <Container>
            {drawPointData.map(({ label, value, icon }) => (
              <Chip
                key={value}
                label={
                  value === 'start' && startGeojson
                    ? getGeojsonCoordinates(startGeojson)
                    : value === 'destination' && destinationGeojson
                    ? getGeojsonCoordinates(destinationGeojson)
                    : label
                }
                iconLeft={icon}
                active={drawPointType === value}
                onClick={() => {
                  dispatch(
                    setDataInputState({
                      drawPointType: value,
                    }),
                  );
                }}
              />
            ))}
          </Container>
        </Container>

        <Container>
          <label className="naxatw-label">Obstacles</label>
          <div
            className="naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-lg
              naxatw-overflow-y-auto scrollbar naxatw-h-[11.25rem] naxatw-bg-white"
          >
            <ul>
              {obstacleLayers.map(item => (
                <li
                  key={item.id}
                  role="presentation"
                  className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800 
                      hover:naxatw-bg-grey-100 naxatw-flex naxatw-items-center"
                  onClick={() => {}}
                >
                  <input
                    id={item.id}
                    type="checkbox"
                    className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4
                        naxatw-accent-grey-800 naxatw-cursor-pointer"
                    checked={item.checked}
                    onChange={e => {
                      const { id, checked } = e.target;
                      dispatch(
                        handleCheckbox({
                          stateName: 'obstacleLayers',
                          id,
                          checked,
                        }),
                      );
                    }}
                  />
                  <label htmlFor={item.id} className="naxatw-cursor-pointer">
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        <Container>
          <label className="naxatw-label">Preferred alternative path</label>
          <input
            type="number"
            className="naxatw-input"
            value={alternativePaths || ''}
            onChange={e => {
              dispatch(
                setDataInputState({
                  alternativePaths: e.target.value,
                }),
              );
            }}
          />
        </Container>

        <Container>
          <label className="naxatw-label">Output Name</label>
          <input
            type="text"
            className="naxatw-input"
            value={outputName}
            onChange={e => {
              dispatch(
                setDataInputState({
                  outputName: e.target.value,
                }),
              );
            }}
          />
        </Container>
      </div>

      <div
        className="naxatw-mt-auto naxatw-flex naxatw-items-center
          naxatw-justify-center naxatw-py-3"
        onClick={handleApply}
      >
        <Button className="naxatw-btn-primary">Apply</Button>
      </div>
    </div>
  );
}
