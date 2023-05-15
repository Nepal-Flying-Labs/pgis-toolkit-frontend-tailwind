import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';

export const analysisTypes = ['buffer', 'proximity', 'optimum_route'];

export const analysisData = {
  'buffer-analysis': {
    title: 'Buffer Analysis',
    description:
      'Creates a zone around a selected feature, distance or time-based, known as a buffer.',
  },
  'proximity-analysis': {
    title: 'Proximity Analysis',
    description:
      'Creates a zone around a selected feature, distance or time-based, known as a proximity, to find features that are within a certain distance of another feature.',
  },
  'optimal-route': {
    title: 'Optimal route analysis',
    description:
      'Finds the most efficient path between multiple locations based on factors such as distance, time, and road conditions.',
    analysisType: 'optimal-route',
  },
};

// for backend api mapping
export function getAnalysisType(type) {
  switch (type) {
    case 'optimal-route':
      return 'optimum_route';
    case 'optimum_route':
      return 'optimal-route';
    default:
      return '';
  }
}

export const checkErrorData = [
  {
    id: 'null',
    label: 'Null Geometry',
    checkAPI: 'check_null_geometry',
    fixAPI: 'fix_null_geometry',
  },
  {
    id: 'multipart',
    label: 'Multipart Geometry',
    checkAPI: 'check_multipart_geometry',
    fixAPI: 'fix_multipart_geometry',
  },
  {
    id: 'duplicate',
    label: 'Duplicate Geometry',
    checkAPI: 'check_duplicate_geometry',
    fixAPI: 'fix_duplicate_geometry',
  },
  {
    id: 'overlapping',
    alternativeId: 'overlap',
    label: 'Overlapping Geometry',
    checkAPI: 'check_overlapping_geometry',
    fixAPI: 'fix_overlapping_geometry',
  },
  {
    id: 'self_instersect',
    label: 'Self-Intersecting Geometry',
    checkAPI: 'check_self_intersecting_geometry',
    fixAPI: 'fix_self_intersecting_geometry',
  },
  {
    id: 'isolated',
    alternativeId: 'snapping',
    label: 'Isolated Geometry',
    checkAPI: 'check_isolated_geometry',
    fixAPI: 'fix_isolated_geometry',
  },
];

export const pointCheckExceptions = [
  'overlapping',
  'self_instersect',
  'isolated',
];

export const startingPointColor = '#00A699';
export const destinationPointColor = '#FF5A5F';
export const obstaclePointColor = '#808080';

const drawPointStyles = {
  ...defaultStyles,
  fillColor: '#FFB100',
  lineColor: '#FFFFFF',
  lineOpacity: 100,
  fillOpacity: 100,
  circleRadius: 8,
};

export const startPointStyles = {
  ...drawPointStyles,
  fillColor: startingPointColor,
};

export const destinationPointStyles = {
  ...drawPointStyles,
  fillColor: destinationPointColor,
};

export const routeColors = {
  1: '#00A699',
  2: '#FF5A5F',
  3: '#AB47BC',
  4: '#5c6bc0',
  5: '#ffb300',
  6: '#7cb342',
};

export const bufferColors = {
  1: '#FF5A5F',
  2: '#DFF2F1',
};

export const bufferPointStyles = {
  ...drawPointStyles,
  fillColor: destinationPointColor,
};

export const bufferPolygonStyles = {
  ...drawPointStyles,
  fillColor: '#FF5A5F',
  fillOpacity: 33,
};

export const featureSelectColor = '#ffdf65';
export const errorFeatureColor = '#FF0F0F';

export const analysisWithDataCleaning = ['optimal-route'];
