import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import useForm from '@Hooks/useForm';
import Select from '@Components/common/Select';
import Spinner from '@Components/common/Spinner';
import Button from '@Components/common/Button';
import {
  obstacleLayersThemeIdSelector,
  roadLayersThemeIdSelector,
} from '@Selectors/projectMap';
import { checkIfLoading } from '@Utils/loaderSelector';
import { isEmpty } from '@Utils/commonUtils';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';

const { getProjectThemesRequest, getProjectThemeLayersRequest } =
  ProjectMapCreators;
const { setOptimalRouteState } = AnalysisCreators;

export default function StepTwo() {
  const { projectId } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
  const layers = useSelector(state => state.projectMap.layers);
  const roadLayerThemeId = useSelector(roadLayersThemeIdSelector);
  const obstaclesLayerThemeId = useSelector(obstacleLayersThemeIdSelector);
  const selectedRoadLayer = useSelector(
    state => state.analysis.optimalRoute.selectedRoadLayer,
  );
  const selectedObstacleLayers = useSelector(
    state => state.analysis.optimalRoute.selectedObstacleLayers,
  );
  const isLayersFetching = useSelector(state =>
    checkIfLoading(state, [Types.GET_PROJECT_THEME_LAYERS_REQUEST]),
  );
  const dispatch = useDispatch();

  const { values, meta, handleChange, handleSubmit } = useForm({
    initialValues: {
      selectedRoadLayer,
      selectedObstacleLayers,
    },
    required: ['selectedRoadLayer', 'selectedObstacleLayers'],
    onSubmit: data => {
      dispatch(
        setOptimalRouteState({
          ...data,
        }),
      );
    },
  });

  // get project themes
  useEffect(() => {
    if (themes) return;
    dispatch(getProjectThemesRequest({ project: projectId }));
  }, [dispatch, themes, projectId]);

  // get road and obstacles layers
  useEffect(() => {
    if (isEmpty(themes)) return;
    if (roadLayerThemeId)
      dispatch(getProjectThemeLayersRequest({ theme: roadLayerThemeId }));
    if (obstaclesLayerThemeId)
      dispatch(getProjectThemeLayersRequest({ theme: obstaclesLayerThemeId }));
  }, [dispatch, themes, roadLayerThemeId, obstaclesLayerThemeId]);

  return (
    <div>
      <h4>Data preparation & cleaning for analysis</h4>
      <p className="naxatw-mt-2 naxatw-text-body-lg">
        Choose the desired datasets from the two options below. You may choose
        data from both of the options below but make sure to choose the same
        data only once.
      </p>

      <div className="naxatw-flex naxatw-justify-center naxatw-mt-10">
        <Button className="naxatw-btn-primary" onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
}
