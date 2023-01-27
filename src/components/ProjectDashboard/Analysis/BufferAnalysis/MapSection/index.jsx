/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fromLonLat, transformExtent } from 'ol/proj';
import {
  useOLMap,
  MapContainer as MapComponent,
} from '@Components/common/OpenLayersComponent';
import { startPointStyles } from '@src/constants/analysis';
import { Creators as BufferAnalysisCreators } from '@Actions/bufferAnalysis';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import VectorLayer from '@Components/common/OpenLayersComponent/Layers/VectorLayer';
import CircleMarker from '@Components/common/OpenLayersComponent/CustomLayer/CircleMarker';
import toastActions from '@Actions/toast';
import { analysisHeaderHeight } from '@src/constants';
import DrawTool from '@Components/common/OpenLayersComponent/DrawTool/index';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher/index';
import { isExtentValid } from '@Components/common/OpenLayersComponent/helpers/layerUtils';

import Scalebar from '@Components/common/OpenLayersComponent/Scalebar/index';
import { apiURL } from '@Services';

import '@Components/common/OpenLayersComponent/map.css';
import { mapStateSelector } from '@Selectors/analysis';
import {
  defaultStyles,
  getStyles,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import WMSTileLayer from '@Components/common/OpenLayersComponent/Layers/WMSTileLayer';
import BufferPopup from './BufferPopup/index';

const { setDataInputState, setResultsState } = BufferAnalysisCreators;

export default function MapSection() {
  const dispatch = useDispatch();
  const mapState = useSelector(mapStateSelector);

  const drawPoint = useSelector(
    state => state.bufferAnalysis.dataInput.drawPoint,
  );
  const originGeojson = useSelector(
    state => state.bufferAnalysis.dataInput.originGeojson,
  );

  const zoomToRouteId = useSelector(
    state => state.bufferAnalysis.results.zoomToRouteId,
  );

  const analysisResults = useSelector(
    state => state.bufferAnalysis.results.analysisResults,
  );

  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );

  const { mapRef, map } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 25,
  });
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);

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

  // zoom to buffer result layer
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
  // const setLayerStyle = useCallback((style, feature, resolution) => {
  //   const stylex = { ...style };
  //   // const properties = feature.getProperties();
  //   // const { id: featureId } = properties;
  //   // if (editFeatureId === featureId) {
  //   //   stylex.fillOpacity = 0;
  //   //   stylex.lineOpacity = 0;
  //   //   stylex.icon = {};
  //   // }
  //   return getStyles({
  //     style: stylex,
  //     feature,
  //     resolution,
  //   });
  // }, []);

  const setLayerStyle = useCallback((style, feature, resolution) => {
    const stylex = { ...style };
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
  return (
    <div className="naxatw-w-full naxatw-relative">
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
              &nbsp;save icon to save the buffer points.
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
        <LayerSwitcherControl />
        <Scalebar />
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
        {analysisResults.map(result =>
          result.buffer_areas.map((area, index) => (
            <CircleMarker
              key={index}
              coordinates={[area.origin[1], area.origin[0]]}
              visibleOnMap={area.checked}
              zIndex={10}
              style={area.originStyle}
              map={map}
            />
          )),
        )}

        {analysisResults.map(result =>
          result.buffer_areas.map(area => (
            <VectorTileLayer
              key={area.id}
              url={`${apiURL}maps/buffer_area_vectortile/{z}/{x}/{y}/?area=${area.id}`}
              authToken={localStorage.getItem('userToken')}
              visibleOnMap={area.checked}
              style={result.style}
              zIndex={4}
              // properties={{ layerId: selectedLayer.id }}
            />
          )),
        )}
        {analysisResults.map(result =>
          result.buffer_areas.map(area =>
            area.poi.map(poi =>
              poi.feature_mirror_ids.length > 0 ? (
                <VectorTileLayer
                  key={area.id}
                  url={`${apiURL}maps/feature_mirror_vectortile/{z}/{x}/{y}/?layer=${poi.layer_id}&sub_layer=&ids=${poi.feature_mirror_ids}`}
                  authToken={localStorage.getItem('userToken')}
                  visibleOnMap={result.checked}
                  setStyle={(feature, resolution) =>
                    setLayerStyle(
                      // item.id === selectedLayer?.id
                      // ? selectedLayer.style
                      { ...defaultStyles },
                      feature,
                      resolution,
                    )
                  }
                  zIndex={4}
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
              zIndex={10}
              style={{ ...startPointStyles }}
            />
          ))}

        <BufferPopup />
      </MapComponent>
    </div>
  );
}
