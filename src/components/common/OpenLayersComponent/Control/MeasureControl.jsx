/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Vector as OLVectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { getArea, getLength } from 'ol/sphere';
import { Draw } from 'ol/interaction';
import CircleStyle from 'ol/style/Circle';
import { Style, Fill, Stroke } from 'ol/style';
import { Overlay } from 'ol';
import { Polygon, LineString } from 'ol/geom';
import { unByKey } from 'ol/Observable';
import useOutsideClick from '@Hooks/useOutsideClick';

function MeasureControl({ map, style, buttonText, measureBoth = false }) {
  const [divRef, toggle, handleToggle] = useOutsideClick();

  // const controlRef = useRef(null);
  const drawRef = useRef();
  // const [options, setOptions] = useState(false);

  let measureVector;
  let measureDraw;

  const clickHandler = ({ type = 'Polygon' }) => {
    const element = document.querySelector('.ol-tooltip-static');
    if (element) {
      element.parentNode.removeChild(element);
    }
    map.removeLayer(measureVector);
    map.removeInteraction(measureDraw);

    const measureSource = new VectorSource();
    measureVector = new OLVectorLayer({
      source: measureSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#3333ff',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#3333ff',
          }),
        }),
      }),
    });
    let sketch;
    let measureTooltipElement = null;
    let measureTooltip = null;
    map.addLayer(measureVector);
    measureVector.setZIndex(99999);
    const formatLength = line => {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = `${
          Math.round((length / 1000) * 100) / 100
        } km <i class='close-icons material-icons' style="cursor:pointer;">close</i>`;
      } else {
        output = `${
          Math.round(length * 100) / 100
        } m <i class='close-icons material-icons' style="cursor:pointer;">close</i>`;
      }
      return output;
    };
    const formatArea = polygon => {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = `${
          Math.round((area / 1000000) * 100) / 100
        } km<sup>2 </sup><i class='close-icons material-icons' style="cursor:pointer;">close</i>`;
      } else {
        output = `${
          Math.round(area * 100) / 100
        } m<sup>2 </sup><i class='close-icons material-icons' style="cursor:pointer;">close</i>`;
      }
      return output;
    };
    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement('div');
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
      });
      map.addOverlay(measureTooltip);
    }
    function addInteraction() {
      measureDraw = new Draw({
        source: measureSource,
        type,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.7)',
          }),
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
            lineDash: [10, 10],
            width: 2,
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: 'rgba(0, 0, 0, 0.7)',
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.2)',
            }),
          }),
        }),
      });
      map.addInteraction(measureDraw);
      createMeasureTooltip();
      let listener;
      measureDraw.on('drawstart', evt => {
        sketch = evt.feature;
        let tooltipCoord = evt.coordinate;
        listener = sketch.getGeometry().on('change', event => {
          const geom = event.target;
          let output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      });
      measureDraw.on('drawend', () => {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        map.removeInteraction(measureDraw);
        sketch = null;
        measureTooltipElement = null;
        unByKey(listener);
        const closeElement = document.querySelector('.close-icons');
        closeElement.addEventListener('click', () => {
          const elementPopup = document.querySelector('.ol-tooltip-static');
          if (elementPopup) {
            elementPopup.parentNode.removeChild(elementPopup);
          }
          map.removeLayer(measureVector);
        });
      });
    }
    addInteraction();
  };

  // const showOptions = () => {
  //   setOptions(prevState => !prevState);
  // };

  return (
    <div
      ref={divRef}
      className="naxatw-pt-1 "
      style={{ ...style, cursor: 'pointer' }}
    >
      <a
        ref={drawRef}
        onClick={
          measureBoth ? handleToggle : () => clickHandler({ type: 'Polygon' })
        }
        type="button"
        title="Measure"
        className=""
      >
        {buttonText}
      </a>
      {toggle && (
        <ul
          className="naxatw-bg-white naxatw-rounded-sm naxatw-flex naxatw-shadow-3xl"
          style={{
            position: 'absolute',
            right: '0px',
            top: '42px',
            // display: options ? '' : 'none',
          }}
        >
          <li className="naxatw-p-2 naxatw-h-10 naxatw-items-center naxatw-justify-center hover:naxatw-bg-grey-100">
            <a
              onClick={() => {
                clickHandler({ type: 'LineString' });
                handleToggle();
              }}
              title="Add Coordinate"
            >
              <i className="material-icons">show_chart</i>
            </a>
          </li>
          <li className="naxatw-p-2 naxatw-h-10 naxatw-items-center naxatw-justify-center hover:naxatw-bg-grey-100">
            <a
              onClick={() => {
                clickHandler({ type: 'Polygon' });
                handleToggle();
              }}
              title="Measure Length and Area"
            >
              <i className="material-icons">crop_square</i>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

MeasureControl.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  buttonText: PropTypes.object,
  measureBoth: PropTypes.bool,
  map: PropTypes.object,
};
export default MeasureControl;
