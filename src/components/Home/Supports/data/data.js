/* eslint-disable import/prefer-default-export */
import dataQueryImg from '@Assets/images/home/supports/data-query.png';
import bufferAnalysisImg from '@Assets/images/home/supports/buffer.png';
import proximityAnalysisImg from '@Assets/images/home/supports/proximity.png';
import routeAnalysisImg from '@Assets/images/home/supports/route.png';

export const supportsdata = [
  {
    id: '1',
    image: dataQueryImg,
    title: 'Data Query',
    content:
      'This tool allows you to query on the layers and create a new layers based on the query result.',
  },
  {
    id: '2',
    image: bufferAnalysisImg,
    title: 'Buffer Analysis',
    content:
      'Creates a zone around a selected feature, distance or time-based, known as a buffer.',
  },
  {
    id: '3',
    image: proximityAnalysisImg,
    title: 'Proximity Analysis',
    content:
      'Creates a zone around a selected feature, distance or time-based, known as a proximity, to find features that are within a certain distance of another feature.',
  },
  {
    id: '4',
    image: routeAnalysisImg,
    title: 'Optimal Route Analysis',
    content:
      'This method is used to find the most efficient path between multiple locations based on factors such as distance, time, and road conditions. uSAFIRI supports data cleaning phase before performing analysis.',
  },
];
