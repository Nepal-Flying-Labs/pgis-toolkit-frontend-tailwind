// const queryResult = [
//   { field: 'OBJECTID', operator: 1, value: 1 },
//   { join: 'OR' },
//   { field: 'OBJECTID', operator: 1, value: 2 },
// ];

export const dataQueryOperators = [
  { id: 1, label: '=', value: 1, type: 'operator' },
  { id: 2, label: '!=', value: 4, type: 'operator' },
  { id: 3, label: 'LIKE', value: 7, type: 'operator' },
  { id: 4, label: '>', value: 3, type: 'operator' },
  { id: 5, label: '>=', value: 6, type: 'operator' },
  { id: 6, label: 'AND', value: 'AND', type: 'join' },
  { id: 7, label: '<', value: 2, type: 'operator' },
  { id: 8, label: '<=', value: 5, type: 'operator' },
  { id: 9, label: 'OR', value: 'OR', type: 'join' },
];

export const transportThemeName = 'Transportation Network';
export const obstacleThemeName = 'Transportation Obstacles';
export const poiThemeName = 'POI';
