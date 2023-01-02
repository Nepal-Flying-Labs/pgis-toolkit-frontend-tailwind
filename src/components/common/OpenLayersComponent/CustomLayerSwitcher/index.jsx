/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import MiniMap from '@Assets/images/project/minimap.jpg';
import Satellite from '@Assets/images/project/satellite.png';
import OSM from '@Assets/images/project/osm.png';
import Mapbox from '@Assets/images/project/mapbox.png';
import None from '@Assets/images/project/none.png';

const baseLayerData = [
  { id: 1, name: 'Mapbox Outdoors', label: 'Outdoors', img: Mapbox },
  { id: 2, name: 'Mapbox Light', label: 'Light', img: MiniMap },
  { id: 3, name: 'OSM', label: 'OSM', img: OSM },
  { id: 4, name: 'Satellite', label: 'Satellite', img: Satellite },
  { id: 5, name: 'None', label: 'None', img: None },
];

export default function CustomLayerSwitcher({ map }) {
  const [activeLayer, setActiveLayer] = useState('');

  const toggleBaseLayer = baseLayerTitle => {
    if (!map) return;
    const allLayers = map.getLayers();

    const filteredBaseLayers = allLayers.array_.find(
      layer => layer.values_.title === 'Base maps',
    );
    const baseLayersCollection = filteredBaseLayers.values_.layers.array_;
    baseLayersCollection.forEach(baseLayer => {
      if (baseLayer.values_.title === baseLayerTitle) {
        baseLayer.setVisible(true);
        setActiveLayer(baseLayer.values_.title);
      } else {
        baseLayer.setVisible(false);
        setActiveLayer('None');
      }
    });
  };

  useEffect(() => {
    if (!map) return;
    const allLayers = map.getLayers();
    const filteredBaseLayers = allLayers
      .getArray()
      .find(layer => layer.values_.title === 'Base maps');
    if (!filteredBaseLayers) return;
    const baseLayersCollection = filteredBaseLayers.values_.layers.array_;
    baseLayersCollection.forEach(baseLayer => {
      if (baseLayer.values_.visible === true) {
        setActiveLayer(baseLayer.values_.title);
      }
    });
  }, [map]);

  return (
    <div
      className="naxatw-flex naxatw-absolute naxatw-bottom-[8.2rem] naxatw-left-4
        naxatw-z-50 naxatw-group naxatw-w-12"
    >
      <a
        className="naxatw-top-4 naxatw-left-4 naxatw-z-10 naxatw-bg-white
        naxatw-text-grey-800 naxatw-h-10 naxatw-p-2 naxatw-rounded-lg naxatw-border
        naxatw-border-grey-300 naxatw-flex naxatw-items-center hover:naxatw-bg-grey-100
        naxatw-w-10"
      >
        <i className="material-symbols-outlined">layers</i>
      </a>

      <div
        className="naxatw-baselayer-container naxatw-bg-primarycolor naxatw-absolute 
          naxatw-left-12 naxatw-top-0 naxatw-px-4 naxatw-py-2 naxatw-rounded-lg naxatw-w-max 
          naxatw-bg-white naxatw-shadow-3xl naxatw-hidden group-hover:naxatw-block naxatw-group"
      >
        <ul className="naxatw-flex naxatw-flex-row ">
          {baseLayerData.map(({ id, name, label, img }) => (
            <li
              key={id}
              className="naxatw-flex naxatw-w-[50px] naxatw-items-center naxatw-justify-center
                  naxatw-flex-col naxatw-cursor-pointer"
              onClick={() => toggleBaseLayer(name)}
              onKeyDown={() => toggleBaseLayer(name)}
            >
              <img
                className={`naxatw-mb-1 naxatw-w-10 naxatw-h-10 naxatw-rounded-full naxatw-border-2
                    naxatw-border-white naxatw-bg-contain
                    hover:naxatw-border-active_text ${
                      activeLayer === name ? 'naxatw-border-active_text' : ''
                    } `}
                src={img}
                alt="out"
              />
              <p
                className={`naxatw-flex naxatw-justify-center naxatw-text-xs naxatw-font-semibold ${
                  activeLayer === name ? 'naxatw-text-active_text' : ''
                } `}
              >
                {label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
