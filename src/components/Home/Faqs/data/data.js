/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import AccordionDownloadDetail from '../AccordionDownload/index';

// eslint-disable-next-line import/prefer-default-export
export const faqsdata = [
  {
    id: '1',
    title: 'How is this different than OpenStreetMaps?',
    desc: 'While OpenStreetMaps(OSM) provides solid standardized base attributes, by its design it cannot contain specific attributes. We allow the addition of extra attributes to OSM points, lines, and polygons. It is done by linking OSM attributes with Usafiri and adding the extra attributes in Usafiri.',
  },
  {
    id: '2',
    title: 'Does Usafiri allow data exports?',
    desc: 'Yes, data collected from Usafiri can be exported.',
  },
  {
    id: '3',
    title: 'Does Usafiri share data among organizations?',
    desc: 'No, the data collected by your organization is strictly yours and is not shared with anyone.',
  },
  {
    id: '4',
    title: 'Can we download standard data templates?',
    desc: <AccordionDownloadDetail />,
  },
];
