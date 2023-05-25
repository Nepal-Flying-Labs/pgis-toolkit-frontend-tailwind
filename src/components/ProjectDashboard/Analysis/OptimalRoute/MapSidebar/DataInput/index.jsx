/* eslint-disable no-nested-ternary */
import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/routeAnalysis';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import toastActions from '@Actions/toast';
import { analysisHeaderHeight } from '@src/constants';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';
import Chip from '@Components/common/Chip';
import IconButton from '@Components/common/IconButton/index';
import CustomNumberInput from '@Components/common/CustomNumberInput/index';
import MapContent from './OriginPointContents/MapContent';
import SearchContent from './OriginPointContents/SearchContent';
import LayerContent from './OriginPointContents/LayerContent';

const { setDataInputState, handleCheckbox, applyRouteAnalysisRequest } =
  Creators;

const { setSelectedInfo } = AnalysisCreators;

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

function getOriginPointsContent(content) {
  switch (content) {
    case 'search':
      return <SearchContent />;
    case 'map':
      return <MapContent />;
    case 'layer':
      return <LayerContent />;
    default:
      return '';
  }
}

// eslint-disable-next-line
function Container({ children }) {
  return <div className="naxatw-space-y-2">{children}</div>;
}

export default function DataInput() {
  const { projectId, analysisId } = useParams();
  const selectedRoadNetworkId = useSelector(
    state => state.routeAnalysis.selectedRoadNetworkId,
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
  const alternativePaths = useSelector(
    state => state.routeAnalysis.dataInput.alternativePaths,
  );
  const outputName = useSelector(
    state => state.routeAnalysis.dataInput.outputName,
  );
  const startingPoint = useSelector(
    state => state.routeAnalysis.dataInput.startingPoint,
  );
  const destinationPoint = useSelector(
    state => state.routeAnalysis.dataInput.destinationPoint,
  );
  // const analysisDetail = useSelector(state => state.analysis.analysisDetail);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.APPLY_ROUTE_ANALYSIS_REQUEST]),
  );
  const dispatch = useDispatch();

  const handleApply = () => {
    if (!startingPoint || !destinationPoint || !outputName) {
      dispatch(
        toastActions.error({
          message: 'Please input all the required fields!',
        }),
      );
      return;
    }
    const [originLong, originLat] =
      startingPoint.geojson.geometry?.coordinates ||
      startingPoint.geojson.coordinates;
    const [destinationLong, destinationLat] =
      destinationPoint.geojson.geometry?.coordinates ||
      destinationPoint.geojson.coordinates;
    const selectedObstacles = obstacleLayers
      .filter(item => item.checked)
      .map(item => item.id);
    const payloadData = {
      source: 'system',
      road_network: selectedRoadNetworkId,
      mode: selectedModeOfTransport,
      origin_long: originLong,
      origin_lat: originLat,
      destination_long: destinationLong,
      destination_lat: destinationLat,
      paths: alternativePaths,
      obstacles: JSON.stringify(selectedObstacles),
      analysis_id: analysisId,
      name: outputName,
      project: projectId,
      type: 'optimum_route',
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
          <label className="naxatw-label naxatw-flex naxatw-items-center">
            Mode of Transport{' '}
            <div
              onMouseOver={() => dispatch(setSelectedInfo('modeOfTransport'))}
              // onMouseOut={() => dispatch(setSelectedInfo(null))}
              onBlur={() => {}}
              onFocus={() => {}}
            >
              <IconButton
                className="material-symbols-outlined naxatw-text-[1.2rem]"
                name="info"
                title="Info"
                // onClick={() => dispatch(setSelectedInfo('result'))}
              />
            </div>
          </label>
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
                      selectedModeOfTransport: value,
                    }),
                  );
                }}
              />
            ))}
          </div>
        </Container>

        <Container>
          <label className="naxatw-label naxatw-flex naxatw-items-center">
            Origin & Destination Point
            <div
              onMouseOver={() => dispatch(setSelectedInfo('origin'))}
              // onMouseOut={() => dispatch(setSelectedInfo(null))}
              onBlur={() => {}}
              onFocus={() => {}}
            >
              <IconButton
                className="material-symbols-outlined naxatw-text-[1.2rem]"
                name="info"
                title="Info"
                // onClick={() => dispatch(setSelectedInfo('result'))}
              />
            </div>
          </label>
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

          <Container>{getOriginPointsContent(originPointType)}</Container>
        </Container>

        <Container>
          <label className="naxatw-label naxatw-flex naxatw-items-center">
            Obstacles
            <div
              onMouseOver={() => dispatch(setSelectedInfo('obstacle'))}
              // onMouseOut={() => dispatch(setSelectedInfo(null))}
              onBlur={() => {}}
              onFocus={() => {}}
            >
              <IconButton
                className="material-symbols-outlined naxatw-text-[1.2rem]"
                name="info"
                title="Info"
                // onClick={() => dispatch(setSelectedInfo('result'))}
              />
            </div>
          </label>
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
          <p className="naxatw-text-body-sm">(Values between 1 and 5)</p>
          {/* <input
            type="number"
            className="naxatw-input"
            min="1"
            max="5"
            value={alternativePaths || ''}
            onChange={e => {
              const { value } = e.target;
              if (value < 1 || value > 5) return;
              dispatch(
                setDataInputState({
                  alternativePaths: value,
                }),
              );
            }}
          /> */}
          <CustomNumberInput
            min={1}
            max={5}
            onChange={value => {
              if (value < 1 || value > 5) return;
              dispatch(
                setDataInputState({
                  alternativePaths: value,
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
      >
        <Button
          className="naxatw-btn-primary"
          isLoading={loading}
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
