/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fromLonLat, transformExtent } from 'ol/proj';
import {
  Creators as RouteAnalysisCreators,
  Types,
} from '@Actions/routeAnalysis';
import toastActions from '@Actions/toast';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher';
import CustomLayerSwitcher from '@Components/common/OpenLayersComponent/CustomLayerSwitcher';
import VectorLayer from '@Components/common/OpenLayersComponent/Layers/VectorLayer';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import CircleMarker from '@Components/common/OpenLayersComponent/CustomLayer/CircleMarker';
import Spinner from '@Components/common/Spinner';
import { checkIfLoading } from '@Utils/loaderSelector';
import 'ol/ol.css';
import '@Components/common/OpenLayersComponent/map.css';
import MapFooter from '@Components/common/OpenLayersComponent/MapFooter';
import DrawTool from '@Components/common/OpenLayersComponent/DrawTool';
import {
  startPointStyles,
  destinationPointStyles,
  obstaclePointColor,
} from '@src/constants/analysis';
import { analysisHeaderHeight } from '@src/constants';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import { apiURL } from '@Services';
import { isEmpty } from '@Utils/commonUtils';
import HelpBox from './HelpBox';
import RoutePopup from './RoutePopup';

const { setDataInputState, setResultsState, setRouteAnalysisState } =
  RouteAnalysisCreators;

export default function MapSection() {
  const { mapRef, map, isMapLoading } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  const roadNetworkLayer = useSelector(
    state => state.routeAnalysis.roadNetworkLayer,
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
  const analysisResults = useSelector(
    state => state.routeAnalysis.results.analysisResults,
  );
  const zoomToRouteId = useSelector(
    state => state.routeAnalysis.results.zoomToRouteId,
  );

  const isMapDataLoading = useSelector(state =>
    checkIfLoading(state, [Types.GET_PROJECT_GEOJSON_REQUEST]),
  );
  const dispatch = useDispatch();

  // zoom to road network layer on initial map load
  useEffect(() => {
    if (!map || !roadNetworkLayer) return;
    const bbox = roadNetworkLayer?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        // duration: 3500,
        constrainResolution: true,
      });
    }
  }, [map, roadNetworkLayer]);

  // zoom to road network layer
  useEffect(() => {
    if (!map || !zoomToRouteId) return;
    const bbox = analysisResults.find(item => item.id === zoomToRouteId)?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        duration: 2000,
        constrainResolution: true,
      });
      dispatch(
        setResultsState({
          zoomToRouteId: null,
        }),
      );
    }
  }, [map, zoomToRouteId, analysisResults, dispatch]);

  // click handler for route layer
  useEffect(() => {
    if (!map) return;
    map.on('click', evt => {
      const features = map.getFeaturesAtPixel(evt.pixel);
      if (features.length < 1) {
        return;
      }
      const properties = features[0].getProperties();
      if (properties.layer !== 'route') return;
      dispatch(setRouteAnalysisState({ selectedRouteId: properties.id }));
    });
  }, [map, dispatch]);

  return (
    <div className="naxatw-w-full naxatw-relative">
      {isMapDataLoading && (
        <div className="naxatw-absolute naxatw-w-full naxatw-top-4 naxatw-z-10 naxatw-flex naxatw-justify-center">
          <span className="naxatw-bg-white naxatw-p-3 naxatw-flex naxatw-items-center naxatw-gap-3 naxatw-rounded-md naxatw-shadow-3xl">
            <h5 className="">Loading</h5>
            <Spinner className="naxatw-w-6 naxatw-h-6 naxatw-fill-primary-400" />
          </span>
        </div>
      )}

      <MapComponent
        ref={mapRef}
        mapInstance={map}
        style={{
          height: `calc(100vh - ${analysisHeaderHeight})`,
        }}
      >
        <LayerSwitcherControl />

        <CustomLayerSwitcher />

        <HelpBox />

        {roadNetworkLayer && (
          <VectorTileLayer
            url={`${apiURL}maps/feature_mirror_vectortile/{z}/{x}/{y}/?layer=${roadNetworkLayer.id}`}
            authToken={localStorage.getItem('userToken')}
            visibleOnMap
            style={roadNetworkLayer.style}
            zIndex={1}
            // properties={{ layerId: selectedLayer.id }}
          />
        )}

        {analysisResults.map(result =>
          result.routes.map(route =>
            route.data.map(item => (
              <VectorTileLayer
                url={`${apiURL}maps/optimum_route_vectortile/{z}/{x}/{y}/?route=${item.id}`}
                authToken={localStorage.getItem('userToken')}
                visibleOnMap={item.checked}
                style={item.style}
                zIndex={item.is_optimum ? 3 : 2}
                // properties={{ layerId: selectedLayer.id }}
              />
            )),
          ),
        )}

        {analysisResults.map(result =>
          result.routes.map(route =>
            route.data.map(item =>
              item.obstacles.map(obstacle =>
                !isEmpty(obstacle.feature_mirror_ids) ? (
                  <VectorTileLayer
                    url={`${apiURL}maps/feature_mirror_vectortile/{z}/{x}/{y}/?layer=${
                      obstacle.layer_id
                    }&ids=${obstacle.feature_mirror_ids.join(',')}`}
                    authToken={localStorage.getItem('userToken')}
                    visibleOnMap
                    style={{
                      ...startPointStyles,
                      fillColor: obstaclePointColor,
                      circleRadius: 6,
                    }}
                    zIndex={4}
                    // properties={{ layerId: selectedLayer.id }}
                  />
                ) : (
                  ''
                ),
              ),
            ),
          ),
        )}

        {analysisResults.map(result => (
          <React.Fragment key={result.id}>
            <CircleMarker
              coordinates={[result.origin_lat, result.origin_long]}
              style={{ ...startPointStyles }}
              zIndex={10}
              map={map}
            />
            <CircleMarker
              coordinates={[result.destination_lat, result.destination_long]}
              style={{ ...destinationPointStyles }}
              zIndex={10}
              map={map}
            />
          </React.Fragment>
        ))}

        <DrawTool
          enable={!!drawPointType}
          // geojson={featureGeojson}
          geometryType="Point"
          selectedDrawType="add-feature"
          zIndex={10}
          style={
            drawPointType === 'start'
              ? { ...startPointStyles }
              : { ...destinationPointStyles }
          }
          onSave={geojson => {
            dispatch(
              setDataInputState({
                [drawPointType === 'start'
                  ? 'startGeojson'
                  : 'destinationGeojson']: geojson,
                drawPointType: null,
              }),
            );
          }}
          onError={message => {
            dispatch(toastActions.error({ message }));
          }}
          onCancel={() => {
            dispatch(
              setDataInputState({
                drawPointType: null,
              }),
            );
          }}
        />

        {startGeojson && (
          <VectorLayer
            geojson={startGeojson}
            visibleOnMap
            zIndex={10}
            style={{ ...startPointStyles }}
          />
        )}
        {destinationGeojson && (
          <VectorLayer
            geojson={destinationGeojson}
            visibleOnMap
            zIndex={10}
            style={{ ...destinationPointStyles }}
          />
        )}

        <RoutePopup />

        <MapFooter loading={isMapLoading} />
      </MapComponent>
    </div>
  );
}
