/* eslint-disable no-nested-ternary */
import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { fromLonLat, transformExtent } from 'ol/proj';
import { Types } from '@Actions/projectMap';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher';
import CustomLayerSwitcher from '@Components/common/OpenLayersComponent/CustomLayerSwitcher';
import Spinner from '@Components/common/Spinner';
import { checkIfLoading } from '@Utils/loaderSelector';
import 'ol/ol.css';
import '@Components/common/OpenLayersComponent/map.css';
import MapFooter from '@Components/common/OpenLayersComponent/MapFooter';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import { apiURL } from '@Services';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import {
  defaultStyles,
  getStyles,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import { errorFeaturesMapStateSelector } from '@Selectors/analysis';

export default function MapSection() {
  const { mapRef, map, isMapLoading } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  const isMapDataLoading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_PROJECT_THEMES_REQUEST,
      Types.GET_PROJECT_THEME_LAYERS_REQUEST,
      Types.GET_PROJECT_GEOJSON_REQUEST,
    ]),
  );
  const selectedLayer = useSelector(state => state.analysis.selectedLayer);
  const errorFeaturesMapState = useSelector(errorFeaturesMapStateSelector);

  // zoom to selected layer on initial map load
  useEffect(() => {
    if (!map || !selectedLayer) return;
    const bbox = selectedLayer?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        // duration: 3500,
        constrainResolution: true,
      });
    }
  }, [map, selectedLayer]);

  const setLayerStyle = useCallback((style, feature, resolution) => {
    const stylex = { ...style };
    return getStyles({
      style: stylex,
      feature,
      resolution,
    });
  }, []);

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
          height: `calc(100vh - 6.2rem)`,
        }}
      >
        <LayerSwitcherControl />

        <CustomLayerSwitcher />

        <VectorTileLayer
          url={`${apiURL}maps/layer_vectortile/{z}/{x}/{y}/?layer=${selectedLayer.id}`}
          authToken={localStorage.getItem('userToken')}
          visibleOnMap
          setStyle={(feature, resolution) =>
            setLayerStyle(
              selectedLayer.style || { ...defaultStyles },
              feature,
              resolution,
            )
          }
          zIndex={10}
          // properties={{ layerId: item.id }}
        />

        {errorFeaturesMapState.map(({ type }) => (
          <VectorTileLayer
            key={type}
            url={`${apiURL}maps/error_features_vectortile/{z}/{x}/{y}/?layer=${selectedLayer.id}&type=${type}`}
            authToken={localStorage.getItem('userToken')}
            visibleOnMap
            setStyle={(feature, resolution) =>
              setLayerStyle(
                {
                  ...defaultStyles,
                  fillColor: '#FF0F0F',
                  lineColor: '#FF0F0F',
                  fillOpacity: 100,
                  lineOpacity: 100,
                  lineThickness: 1,
                },
                feature,
                resolution,
              )
            }
            zIndex={11}
            // properties={{ layerId: item.id }}
          />
        ))}
        <MapFooter loading={isMapLoading} />
      </MapComponent>
    </div>
  );
}
