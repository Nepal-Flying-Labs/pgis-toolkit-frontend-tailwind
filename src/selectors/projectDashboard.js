import { createSelector } from 'reselect';

export const themesSelector = state => state.projectDashboard.themes;
const layersSelector = state => state.projectDashboard.layers;

export const mapStateSelector = createSelector(
  [themesSelector, layersSelector],
  (themes, layers) => {
    return themes.reduce((arr, theme) => {
      const layer = layers?.[theme.id];
      if (!layer) return [...arr];
      return [...arr, ...layer];
    }, []);
  },
);
