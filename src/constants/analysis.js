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

export const nothing = '';
