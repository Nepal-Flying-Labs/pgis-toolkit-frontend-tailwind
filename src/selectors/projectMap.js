import { createSelector } from 'reselect';

export const themesSelector = state => state.projectMap.themes;
const layersSelector = state => state.projectMap.layers;

export const mapStateSelector = createSelector(
  [themesSelector, layersSelector],
  (themes, layers) =>
    themes.reduce((arr, theme) => {
      const layer = layers?.[theme.id];
      if (!layer) return [...arr];
      return [...arr, ...layer];
    }, []),
);
