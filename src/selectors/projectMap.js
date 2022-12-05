import { createSelector } from 'reselect';

const themesSelector = state => state.projectMap.themes;
const layersSelector = state => state.projectMap.layers;
const layerOrderSelector = state => state.projectMap.layerOrder;

export const mapStateSelector = createSelector(
  [themesSelector, layersSelector, layerOrderSelector],
  (themes, layers, layerOrder) => {
    const allLayers = themes.reduce((arr, theme) => {
      const layer = layers?.[theme.id];
      if (!layer) return [...arr];
      return [...arr, ...layer];
    }, []);
    const sortedLayers = layerOrder.map(id =>
      allLayers.find(layer => layer.id === id),
    );
    return sortedLayers;
  },
);

export const nothing = '';
