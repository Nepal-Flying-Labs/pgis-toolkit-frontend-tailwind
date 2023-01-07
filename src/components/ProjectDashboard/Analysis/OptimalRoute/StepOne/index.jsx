import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import { Creators as DataCleaningCreators } from '@Actions/dataCleaning';
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
const { setAnalysisState, setOptimalRouteState } = DataCleaningCreators;

export default function StepOne() {
  const { projectId } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
  const layers = useSelector(state => state.projectMap.layers);
  const roadLayerThemeId = useSelector(roadLayersThemeIdSelector);
  const obstaclesLayerThemeId = useSelector(obstacleLayersThemeIdSelector);
  const selectedRoadLayer = useSelector(
    state => state.dataCleaning.optimalRoute.selectedRoadLayer,
  );
  const selectedObstacleLayers = useSelector(
    state => state.dataCleaning.optimalRoute.selectedObstacleLayers,
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
      dispatch(
        setAnalysisState({
          stepIndex: 2,
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

      <div className="naxatw-mt-5 naxatw-space-y-5">
        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Road layer</label>
          <Select
            options={layers?.[roadLayerThemeId] || []}
            placeholder="Choose"
            selectedValue={values.selectedRoadLayer?.id}
            labelKey="name"
            valueKey="id"
            onChange={selectedItem => {
              handleChange({
                target: {
                  name: 'selectedRoadLayer',
                  value: selectedItem,
                },
              });
            }}
          />
          {meta.selectedRoadLayer.error && meta.selectedRoadLayer.touched && (
            <FormErrorMessage message="Please select road layer." />
          )}
        </div>

        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Obstacles</label>
          <div
            className="naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-lg
              naxatw-overflow-y-auto scrollbar naxatw-h-[11.25rem]"
          >
            {isLayersFetching && (
              <div className="naxatw-h-full naxatw-flex naxatw-items-center naxatw-justify-center">
                <Spinner className="!naxatw-h-7 !naxatw-w-7 naxatw-fill-grey-500" />
              </div>
            )}
            <ul>
              {layers?.[obstaclesLayerThemeId] &&
                layers[obstaclesLayerThemeId].map(item => (
                  <li
                    key={item.id}
                    role="presentation"
                    className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800 
                      hover:naxatw-bg-grey-100 naxatw-flex naxatw-items-center"
                    onClick={() => {}}
                  >
                    <input
                      id={item.id}
                      type="checkbox"
                      className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4
                        naxatw-accent-grey-800 naxatw-cursor-pointer"
                      checked={values.selectedObstacleLayers?.some(
                        i => i.id === item.id,
                      )}
                      onChange={e => {
                        const { checked } = e.target;
                        handleChange({
                          target: {
                            name: 'selectedObstacleLayers',
                            value: checked
                              ? [...selectedObstacleLayers, item]
                              : values.selectedObstacleLayers.filter(
                                  i => i.id !== item.id,
                                ),
                          },
                        });
                      }}
                    />
                    <label htmlFor={item.id} className="naxatw-cursor-pointer">
                      {item.name}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
          {meta.selectedObstacleLayers.error &&
            meta.selectedObstacleLayers.touched && (
              <FormErrorMessage message="Please select obstacles layer." />
            )}
        </div>
      </div>

      <div className="naxatw-flex naxatw-justify-center naxatw-mt-10">
        <Button className="naxatw-btn-primary" onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
}
