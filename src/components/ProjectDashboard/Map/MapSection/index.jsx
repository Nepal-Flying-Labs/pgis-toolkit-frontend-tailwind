/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fromLonLat, transformExtent } from 'ol/proj';
import { Creators, Types } from '@Actions/projectMap';
import { mapStateSelector } from '@Selectors/projectMap';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import { projectHeaderHeight } from '@src/constants';
import Spinner from '@Components/common/Spinner';
import PopupUI from '@Components/common/OpenLayersComponent/Custom/PopupUI';
import { checkIfLoading } from '@Utils/loaderSelector';
import AsyncPopup from '@Components/common/OpenLayersComponent/Custom/AsyncPopup';
import 'ol/ol.css';
import '@Components/common/OpenLayersComponent/map.css';
import MapFooter from '@Components/common/OpenLayersComponent/MapFooter';
import SidebarToggle from '../SidebarToggle';

const { API_URL } = process.env;

const { setZoomToLayerId, getMapPopupDataRequest } = Creators;

export default function MapSection() {
  const { mapRef, map } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  const mapState = useSelector(mapStateSelector);
  const zoomToLayerId = useSelector(state => state.projectMap.zoomToLayerId);
  const popupData = useSelector(state => state.projectMap.popupData);
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const hideSidebar = useSelector(state => state.projectMap.hideSidebar);
  const isMapDataLoading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_PROJECT_THEMES_REQUEST,
      Types.GET_PROJECT_THEME_LAYERS_REQUEST,
    ]),
  );
  const isPopupDataFetching = useSelector(state =>
    checkIfLoading(state, [Types.GET_MAP_POPUP_DATA_REQUEST]),
  );
  const dispatch = useDispatch();

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

  return (
    <div className="naxatw-w-full naxatw-relative">
      {isMapDataLoading && (
        <div className="naxatw-absolute naxatw-w-full naxatw-top-4 naxatw-z-10 naxatw-flex naxatw-justify-center">
          <span className="naxatw-bg-white naxatw-p-3 naxatw-flex naxatw-items-center naxatw-gap-3 naxatw-rounded-md naxatw-shadow-3xl">
            <h5 className="">Loading</h5>
            <Spinner className="naxatw-w-6 naxatw-h-6 naxatw-fill-secondary-400" />
          </span>
        </div>
      )}

      <MapComponent
        ref={mapRef}
        mapInstance={map}
        style={{
          height: `calc(100vh - ${projectHeaderHeight})`,
        }}
      >
        <SidebarToggle />

        <LayerSwitcherControl />

        {mapState.map((item, index) => {
          return item.layer_type === 'Vector' ? (
            <VectorTileLayer
              key={item.id}
              url={`${API_URL}maps/layer_vectortile/{z}/{x}/{y}/?layer=${item.id}`}
              authToken={localStorage.getItem('userToken')}
              visibleOnMap={item.checked}
              style={
                item.id === selectedLayer?.id
                  ? selectedLayer.style
                  : item?.style || { ...defaultStyles }
              }
              zIndex={mapState.length + 10 - index}
            />
          ) : (
            ''
          );
        })}

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
            // dispatch(getSiteByIdRequest(properties.id));
          }}
          loading={isPopupDataFetching}
          // closePopup={!!siteGeojson || zoomToRegion}
        />

        <MapFooter />
      </MapComponent>
    </div>
  );
}
