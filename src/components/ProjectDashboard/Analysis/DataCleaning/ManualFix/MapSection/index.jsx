/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fromLonLat, transformExtent } from 'ol/proj';
import { stringify } from 'wkt';
import { Creators as DataCleaningCreators, Types } from '@Actions/dataCleaning';
import { Creators as AnalysisCreators } from '@Actions/analysis';
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
import WMSTileLayer from '@Components/common/OpenLayersComponent/Layers/WMSTileLayer';
import VectorTile from 'ol/layer/VectorTile';
import CustomVTLayer from '@Components/common/OpenLayersComponent/CustomLayer/CustomVTLayer';
import VectorLayer from '@Components/common/OpenLayersComponent/Layers/VectorLayer';
import { apiURL } from '@Services';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';
import {
  defaultStyles,
  getStyles,
  selectEffectColor,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import {
  checkedFeatureIdsSelector,
  errorFeaturesMapStateSelector,
} from '@Selectors/dataCleaning';
import DrawTool from '@Components/common/OpenLayersComponent/DrawTool';
import { isEmpty } from '@Utils/commonUtils';
import { mapStateSelector } from '@Selectors/analysis';
import { featureSelectColor, errorFeatureColor } from '@src/constants/analysis';
import HelpBox from './HelpBox';

const { setManualFixState } = DataCleaningCreators;
const { setAnalysisState } = AnalysisCreators;

export default function MapSection() {
  const { mapRef, map, isMapLoading } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  const isMapDataLoading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_ERROR_FEATURES_REQUEST,
      Types.GET_LAYER_ATTRIBUTE_FIELDS_REQUEST,
      Types.GET_SELECTED_FEATURE_ATTRIBUTES_REQUEST,
      Types.GET_FEATURE_GEOJSON_REQUEST,
    ]),
  );
  const selectedLayer = useSelector(state => state.dataCleaning.selectedLayer);
  const errorFeaturesMapState = useSelector(errorFeaturesMapStateSelector);
  const refreshLayerId = useSelector(
    state => state.dataCleaning.manualFix.refreshLayerId,
  );
  const geojsonFeatures = useSelector(
    state => state.dataCleaning.manualFix.geojsonFeatures,
  );
  const mapState = useSelector(mapStateSelector);
  const zoomToLayerId = useSelector(state => state.analysis.zoomToLayerId);
  const featureBbox = useSelector(state => state.dataCleaning.featureBbox);
  const selectedError = useSelector(
    state => state.dataCleaning.manualFix.selectedError,
  );
  const startEditing = useSelector(
    state => state.dataCleaning.manualFix.startEditing,
  );
  const checkedFeatureIds = useSelector(checkedFeatureIdsSelector);
  const dispatch = useDispatch();

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

  // zoom to layer
  useEffect(() => {
    if (!map || !zoomToLayerId) return;
    const bbox = mapState.find(item => item.id === zoomToLayerId)?.bbox;
    if (!bbox) return;
    const zoomExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        duration: 1000,
        constrainResolution: true,
      });
      dispatch(
        setAnalysisState({
          zoomToLayerId: null,
        }),
      );
    }
  }, [map, zoomToLayerId, mapState, dispatch]);

  // zoom to feature
  useEffect(() => {
    if (!map || !featureBbox) return;
    const zoomExtent = transformExtent(featureBbox, 'EPSG:4326', 'EPSG:3857');
    if (isExtentValid(zoomExtent)) {
      map.getView().fit(zoomExtent, {
        padding: [50, 50, 50, 50],
        duration: 1000,
        constrainResolution: true,
      });
      dispatch(
        setManualFixState({
          featureBbox: null,
        }),
      );
    }
  }, [map, featureBbox, dispatch]);

  // refresh vectortile after layer edit
  useEffect(() => {
    if (!map || !refreshLayerId) return;
    const layers = map.getLayers();
    layers.forEach(layer => {
      if (layer instanceof VectorTile) {
        const properties = layer.getProperties();
        if (properties.layerId === refreshLayerId) {
          layer.getSource().refresh();
          dispatch(setManualFixState({ refreshLayerId: null }));
        }
      }
    });
  }, [dispatch, map, refreshLayerId]);

  const setLayerStyle = useCallback(
    (style, feature, resolution) => {
      const stylex = { ...style };
      const featureId = feature.getId();
      if (startEditing && selectedError?.id && selectedError.id === featureId) {
        stylex.fillOpacity = 0;
        stylex.lineOpacity = 0;
        stylex.icon = {};
      } else if (
        checkedFeatureIds.includes(feature.getProperties()?.id || featureId)
      ) {
        stylex.fillColor = featureSelectColor;
        stylex.lineColor = featureSelectColor;
        stylex.icon = {};
      }
      return getStyles({
        style: stylex,
        feature,
        resolution,
      });
    },
    [selectedError, startEditing, checkedFeatureIds],
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
          height: `calc(100vh - 6.2rem)`,
        }}
      >
        <LayerSwitcherControl />

        <CustomLayerSwitcher />

        <HelpBox />

        {mapState.map((item, index) =>
          item.layer_type === 'Vector' ? (
            <VectorTileLayer
              key={item.id}
              url={`${apiURL}maps/layer_vectortile/{z}/{x}/{y}/?layer=${item.id}`}
              authToken={localStorage.getItem('userToken')}
              visibleOnMap={item.checked}
              // setStyle={(feature, resolution) =>
              //   setLayerStyle(
              //     item.id === selectedLayer?.id
              //       ? selectedLayer.style
              //       : item?.style || { ...defaultStyles },
              //     feature,
              //     resolution,
              //   )
              // }
              style={item?.style || { ...defaultStyles }}
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

        <CustomVTLayer
          url={`${apiURL}maps/feature_mirror_vectortile/{z}/{x}/{y}/?layer=${selectedLayer.id}`}
          authToken={localStorage.getItem('userToken')}
          visibleOnMap
          setStyle={(feature, resolution) =>
            setLayerStyle(
              selectedLayer.style || { ...defaultStyles },
              feature,
              resolution,
            )
          }
          // style={selectedLayer.style}
          zIndex={10}
          properties={{ layerId: selectedLayer.id }}
          // renderMode="vector"
          hoverEffect={!!selectedError?.id && !geojsonFeatures}
          hoverExceptionIds={[selectedError?.id]}
          onFeatureSelect={features => {
            dispatch(
              setManualFixState({
                selectedFeaturesForSnap: features,
              }),
            );
          }}
        />

        {errorFeaturesMapState.map(({ type }) => (
          <VectorTileLayer
            key={type}
            url={`${apiURL}maps/error_features_vectortile/{z}/{x}/{y}/?layer=${selectedLayer.id}&type=${type}`}
            authToken={localStorage.getItem('userToken')}
            visibleOnMap={!selectedError?.id}
            setStyle={(feature, resolution) =>
              setLayerStyle(
                {
                  ...selectedLayer.style,
                  fillColor: errorFeatureColor,
                  lineColor: errorFeatureColor,
                  fillOpacity: 100,
                  lineOpacity: 100,
                },
                feature,
                resolution,
              )
            }
            zIndex={11}
            properties={{ layerId: selectedLayer.id }}
          />
        ))}

        <DrawTool
          enable={startEditing}
          geojson={selectedError?.geojson}
          geometryType={selectedLayer.geom_type}
          zIndex={100}
          style={{ ...selectedLayer.style, lineColor: '#ffff00' }}
          toolboxContents={['add', 'drag', 'edit', 'extend', 'delete', 'undo']}
          onChange={geojson => {
            if (geojson.type === 'FeatureCollection') {
              const wktStrings = geojson.features.map(item => stringify(item));
              dispatch(
                setManualFixState({
                  drawnFeatureWkt: wktStrings,
                }),
              );
            } else {
              const wktString = stringify(geojson);
              dispatch(
                setManualFixState({
                  drawnFeatureWkt: wktString,
                }),
              );
            }
          }}
        />

        {geojsonFeatures?.map((item, idx) => (
          <VectorLayer
            key={idx}
            geojson={item}
            visibleOnMap
            zIndex={11}
            properties={{ layerId: 'snaplayer' }}
            style={
              !isEmpty(selectedLayer.style)
                ? {
                    ...selectedLayer.style,
                    fillColor: selectEffectColor,
                    fillOpacity: 100,
                    lineColor: selectEffectColor,
                    lineOpacity: 100,
                    lineThickness: +selectedLayer.style.lineThickness + 2,
                  }
                : {
                    ...defaultStyles,
                    fillColor: selectEffectColor,
                    fillOpacity: 100,
                    lineColor: selectEffectColor,
                    lineOpacity: 100,
                    lineThickness: +defaultStyles.lineThickness + 2,
                  }
            }
          />
        ))}

        <MapFooter loading={isMapLoading} />
      </MapComponent>
    </div>
  );
}
