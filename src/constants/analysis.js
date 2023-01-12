import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';

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
    label: 'Isolated Geometry',
    checkAPI: 'check_isolated_geometry',
    fixAPI: 'fix_isolated_geometry',
  },
];

export const startingPointColor = '#FFB100';
export const destinationPointColor = '#EB455F';

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
