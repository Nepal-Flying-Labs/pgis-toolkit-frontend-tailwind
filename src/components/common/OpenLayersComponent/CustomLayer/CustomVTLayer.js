/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useEffect, useMemo, useRef } from 'react';
// import * as olExtent from 'ol/extent';
import VectorTile from 'ol/layer/VectorTile';
import MVT from 'ol/format/MVT';
import Feature from 'ol/Feature';
import VectorTileSource from 'ol/source/VectorTile';
import { transformExtent } from 'ol/proj';
import getSvgImageIcon from '../helpers/getSvgImageIcon';
import { getStyles, defaultStyles } from '../helpers/styleUtils';
import { isExtentValid } from '../helpers/layerUtils';
import checkIfSvgUrl from '../helpers/checkIfSvgUrl';
// import { isExtentValid } from '../helpers/layerUtils';

const hoverEffectColor = '#7BCBC3';
const selectColor = '#fde047';

export default function CustomVTLayer({
  map,
  url,
  style = { ...defaultStyles },
  zIndex = 1,
  visibleOnMap = true,
  authToken,
  setStyle,
  zoomToLayer = false,
  bbox = null,
  properties,
  renderMode = 'hybrid',
  hoverEffect = false,
}) {
  const hoveredFeatures = useRef({});
  const selectedFeatures = useRef({});

  const vectorTileLayer = useMemo(
    () =>
      new VectorTile({
        renderMode,
        // declutter: true,
      }),
    [renderMode],
  );

  // add source to layer
  useEffect(() => {
    if (!map) return;

    const requestHeader = new Headers();
    if (authToken) {
      requestHeader.append('Authorization', `Bearer ${authToken}`);
    }

    const vectorTileSource = new VectorTileSource({
      format: new MVT({
        idProperty: 'id',
        featureClass: Feature,
      }),
      maxZoom: 19,
      url,
      transition: 0,
      tileLoadFunction: (tile, vtUrl) => {
        tile.setLoader((extent, resolution, projection) => {
          fetch(vtUrl, {
            headers: requestHeader,
          }).then(response => {
            response.arrayBuffer().then(data => {
              const format = tile.getFormat();
              const features = format.readFeatures(data, {
                extent,
                featureProjection: projection,
              });
              tile.setFeatures(features);
            });
          });
        });
      },
    });
    vectorTileLayer.setSource(vectorTileSource);
  }, [map, url, authToken, vectorTileLayer]);

  // add layer to map
  useEffect(() => {
    if (!map) return;
    if (visibleOnMap) {
      map.addLayer(vectorTileLayer);
    } else {
      map.removeLayer(vectorTileLayer);
    }
  }, [map, visibleOnMap, vectorTileLayer]);

  // // set style
  useEffect(() => {
    if (!map || !visibleOnMap || !setStyle) return;
    vectorTileLayer.setStyle(setStyle);
  }, [map, setStyle, vectorTileLayer, visibleOnMap]);

  // set style
  useEffect(() => {
    if (!map || !visibleOnMap || setStyle) return;
    async function setAsyncStyle() {
      if (style?.icon?.url && style?.icon?.fillColor) {
        const iconUrl = style.icon.url;
        const isSVGIcon = checkIfSvgUrl(iconUrl);
        if (isSVGIcon) {
          const svgString = await getSvgImageIcon(
            iconUrl,
            style.icon.fillColor || '#333333',
          );
          vectorTileLayer.setStyle((feature, resolution) =>
            getStyles({
              style: { ...style, icon: { ...style.icon, url: svgString } },
              feature,
              resolution,
            }),
          );
        }
      } else {
        vectorTileLayer.setStyle((feature, resolution) =>
          getStyles({ style, feature, resolution }),
        );
      }
    }
    setAsyncStyle();
  }, [map, style, vectorTileLayer, visibleOnMap, setStyle]);

  // set z-index
  useEffect(() => {
    if (!map) return;
    vectorTileLayer.setZIndex(zIndex);
  }, [map, zIndex, vectorTileLayer]);

  // set properties to layer
  useEffect(() => {
    if (!vectorTileLayer || !properties) return;
    vectorTileLayer.setProperties(properties);
  }, [vectorTileLayer, properties]);

  // zoom to layer
  useEffect(() => {
    if (!map || !vectorTileLayer || !zoomToLayer || !bbox) return;
    const transformedExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
    if (!isExtentValid(transformedExtent)) return;
    map.getView().fit(transformedExtent, {
      padding: [50, 50, 50, 50],
      duration: 900,
      constrainResolution: true,
    });
  }, [map, vectorTileLayer, zoomToLayer, bbox]);

  // add hover effect
  useEffect(() => {
    if (!map || !vectorTileLayer || !hoverEffect) return;
    const hoverLayer = new VectorTile({
      map,
      renderMode: 'vector',
      source: vectorTileLayer.getSource(),
      style: (feature, resolution) => {
        if (feature.getId() in hoveredFeatures.current) {
          return getStyles({
            style: {
              ...style,
              fillColor: hoverEffectColor,
              fillOpacity: 100,
              lineColor: hoverEffectColor,
              lineOpacity: 100,
              lineThickness: style.lineThickness + 1,
            },
            feature,
            resolution,
          });
        }
      },
    });
    map.on('pointermove', event => {
      vectorTileLayer.getFeatures(event.pixel).then(features => {
        if (!features.length) {
          hoveredFeatures.current = {};
          hoverLayer.changed();
          return;
        }
        const feature = features[0];
        if (!feature) {
          return;
        }
        const fid = feature.getId();
        hoveredFeatures.current[fid] = feature;
        hoverLayer.changed();
      });
    });
  }, [map, vectorTileLayer, hoverEffect, style]);

  // add select effect
  useEffect(() => {
    if (!map || !vectorTileLayer || !hoverEffect) return;
    const selectionLayer = new VectorTile({
      map,
      renderMode: 'vector',
      source: vectorTileLayer.getSource(),
      style: (feature, resolution) => {
        if (feature.getId() in selectedFeatures.current) {
          return getStyles({
            style: {
              ...style,
              fillColor: selectColor,
              fillOpacity: 100,
              lineColor: selectColor,
              lineOpacity: 100,
              lineThickness: style.lineThickness + 1,
            },
            feature,
            resolution,
          });
        }
      },
    });
    map.on('singleclick', event => {
      vectorTileLayer.getFeatures(event.pixel).then(features => {
        if (!features.length) {
          return;
        }
        const feature = features[0];
        if (!feature) {
          return;
        }
        const fid = feature.getId();
        if (fid in selectedFeatures.current) {
          delete selectedFeatures.current[fid];
          selectionLayer.changed();
        } else {
          selectedFeatures.current[fid] = feature;
          selectionLayer.changed();
        }
      });
    });
  }, [map, vectorTileLayer, hoverEffect, style]);

  // cleanup
  useEffect(
    () => () => map && map.removeLayer(vectorTileLayer),
    [map, vectorTileLayer],
  );

  return null;
}
