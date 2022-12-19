/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { Draw } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
// import Overlay from 'ol/Overlay';
// import { getCenter } from 'ol/extent';
// import Button from '@Components/common/Button';
// import capitalizeFirstLetter from '@Utils/capitalizeFirstLetter';
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
  // const [overlay, setOverlay] = useState(null);
  // const popupRef = useRef(null);

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

  // // add overlay to popupRef
  // useEffect(() => {
  //   if (!map || !popupRef.current) return;
  //   const overlayInstance = new Overlay({
  //     element: popupRef.current,
  //     autoPan: true,
  //     autoPanAnimation: {
  //       duration: 250,
  //     },
  //     offset: [0, -5],
  //   });
  //   setOverlay(overlayInstance);
  // }, [map, popupRef]);

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

  // return (
  //   <div ref={popupRef} className="ol-popup">
  //     <a
  //       href={() => {}}
  //       className="ol-popup-closer naxatw-text-grey-800 naxatw-hidden"
  //     />
  //     <div id="popup-content" className="is-overflow scrollbar">
  //       <div className="">
  //         <ul className="naxatw-max-h-64 naxatw-overflow-y-auto naxatw-flex naxatw-flex-col naxatw-gap-2 scrollbar">
  //           {Object.keys(popupData).map(key => (
  //             <li
  //               key={key}
  //               className="naxatw-flex naxatw-items-center naxatw-text-grey-900"
  //             >
  //               <p className="naxatw-w-1/2 naxatw-text-grey-900">
  //                 {capitalizeFirstLetter(key)}
  //               </p>
  //               <p className="naxatw-text-grey-900">
  //                 <input className="naxatw-input naxatw-p-1" type="text" />
  //               </p>
  //             </li>
  //           ))}
  //         </ul>
  //         <div className="naxatw-flex naxatw-justify-between naxatw-mt-4">
  //           <Button
  //             className="naxatw-btn-primary naxatw-btn-sm"
  //             onClick={handleSave}
  //           >
  //             Save
  //           </Button>
  //           <Button
  //             className="naxatw-btn-transparent naxatw-btn-sm"
  //             onClick={handleCancel}
  //           >
  //             Cancel
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
