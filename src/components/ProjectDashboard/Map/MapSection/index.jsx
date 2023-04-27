/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { stringify } from 'wkt';
import { useDispatch, useSelector } from 'react-redux';
import { fromLonLat, transformExtent } from 'ol/proj';
import VectorTile from 'ol/layer/VectorTile';
import { Creators, Types } from '@Actions/projectMap';
import { mapStateSelector } from '@Selectors/projectMap';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher';
import CustomLayerSwitcher from '@Components/common/OpenLayersComponent/CustomLayerSwitcher';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import WMSTileLayer from '@Components/common/OpenLayersComponent/Layers/WMSTileLayer';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import {
  defaultStyles,
  getStyles,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import Spinner from '@Components/common/Spinner';
import CustomPopupUI from '@Components/common/OpenLayersComponent/Custom/CustomPopupUI';
import { checkIfLoading } from '@Utils/loaderSelector';
import CustomPopup from '@Components/common/OpenLayersComponent/Custom/CustomPopup/index';
import 'ol/ol.css';
import '@Components/common/OpenLayersComponent/map.css';
import MapFooter from '@Components/common/OpenLayersComponent/MapFooter';
import AddFeature from '@Components/common/OpenLayersComponent/CustomLayer/AddFeature';
import EditableLayer from '@Components/common/OpenLayersComponent/CustomLayer/EditableLayer';
// import DrawTool from '@Components/common/OpenLayersComponent/DrawTool';
import MaskedLayer from '@Components/common/OpenLayersComponent/CustomLayer/MaskedLayer';
import { apiURL } from '@Services';
import { FullScreen, defaults as defaultControls } from 'ol/control';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import MapLoader from '@Components/common/MapLoader';
import SidebarToggle from '../SidebarToggle';
import Toolbox from '../Toolbox';
import QueryResultPopup from '../QueryResultPopup';
import MapSidebar from '../MapSidebar';
import MapExportSection from '../MapExportSection';

const {
  setZoomToLayerId,
  getMapPopupDataRequest,
  setProjectMapState,
  getFeatureCollectionRequest,
} = Creators;

export default function MapSection() {
  const { mapRef, map, isMapLoading } = useOLMap({
    controls: defaultControls().extend([new FullScreen()]),
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  const mapState = useSelector(mapStateSelector);
  const zoomToLayerId = useSelector(state => state.projectMap.zoomToLayerId);
  const popupData = useSelector(state => state.projectMap.popupData);
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const hideSidebar = useSelector(state => state.projectMap.hideSidebar);
  const drawType = useSelector(state => state.projectMap.drawType);
  const refreshLayerId = useSelector(state => state.projectMap.refreshLayerId);
  const featureGeojson = useSelector(state => state.projectMap.featureGeojson);
  const editFeatureId = useSelector(state => state.projectMap.editFeatureId);
  const projectGeojson = useSelector(state => state.projectMap.projectGeojson);
  const toggleMapExport = useSelector(
    state => state.projectMap.toggleMapExport,
  );
  const organizationDetail = useSelector(
    state => state.organizationDashboard.organizationDetail,
  );
  const projectAreaLayerId = useSelector(
    state => state.projectMap.projectAreaLayerId,
  );
  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const queryResults = useSelector(
    state => state.projectMap.dataQuery.queryResults,
  );
  const featureGeometry = useSelector(
    state => state.projectMap.featureGeometry,
  );
  const resetMapExtent = useSelector(state => state.projectMap.resetMapExtent);
  const sidebarContent = useSelector(state => state.projectMap.sidebarContent);
  const isMapDataLoading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_PROJECT_THEMES_REQUEST,
      Types.GET_PROJECT_THEME_LAYERS_REQUEST,
      Types.GET_PROJECT_GEOJSON_REQUEST,
      // Types.GET_FEATURE_COLLECTION_REQUEST,
      // Types.GET_LAYER_ATTRIBUTE_FIELDS_REQUEST,
    ]),
  );
  const isPopupDataFetching = useSelector(state =>
    checkIfLoading(state, [Types.GET_MAP_POPUP_DATA_REQUEST]),
  );
  const [isMeaureEnabled, setIsMeasureEnabled] = useState(false);
  const dispatch = useDispatch();

  // zoom to project location on initial map load or map reset
  useEffect(() => {
    if (!map || !projectDetail || !resetMapExtent) return;
    const bbox = projectDetail?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        // duration: 3500,
        constrainResolution: true,
      });
      dispatch(setProjectMapState({ resetMapExtent: false }));
    }
  }, [map, projectDetail, resetMapExtent, dispatch]);

  // update map size on sidebar toggle
  useEffect(() => {
    if (!map) return () => {};
    const timer = setTimeout(() => {
      map.updateSize();
    }, 500);
    return () => clearTimeout(timer);
  }, [map, hideSidebar]);

  // zoom to layer id
  useEffect(() => {
    if (!map || !zoomToLayerId) return;
    const layer = mapState.find(item => item.id === zoomToLayerId);
    const bbox = layer?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        duration: 2000,
        constrainResolution: true,
      });
    }
    dispatch(setZoomToLayerId(null));
  }, [dispatch, map, mapState, zoomToLayerId]);

  // zoom to individual feature
  useEffect(() => {
    if (!map || !featureGeometry) return;
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(featureGeometry),
    });
    const zoomExtent = transformExtent(
      vectorSource.getExtent(),
      'EPSG:4326',
      'EPSG:3857',
    );

    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        duration: 2000,
        constrainResolution: true,
      });
    }
    dispatch(setProjectMapState({ featureGeometry: null }));
  }, [dispatch, map, featureGeometry]);

  // refresh vectortile after layer edit
  useEffect(() => {
    if (!map || !refreshLayerId) return;
    const layers = map.getLayers();
    layers.forEach(layer => {
      if (layer instanceof VectorTile) {
        const properties = layer.getProperties();
        if (properties.layerId === refreshLayerId) {
          layer.getSource().refresh();
          dispatch(setProjectMapState({ refreshLayerId: null }));
        }
      }
    });
  }, [dispatch, map, refreshLayerId]);

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

  const setLayerStyle = useCallback(
    (style, feature, resolution) => {
      const stylex = { ...style };
      const properties = feature.getProperties();
      const { id: featureId } = properties;
      if (editFeatureId === featureId) {
        stylex.fillOpacity = 0;
        stylex.lineOpacity = 0;
        stylex.icon = {};
      }
      stylex.labelField = 'label';
      return getStyles({
        style: stylex,
        feature,
        resolution,
      });
    },
    [editFeatureId],
  );

  return (
    <div
      className="naxatw-flex"
      style={{ height: `calc(100vh - ${projectHeaderHeight}px)` }}
    >
      {toggleMapExport && (
        <MapExportSection
          exportMap={map}
          legendData={mapState.filter(item => item.checked === true)}
          title={projectDetail?.name}
          topMargin={projectHeaderHeight}
          organizationLogo={organizationDetail?.cover_image}
          closeFunction={() =>
            dispatch(setProjectMapState({ toggleMapExport: false }))
          }
        />
      )}
      <MapSidebar />
      <div className="naxatw-w-full naxatw-relative">
        {/*
          {isMapDataLoading && (
            <div className="naxatw-absolute naxatw-w-full naxatw-top-4 naxatw-z-10 naxatw-flex naxatw-justify-center">
              <span className="naxatw-bg-white naxatw-p-3 naxatw-flex naxatw-items-center naxatw-gap-3 naxatw-rounded-md naxatw-shadow-3xl">
                <h5 className="">Loading</h5>
                <Spinner className="naxatw-w-6 naxatw-h-6 naxatw-fill-primary-400" />
              </span>
            </div>
        )}
      */}

        {isMapDataLoading && <MapLoader />}

        <MapComponent
          ref={mapRef}
          mapInstance={map}
          style={{
            height: `calc(100vh - ${projectHeaderHeight}px)`,
          }}
        >
          {!isMapDataLoading && <SidebarToggle />}

          {!isMapDataLoading && (
            <Toolbox
              map={map}
              onMeasureToggle={toggleState => setIsMeasureEnabled(toggleState)}
            />
          )}

          <QueryResultPopup />

          {!isMapDataLoading && <LayerSwitcherControl />}

          {!isMapDataLoading && <CustomLayerSwitcher />}

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
                zIndex={mapState.length + 10 - index}
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

          {queryResults.map(item => (
            <VectorTileLayer
              key={item.id}
              url={`${apiURL}maps/advance_filter_vectortile/{z}/{x}/{y}/?layer=${item.id}`}
              authToken={localStorage.getItem('userToken')}
              visibleOnMap={item.checked}
              style={item?.style || { ...defaultStyles }}
              zIndex={100}
              zoomToLayer
              bbox={item.bbox}
              // properties={{ layerId: item.id }}
            />
          ))}

          <AddFeature
            enable={drawType === 'add-feature'}
            geometryType={selectedLayer?.geom_type}
            style={
              selectedLayer?.style
                ? { ...selectedLayer.style }
                : { ...defaultStyles }
            }
            onDrawFinish={geojson => {
              const wktString = stringify(geojson);
              dispatch(
                setProjectMapState({
                  drawnFeatureWkt: wktString,
                  drawType: null,
                }),
              );
            }}
            onCancel={() => {
              dispatch(
                setProjectMapState({
                  selectedLayer: null,
                }),
              );
            }}
          />

          {/*
            <DrawTool
              geojson={featureGeojson}
              geometryType={selectedLayer?.geom_type || 'Polygon'}
              zIndex={100}
              style={selectedLayer?.style || { ...defaultStyles }}
              onChange={modifiedGeojson => {
                dispatch(
                  setProjectMapState({
                    modifiedFeatureGeojson: modifiedGeojson,
                    isFeatureModified: true,
                  }),
                );
              }}
              onCancel={() => {
                // dispatch(cancelSitePolygonEdit());
              }}
              onError={message => {
                // dispatch(toastActions.error({ message }));
              }}
            />
          */}

          <EditableLayer
            geojson={featureGeojson}
            geometryType={selectedLayer?.geom_type || 'Polygon'}
            zIndex={100}
            style={selectedLayer?.style || { ...defaultStyles }}
            onChange={modifiedGeojson => {
              dispatch(
                setProjectMapState({
                  modifiedFeatureGeojson: modifiedGeojson,
                  isFeatureModified: true,
                }),
              );
            }}
            onError={message => {
              // dispatch(toastActions.error({ message }));
            }}
          />

          {!isMapDataLoading && (
            <MaskedLayer
              enable={
                sidebarContent !== 'edit-feature' &&
                sidebarContent !== 'add-feature'
              }
              geojson={projectGeojson}
            />
          )}

          <CustomPopup
            fetchPopupData={properties => {
              const params = {
                feature_id: properties.id,
              };
              dispatch(getMapPopupDataRequest(params));
            }}
            popupUI={properties => getPopupUI(properties)}
            popupData={popupData}
            // openPopupFor={searchedId}
            // zoomedExtent={zoomedExtent}
            onPopupClose={() => {
              // console.log('closex');
            }}
            buttonText="Edit Feature"
            onButtonClick={properties => {
              const selectedFeature = mapState.find(
                layer => layer.id === properties.layer_id,
              );
              dispatch(
                setProjectMapState({
                  selectedLayer: selectedFeature,
                }),
              );
              dispatch(getFeatureCollectionRequest(properties.id));
            }}
            loading={isPopupDataFetching}
            closePopup={!!selectedLayer || !!featureGeojson || isMeaureEnabled}
            layerExceptionIds={[projectAreaLayerId]}
          />

          {!isMapDataLoading && <MapFooter loading={isMapLoading} />}
        </MapComponent>
      </div>
    </div>
  );
}
