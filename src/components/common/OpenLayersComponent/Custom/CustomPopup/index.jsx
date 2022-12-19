/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { renderToString } from 'react-dom/server';
import Overlay from 'ol/Overlay';
import '../../Popup/popup.scss';

const CustomPopup = ({ map, fetchPopupData, popupUI }) => {
  const popupRef = useRef(null);
  const popupCloserRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [overlay, setOverlay] = useState(null);
  const [properties, setProperties] = useState(null);
  const [popupHTML, setPopupHTML] = useState('');

  // add overlay to popupRef
  useEffect(() => {
    if (!map || !popupRef.current) return;
    const overlayInstance = new Overlay({
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    setOverlay(overlayInstance);
  }, [map, popupRef]);

  // function for closing popup
  const closePopup = useCallback(() => {
    if (!popupCloserRef.current || !overlay) return;
    overlay.setPosition(undefined);
    setPopupHTML('');
    popupCloserRef.current.blur();
  }, [overlay, popupCloserRef]);

  // get properties and coordinates of feature
  useEffect(() => {
    if (!map) return;
    map.on('singleclick', evt => {
      const { coordinate } = evt;
      const features = map.getFeaturesAtPixel(evt.pixel);
      if (features.length < 1) {
        closePopup();
        return;
      }
      const featureProperties = features[0].getProperties();
      setProperties(featureProperties);
      setCoordinates(coordinate);
    });
  }, [map, closePopup]);

  // fetch popup data when properties is set
  useEffect(() => {
    if (!map || !properties) return;
    fetchPopupData(properties);
    // eslint-disable-next-line
  }, [map, properties]);

  // getPopupUI, setpopupHTML, setOverlayPosition, addOverlayToMap
  useEffect(() => {
    if (!map || !coordinates || !overlay) return;
    const htmlString = renderToString(popupUI());
    setPopupHTML(htmlString);
    overlay.setPosition(coordinates);
    map.addOverlay(overlay);
  }, [map, overlay, coordinates, popupUI]);

  return (
    <div ref={popupRef} id="popup" className="ol-popup">
      <a
        ref={popupCloserRef}
        href={() => {}}
        id="popup-closer"
        className="ol-popup-closer"
        onClick={closePopup}
      />
      <div
        id="popup-content"
        className="naxatw-overflow-auto scrollbar"
        dangerouslySetInnerHTML={{ __html: popupHTML }}
      />
    </div>
  );
};

export default CustomPopup;
