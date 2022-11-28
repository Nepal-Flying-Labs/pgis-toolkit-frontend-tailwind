/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';
import VectorTile from 'ol/layer/VectorTile';
import MVT from 'ol/format/MVT';
import VectorTileSource from 'ol/source/VectorTile';
import { isExtentValid } from '../helpers/layerUtils';
// import { getStyles, defaultStyles } from '../helpers/styleUtils';

const SitesVTLayer = ({
  map,
  url,
  // style = { ...defaultStyles },
  zIndex = 1,
  visibleOnMap = true,
  authToken,
  setStyle,
  zoomToSiteId = null,
  setZoomedExtent,
}) => {
  const [features, setFeatures] = useState([]);
  const [zoomToFeature, setZoomToFeature] = useState(null);

  useEffect(() => {
    setZoomToFeature(zoomToSiteId);
  }, [zoomToSiteId]);

  const vectorTileLayer = useMemo(
    () =>
      new VectorTile({
        renderMode: 'hybrid',
        // declutter: true,
      }),
    [],
  );

  vectorTileLayer.setProperties({ name: 'site' });

  // add source to layer
  useEffect(() => {
    if (!map) return;

    const requestHeader = new Headers();
    if (authToken) {
      requestHeader.append('Authorization', `Token ${authToken}`);
    }

    const vectorTileSource = new VectorTileSource({
      format: new MVT(),
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
              const featuresx = format.readFeatures(data, {
                extent,
                featureProjection: projection,
              });
              tile.setFeatures(featuresx);
            });
          });
        });
      },
    });
    vectorTileLayer.setSource(vectorTileSource);
  }, [map, url, vectorTileLayer, authToken]);

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
    if (!map || !visibleOnMap) return;
    vectorTileLayer.setStyle(setStyle);
  }, [map, setStyle, vectorTileLayer, visibleOnMap]);

  // // set style
  // useEffect(() => {
  //   if (!map || !visibleOnMap) return;
  //   vectorTileLayer.setStyle((feature, resolution) => getStyles({ style, feature, resolution }));
  // }, [map, style, vectorTileLayer, visibleOnMap]);

  // set z-index
  useEffect(() => {
    if (!map) return;
    vectorTileLayer.setZIndex(zIndex);
  }, [map, zIndex, vectorTileLayer]);

  useEffect(() => {
    if (!map || !vectorTileLayer) return;
    vectorTileLayer.getSource().on('tileloadend', evt => {
      const feature = evt.tile.getFeatures();
      const arr = feature.map(feat => ({
        id: feat.getProperties()?.id,
        extent: feat.getExtent(),
        properties: feat.getProperties(),
      }));
      if (arr.length) {
        setFeatures(prev => {
          const prevIds = prev.map(item => item.id);
          const newIds = arr.map(item => item.id);
          const newFeatures = arr.map(item =>
            prevIds.includes(item.id)
              ? { ...(prev.find(p => p.id === item.id) || {}), ...item }
              : { ...item },
          );
          const oldFeatures = prev.filter(item => !newIds.includes(item.id));
          return [...oldFeatures, ...newFeatures];
        });
      }
    });
  }, [map, vectorTileLayer]);

  useEffect(() => {
    if (!map || !zoomToFeature) return;

    const extent = features.find(
      item => item.properties.id === zoomToSiteId,
    )?.extent;

    if (extent && isExtentValid(extent)) {
      map.getView().fit(extent, {
        padding: [250, 250, 250, 250],
        duration: 700,
        constrainResolution: true,
        maxZoom: 20,
      });
      setZoomToFeature(null);
    }
    setZoomedExtent(extent);
    // eslint-disable-next-line
  }, [map, features, zoomToFeature]);

  // cleanup
  useEffect(
    () => () => map && map.removeLayer(vectorTileLayer),
    [map, vectorTileLayer],
  );

  return null;
};

export default SitesVTLayer;
