import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import { poiLayersThemeIdSelector } from '@Selectors/projectMap';
import isEmpty from '@Utils/isEmpty';
import { Creators } from '@Actions/proximityAnalysis';
import MapSidebar from './MapSidebar';
import MapSection from './MapSection';

const { resetProximityAnalysisState, setProximityAnalysisState } = Creators;
const { getProjectThemesRequest, getProjectThemeLayersRequest } =
  ProjectMapCreators;

export default function ProximityAnalysis() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
  const layers = useSelector(state => state.projectMap.layers);

  const poiLayerThemeId = useSelector(poiLayersThemeIdSelector);

  // get project themes
  useEffect(() => {
    if (themes) return;
    dispatch(getProjectThemesRequest({ project: projectId }));
  }, [dispatch, themes, projectId]);

  // get poi layers
  useEffect(() => {
    if (isEmpty(themes)) return;
    if (poiLayerThemeId)
      dispatch(getProjectThemeLayersRequest({ theme: poiLayerThemeId }));
  }, [dispatch, themes, poiLayerThemeId]);

  // copy poi layers state in proximity analysis state
  useEffect(() => {
    if (!layers) return;
    dispatch(
      setProximityAnalysisState({
        poiLayers: layers[poiLayerThemeId]?.map(layer => ({
          ...layer,
          checked: false,
        })),
      }),
    );
  }, [dispatch, layers, poiLayerThemeId]);

  // reset proximity analysis state on unmount
  useEffect(
    () => () => {
      dispatch(resetProximityAnalysisState());
    },
    [dispatch],
  );
  return (
    <div className="naxatw-flex naxatw-h-[calc(100vh-6.2rem)] naxatw-w-full">
      <MapSidebar />
      <MapSection />
    </div>
  );
}
