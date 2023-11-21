/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';

import Mask from 'ol-ext/filter/Mask';
import { Fill } from 'ol/style';
import { isEmpty } from '@src/utils/commonUtils';
import { Feature, View } from 'ol';
import { MultiPolygon } from 'ol/geom';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';

export default function MaskedLayer({ map, geojson, enable }) {
  const [tileLayers, setTileLayers] = useState([]);
  const [maskedLayer, setMaskedLayer] = useState(null);
  const [featureExtent, setFeatureExtent] = useState(null);

  useEffect(() => {
    if (!map || !geojson) return () => {};
    // map.once('rendercomplete', () => {
    //   const data = map
    //     .getLayers()
    //     .getArray()
    //     .filter(item => item instanceof LayerGroup)[0]
    //     .getLayers()
    //     .getArray()
    //     .filter(tiles => tiles instanceof TileLayer);
    //   setTileLayers(data);
    // });
    const data = map
      .getLayers()
      .getArray()
      .filter(item => item instanceof LayerGroup)[0]
      .getLayers()
      .getArray()
      .filter(tiles => tiles instanceof TileLayer);
    setTileLayers(data);

    return () => {
      setTileLayers([]);
    };
  }, [map, geojson]);

  useEffect(() => {
    if (isEmpty(tileLayers) || !geojson) return;
    const feature = new GeoJSON().readFeatures(geojson, {
      featureProjection: get('EPSG:3857'),
    });
    if (isEmpty(feature)) return;
    let coordinatesX;
    let featureExtentx;
    // if length of feature is more than one extent is calclulated using different appraoch
    if (feature.length === 1) {
      const coords = feature.map(feat => feat.getGeometry().getCoordinates());
      coordinatesX = coords;
    } else {
      const coordinates = feature.map(feat => feat.getGeometry().getExtent());
      const reducedExtent = coordinates.reduce((acc, curr) => [
        Math.min(acc[0], curr[0]),
        Math.min(acc[1], curr[1]),
        Math.max(acc[2], curr[2]),
        Math.max(acc[3], curr[3]),
      ]);

      const coords = feature.map(feat => feat.getGeometry().getCoordinates());
      // const coords = dep.geometry.coordinates;
      const coordsX = [];
      coords.map(cord => {
        coordsX.push(...cord);
        return null;
      });
      coordinatesX = coordsX;
      featureExtentx = reducedExtent;
    }
    const f = new Feature(new MultiPolygon(coordinatesX));
    const maskedLayerx = new Mask({
      feature: f,
      fill: new Fill({
        color: [0, 0, 0, 0.22],
      }),
      inner: false,
    });

    featureExtentx =
      feature.length === 1 ? f.getGeometry().getExtent() : featureExtentx;

    setMaskedLayer(maskedLayerx);
    setFeatureExtent(featureExtentx);
    map.getView().fit(featureExtentx, {
      padding: [50, 50, 50, 50],
      constrainResolution: true,
    });
  }, [map, tileLayers, geojson]);

  useEffect(() => {
    if (!map || !maskedLayer || !featureExtent) return;
    if (enable) {
      tileLayers.map(item => item.removeFilter(maskedLayer));
      const currentZoom = map.getView().getZoom();
      map.setView(
        new View({
          center: map.getView().getCenter(),
          extent: [
            featureExtent[0] - 30000,
            featureExtent[1] - 30000,
            featureExtent[2] + 30000,
            featureExtent[3] + 30000,
          ],
          zoom: currentZoom,
          minZoom: currentZoom - 1,
        }),
      );
      tileLayers.map(tiles => tiles.addFilter(maskedLayer));
    } else {
      tileLayers.map(tiles => tiles.removeFilter(maskedLayer));
    }
    return () => {
      if (!isEmpty(tileLayers)) {
        tileLayers.map(item => item.removeFilter(maskedLayer));
        map.setView(
          new View({
            center: map.getView().getCenter(),
            extent: undefined,
            zoom: map.getView().getZoom(),
            minZoom: 0,
          }),
        );
      }
    };
  }, [map, enable, maskedLayer, tileLayers, featureExtent]);

  return null;
}

// /* eslint-disable react/prop-types */
// import { useEffect } from 'react';
// import LayerGroup from 'ol/layer/Group';
// import GeoJSON from 'ol/format/GeoJSON';
// import { get } from 'ol/proj';
// import { Fill, Style } from 'ol/style';
// import { OSM, Stamen, Vector as VectorSource } from 'ol/source';
// import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
// import { fromLonLat } from 'ol/proj';
// import { getVectorContext } from 'ol/render';
//
// export default function MaskedLayer({ map, geojson }) {
//   useEffect(() => {
//     if (!map || !geojson) return;
//     const clipLayer = new VectorLayer({
//       style: null,
//       source: new VectorSource({
//         features: new GeoJSON().readFeatures(geojson, {
//           featureProjection: get('EPSG:3857'),
//         }),
//       }),
//     });
//
//     const layers = map.getLayers().getArray();
//     const layerGroup = layers.find(layer => layer instanceof LayerGroup);
//     const layersx = layerGroup.getLayersArray();
//     const base = layersx.find(layer => layer.getProperties().visible);
//
//     clipLayer.getSource().on('addfeature', () => {
//       base.setExtent(clipLayer.getSource().getExtent());
//     });
//     const style = new Style({
//       fill: new Fill({
//         color: 'black',
//       }),
//     });
//
//     base.on('postrender', e => {
//       const vectorContext = getVectorContext(e);
//       e.context.globalCompositeOperation = 'destination-in';
//       clipLayer.getSource().forEachFeature(feature => {
//         vectorContext.drawFeature(feature, style);
//       });
//       e.context.globalCompositeOperation = 'source-over';
//     });
//   }, [map, geojson]);
//
//   return null;
// }
