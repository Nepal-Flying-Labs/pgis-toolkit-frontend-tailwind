/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
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
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import {
  defaultStyles,
  getStyles,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import Spinner from '@Components/common/Spinner';
import PopupUI from '@Components/common/OpenLayersComponent/Custom/PopupUI';
import { checkIfLoading } from '@Utils/loaderSelector';
import AsyncPopup from '@Components/common/OpenLayersComponent/Custom/AsyncPopup';
import 'ol/ol.css';
import '@Components/common/OpenLayersComponent/map.css';
import MapFooter from '@Components/common/OpenLayersComponent/MapFooter';
import AddFeature from '@Components/common/OpenLayersComponent/CustomLayer/AddFeature';
import EditableLayer from '@Components/common/OpenLayersComponent/CustomLayer/EditableLayer';
import MaskedLayer from '@Components/common/OpenLayersComponent/CustomLayer/MaskedLayer';
import SidebarToggle from '../SidebarToggle';
import Toolbox from '../Toolbox';

const { API_URL } = process.env;

const {
  setZoomToLayerId,
  getMapPopupDataRequest,
  setProjectMapState,
  getFeatureCollectionRequest,
} = Creators;

export default function MapSection() {
  const { mapRef, map, isMapLoading } = useOLMap({
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
  const projectAreaLayerId = useSelector(
    state => state.projectMap.projectAreaLayerId,
  );
  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const isMapDataLoading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_PROJECT_THEMES_REQUEST,
      Types.GET_PROJECT_THEME_LAYERS_REQUEST,
      Types.GET_PROJECT_GEOJSON_REQUEST,
    ]),
  );
  const isPopupDataFetching = useSelector(state =>
    checkIfLoading(state, [Types.GET_MAP_POPUP_DATA_REQUEST]),
  );
  const dispatch = useDispatch();

  // // zoom to project location on initial map load
  // useEffect(() => {
  //   if (!map || !projectDetail) return;
  //   const bbox = projectDetail?.bbox;
  //   if (!bbox) return;
  //   const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
  //   if (isExtentValid(zoomExtent)) {
  //     map.getView().fit(zoomExtent, {
  //       padding: [50, 50, 50, 50],
  //       duration: 3500,
  //       constrainResolution: true,
  //     });
  //   }
  // }, [map, projectDetail]);

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
        duration: 3500,
        constrainResolution: true,
      });
    }
    dispatch(setZoomToLayerId(null));
  }, [dispatch, map, mapState, zoomToLayerId]);

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
        <PopupUI data={popupData} />
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
      return getStyles({
        style: stylex,
        feature,
        resolution,
      });
    },
    [editFeatureId],
  );

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
          height: `calc(100vh - ${projectHeaderHeight}px)`,
        }}
      >
        <SidebarToggle />

        <Toolbox />

        <LayerSwitcherControl />

        {mapState.map((item, index) =>
          item.layer_type === 'Vector' ? (
            <VectorTileLayer
              key={item.id}
              url={`${API_URL}maps/layer_vectortile/{z}/{x}/{y}/?layer=${item.id}`}
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
          ) : (
            ''
          ),
        )}

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

        <MaskedLayer geojson={projectGeojson} />

        <AsyncPopup
          fetchPopupData={properties => {
            const params = {
              feature_id: properties.id,
            };
            dispatch(getMapPopupDataRequest(params));
          }}
          popupUI={properties => getPopupUI(properties)}
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
          closePopup={!!selectedLayer || !!featureGeojson}
          layerExceptionIds={[projectAreaLayerId]}
        />

        <MapFooter loading={isMapLoading} />
      </MapComponent>
    </div>
  );
}
