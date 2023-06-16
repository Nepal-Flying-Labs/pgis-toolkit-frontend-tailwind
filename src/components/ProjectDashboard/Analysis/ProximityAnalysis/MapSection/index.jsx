/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fromLonLat, transformExtent } from 'ol/proj';
import { useParams } from 'react-router';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import { startPointStyles } from '@src/constants/analysis';
import { Creators as ProximityAnalysisCreators } from '@Actions/proximityAnalysis';
import {
  Creators as MapCreators,
  Types as MapTypes,
} from '@Actions/projectMap';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import VectorLayer from '@Components/common/OpenLayersComponent/Layers/VectorLayer';
import CircleMarker from '@Components/common/OpenLayersComponent/CustomLayer/CircleMarker';
import toastActions from '@Actions/toast';
import { analysisHeaderHeight } from '@src/constants';
import DrawTool from '@Components/common/OpenLayersComponent/DrawTool/index';
import MeasureControl from '@Components/common/OpenLayersComponent/Control/MeasureControl';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher/index';
import CustomLayerSwitcher from '@Components/common/OpenLayersComponent/CustomLayerSwitcher';

import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';

import Scalebar from '@Components/common/OpenLayersComponent/Scalebar/index';
import { apiURL } from '@Services';

import '@Components/common/OpenLayersComponent/map.css';
import { mapStateSelector } from '@Selectors/analysis';
import {
  defaultStyles,
  getStyles,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import CustomPopup from '@Components/common/OpenLayersComponent/Custom/CustomPopup/index';
import CustomPopupUI from '@Components/common/OpenLayersComponent/Custom/CustomPopupUI/index';
import Spinner from '@Components/common/Spinner/index';
import { checkIfLoading } from '@Utils/loaderSelector';
import WMSTileLayer from '@Components/common/OpenLayersComponent/Layers/WMSTileLayer';
import MaskedLayer from '@Components/common/OpenLayersComponent/CustomLayer/MaskedLayer';
import MapFooter from '@Components/common/OpenLayersComponent/MapFooter';
import SidebarToggle from '../../SidebarToggle/index';
import ProximityPopup from './ProximityPopup/index';
import InfoContent from '../../InfoContent/index';

const { setDataInputState, setResultsState } = ProximityAnalysisCreators;

const { getMapPopupDataRequest } = MapCreators;

export default function MapSection() {
  const { analysisType } = useParams();
  const dispatch = useDispatch();
  const mapState = useSelector(mapStateSelector);
  const projectGeojson = useSelector(state => state.analysis.projectGeojson);
  const drawPoint = useSelector(
    state => state.proximityAnalysis.dataInput.drawPoint,
  );
  const originGeojson = useSelector(
    state => state.proximityAnalysis.dataInput.originGeojson,
  );
  const activeTab = useSelector(state => state.proximityAnalysis.activeTab);
  const zoomToProximity = useSelector(
    state => state.proximityAnalysis.results.zoomToProximity,
  );
  const analysisResults = useSelector(
    state => state.proximityAnalysis.results.analysisResults,
  );
  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const showResultsPopup = useSelector(
    state => state.proximityAnalysis.results.showResultsPopup,
  );
  const poiLayers = useSelector(state => state.proximityAnalysis.poiLayers);
  const hideSidebar = useSelector(state => state.analysis.hideSidebar);
  const popupData = useSelector(state => state.projectMap.popupData);
  const isPopupDataFetching = useSelector(state =>
    checkIfLoading(state, [MapTypes.GET_MAP_POPUP_DATA_REQUEST]),
  );
  const featureGeojson = useSelector(state => state.projectMap.featureGeojson);
  // const [isMeaureEnabled, setIsMeasureEnabled] = useState(false);
  const projectAreaLayerId = useSelector(
    state => state.analysis.projectAreaLayerId,
  );

  const { mapRef, map, isMapLoading } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  global.map = map;
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);

  // update map size on sidebar toggle
  useEffect(() => {
    if (!map) return () => {};
    const timer = setTimeout(() => {
      map.updateSize();
    }, 500);
    return () => clearTimeout(timer);
  }, [map, hideSidebar]);

  // zoom to project area
  useEffect(() => {
    if (!map || !projectDetail) return;
    const bbox = projectDetail?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        duration: 2000,
        constrainResolution: true,
      });
    }
  }, [dispatch, map, projectDetail]);

  // zoom to proximity result layer
  useEffect(() => {
    if (!map || !zoomToProximity) return;
    const bbox = zoomToProximity?.bbox;
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
          zoomToProximity: null,
        }),
      );
    }
  }, [map, zoomToProximity, dispatch]);

  const setLayerStyle = useCallback((style, feature, resolution) => {
    const stylex = { ...style };
    // eslint-disable-next-line no-unused-vars
    const properties = feature.getProperties();
    // const { id: featureId } = properties;
    // if (editFeatureId === featureId) {
    //   stylex.fillOpacity = 0;
    //   stylex.lineOpacity = 0;
    //   stylex.icon = {};
    // }
    return getStyles({
      style: stylex,
      feature,
      resolution,
    });
  }, []);

  const getLayerStyles = layerId => {
    const style = mapState.find(item => item.id === layerId)?.style;
    return style || { ...defaultStyles };
  };

  const getPopupUI = useCallback(
    properties => {
      const { id } = properties;
      return isPopupDataFetching ? (
        <div
          style={{
            height: '170px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner className="naxatw-w-8 naxatw-h-8 naxatw-fill-secondary-400" />
        </div>
      ) : (
        <CustomPopupUI data={popupData} />
      );
    },
    [popupData, isPopupDataFetching], // eslint-disable-line
  );

  return (
    <div className="naxatw-w-full naxatw-relative">
      {activeTab === 'dataInput' && <InfoContent />}

      <MapComponent
        ref={mapRef}
        mapInstance={map}
        style={{
          height: `calc(100vh - ${analysisHeaderHeight})`,
        }}
      >
        {drawPoint && (
          <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-bg-inherit naxatw-w-full naxatw-absolute naxatw-z-10">
            <p className="naxatw-p-3 naxatw-bg-white naxatw-w-fit naxatw-rounded-lg naxatw-mt-1 naxatw-text-center naxatw-flex naxatw-justify-center">
              Please click on&nbsp;<i className="material-icons">save</i>
              &nbsp;save icon to save the proximity points.
            </p>
          </div>
        )}
        <DrawTool
          enable={drawPoint}
          // geojson={featureGeojson}
          geometryType="Point"
          selectedDrawType="add-feature"
          zIndex={10}
          style={{ ...startPointStyles }}
          onSave={geojson => {
            dispatch(
              setDataInputState({
                originGeojson: originGeojson
                  ? [
                      ...originGeojson,
                      {
                        id: originGeojson.length + 1,
                        name: `Coordinate ${originGeojson.length + 1}`,
                        geojson,
                      },
                    ]
                  : [{ id: 1, name: 'Coordinate 1', geojson }],
                drawPoint: false,
              }),
            );
          }}
          onError={message => {
            dispatch(toastActions.error({ message }));
          }}
          onCancel={() => {
            dispatch(
              setDataInputState({
                drawPoint: false,
              }),
            );
          }}
        />

        <CustomLayerSwitcher />
        <SidebarToggle />
        <div
          className="naxatw-absolute naxatw-bottom-44 naxatw-left-4 naxatw-z-10 
                    naxatw-cursor-pointer naxatw-h-10 naxatw-bg-white naxatw-rounded-lg 
                   naxatw-text-grey-800  naxatw-border naxatw-border-grey-300 hover:naxatw-bg-grey-100"
        >
          <MeasureControl
            map={map}
            buttonText={
              <i className="material-icons naxatw-block naxatw-p-2 naxatw-rounded-lg !naxatw-pt-1">
                straighten
              </i>
            }
            measureBoth
            direction="right"
            // onMeasureToggle={onMeasureToggle}
          />
        </div>
        <LayerSwitcherControl />
        <Scalebar />
        <CustomPopup
          fetchPopupData={properties => {
            const params = {
              feature_id: properties.feature_id
                ? properties.feature_id
                : properties.id,
            };
            dispatch(getMapPopupDataRequest(params));
          }}
          popupUI={properties => getPopupUI(properties)}
          popupData={popupData}
          onPopupClose={() => {
            // console.log('closex');
          }}
          loading={isPopupDataFetching}
          closePopup={!!selectedLayer || !!featureGeojson || drawPoint}
          layerExceptionIds={[projectAreaLayerId]}
        />
        {mapState.map((item, index) =>
          item.layer_type === 'Vector' ? (
            <VectorTileLayer
              key={item.id}
              url={`${apiURL}maps/layer_vectortile/{z}/{x}/{y}/?layer=${item.id}`}
              authToken={localStorage.getItem('userToken')}
              visibleOnMap={item.checked}
              setStyle={(feature, resolution) =>
                setLayerStyle(
                  item.id === selectedLayer?.id
                    ? selectedLayer.style
                    : item?.style || { ...defaultStyles },
                  feature,
                  resolution,
                )
              }
              // style={
              //   item.id === selectedLayer?.id
              //     ? selectedLayer.style
              //     : item?.style || { ...defaultStyles }
              // }
              zIndex={
                item.id === projectAreaLayerId
                  ? 10
                  : mapState.length + 10 - index
              }
              properties={{ layerId: item.id }}
            />
          ) : item.layer_type === 'WMS' ? (
            <WMSTileLayer
              key={item.id}
              url={item.url}
              visibleOnMap={item.checked}
            />
          ) : (
            ''
          ),
        )}

        {poiLayers?.map(item =>
          item.layer_type === 'Vector' ? (
            <VectorTileLayer
              key={item.id}
              url={`${apiURL}maps/layer_vectortile/{z}/{x}/{y}/?layer=${item.id}`}
              authToken={localStorage.getItem('userToken')}
              visibleOnMap={item.checked}
              setStyle={(feature, resolution) =>
                setLayerStyle(
                  item.id === selectedLayer?.id
                    ? selectedLayer.style
                    : item?.style || { ...defaultStyles },
                  feature,
                  resolution,
                )
              }
              // style={
              //   item.id === selectedLayer?.id
              //     ? selectedLayer.style
              //     : item?.style || { ...defaultStyles }
              // }
              zIndex={10}
              properties={{ layerId: item.id }}
            />
          ) : item.layer_type === 'WMS' ? (
            <WMSTileLayer
              key={item.id}
              url={item.url}
              visibleOnMap={item.checked}
            />
          ) : (
            ''
          ),
        )}

        {analysisResults.results.map(result =>
          result.proximity_areas?.map(area =>
            area.origin.map((areaOrigin, index) => (
              <CircleMarker
                key={index}
                coordinates={[areaOrigin[1], areaOrigin[0]]}
                visibleOnMap={area.checked}
                zIndex={10}
                style={area.originStyle}
                map={map}
              />
            )),
          ),
        )}

        {analysisResults.results.map(result =>
          result.proximity_areas?.map(area => (
            <VectorTileLayer
              key={area.id}
              url={`${apiURL}maps/proximity_area_vectortile/{z}/{x}/{y}/?area=${area.id}`}
              authToken={localStorage.getItem('userToken')}
              visibleOnMap={area.checked}
              style={result.style}
              zIndex={4}
              // properties={{ layerId: selectedLayer.id }}
            />
          )),
        )}
        {analysisResults.results.map(result =>
          result.proximity_areas?.map(area =>
            area.poi.map(poi =>
              poi.feature_mirror_ids.length > 0 ? (
                <VectorTileLayer
                  key={poi.layer_id}
                  url={`${apiURL}maps/feature_mirror_vectortile/{z}/{x}/{y}/?layer=${poi.layer_id}&sub_layer=&ids=${poi.feature_mirror_ids}`}
                  authToken={localStorage.getItem('userToken')}
                  visibleOnMap={area.checked}
                  style={getLayerStyles(poi.layer_id)}
                  zIndex={40}
                  // properties={{ layerId: selectedLayer.id }}
                />
              ) : null,
            ),
          ),
        )}

        {originGeojson &&
          originGeojson.map(origin => (
            <VectorLayer
              key={origin.id}
              geojson={origin.geojson}
              visibleOnMap
              zIndex={40}
              style={{ ...startPointStyles }}
            />
          ))}
        <MaskedLayer geojson={projectGeojson} />
        {activeTab === 'results' && showResultsPopup && <ProximityPopup />}

        <MapFooter loading={isMapLoading} />
      </MapComponent>
    </div>
  );
}
