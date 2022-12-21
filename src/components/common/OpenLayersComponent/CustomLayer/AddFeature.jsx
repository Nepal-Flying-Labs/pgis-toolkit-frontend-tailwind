/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { Draw } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { getStyles } from '../helpers/styleUtils';
import getFeatureGeojson from '../helpers/getFeatureGeojson';

export default function AddFeature({
  map,
  style,
  enable,
  geometryType,
  onDrawFinish,
  // onCancel,
}) {
  const [vectorLayer, setVectorLayer] = useState(null);
  const [drawType, setDrawType] = useState(null);
  const [drawnFeature, setDrawnFeature] = useState(null);

  useEffect(() => {
    if (!map || !enable || !geometryType) return;
    setDrawType(geometryType);
    const source = new VectorSource({ wrapX: false });
    const vector = new VectorLayer({
      source,
      style: (feature, resolution) => getStyles({ style, feature, resolution }),
    });
    setVectorLayer(vector);
    map.addLayer(vector);
  }, [map, enable, style, geometryType]);

  // initialize draw instance
  const draw = useMemo(
    () =>
      new Draw({
        source: vectorLayer?.getSource(),
        type: geometryType || 'Point',
      }),
    [vectorLayer, geometryType],
  );

  // add interaction
  useEffect(() => {
    if (!map || !drawType) return;
    map.addInteraction(draw);
  }, [map, draw, drawType]);

  // on draw end
  useEffect(() => {
    draw.on('drawend', e => {
      const { feature } = e;
      setDrawnFeature(feature);
      map.removeInteraction(draw);
      setDrawType(null);
      const featureGeojson = getFeatureGeojson(feature);
      onDrawFinish(featureGeojson);
      // const extent = feature.getGeometry().getExtent();
      // const center = getCenter(extent);
      // overlay.setPosition(center);
      // map.addOverlay(overlay);
    });
  }, [draw, map, onDrawFinish]);

  // const handleSave = () => {
  //   const featureGeojson = getFeatureGeojson(drawnFeature);
  //   map.removeInteraction(draw);
  //   map.removeOverlay(overlay);
  //   setDrawType(null);
  //   onDrawFinish(featureGeojson);
  // };

  // const handleCancel = () => {
  //   map.removeInteraction(draw);
  //   map.removeOverlay(overlay);
  //   map.removeLayer(vectorLayer);
  //   setVectorLayer(null);
  //   setDrawType(null);
  //   setDrawnFeature(null);
  //   onCancel();
  // };

  return null;
}
