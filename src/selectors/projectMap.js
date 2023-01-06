import { createSelector } from 'reselect';
import { isEmpty } from '@Utils/commonUtils';
import { obstacleThemeName, transportThemeName } from '@src/constants/map';

const themesSelector = state => state.projectMap.themes;
const layersSelector = state => state.projectMap.layers;
const layerOrderSelector = state => state.projectMap.mapSettings.layerOrder;
const searchTextSelector = state => state.projectMap.searchText;

export const mapStateSelector = createSelector(
  [themesSelector, layersSelector, layerOrderSelector],
  (themes, layers, layerOrder) => {
    if (!themes) return [];
    const allLayers = themes.reduce((arr, theme) => {
      const layer = layers?.[theme.id];
      if (!layer) return [...arr];
      return [...arr, ...layer];
    }, []);
    const sortedLayers = layerOrder.reduce((arr, id) => {
      const layer = allLayers.find(lyr => lyr.id === id);
      if (!layer) return [...arr];
      return [...arr, layer];
    }, []);
    const notPresentLayers = allLayers.filter(
      allLayer => !layerOrder.includes(allLayer.id),
    );
    return [...notPresentLayers, ...sortedLayers];
  },
);

export const filteredLayersSelector = createSelector(
  [layersSelector, searchTextSelector],
  (layers, searchText) => {
    if (!layers) return {};
    if (!searchText) return layers;
    const layersx = {};
    Object.keys(layers).forEach(key => {
      const filteredLayer = layers[key].filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      if (!isEmpty(filteredLayer)) {
        layersx[key] = filteredLayer;
      }
    });
    return layersx;
  },
);

export const filteredThemesSelector = createSelector(
  [themesSelector, filteredLayersSelector, searchTextSelector],
  (themes, layers, searchText) => {
    if (!searchText) return themes;
    return themes.reduce(
      (arr, theme) => (layers[theme.id]?.length ? [...arr, theme] : [...arr]),
      [],
    );
  },
);

export const roadLayersThemeIdSelector = createSelector(
  [themesSelector],
  themes => themes?.find(theme => theme.name === transportThemeName)?.id,
);

export const obstacleLayersThemeIdSelector = createSelector(
  [themesSelector],
  themes => themes?.find(theme => theme.name === obstacleThemeName)?.id,
);
