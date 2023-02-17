/* eslint-disable camelcase */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@Components/common/Input/index';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import Select from '@Components/common/Select/index';
import useForm from '@Hooks/useForm';
import { useParams } from 'react-router';
import Button from '@Components/common/Button/index';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import Toggle from '@Components/common/Toggle';

const { getProjectThemesRequest } = ProjectMapCreators;

const dataSource = [
  {
    id: 1,
    value: 'osm',
    label: 'OSM',
  },
  {
    id: 2,
    value: 'survey',
    label: 'Survey',
  },
  {
    id: 3,
    value: 'computer',
    label: 'Computer',
  },
];

const EditLayer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const themes = useSelector(state => state.projectMap.themes);
  const selectedData = useSelector(
    state => state.projectDashboard.data.selectedData,
  );
  // console.log(selectedData, 'data');

  if (!themes) {
    dispatch(getProjectThemesRequest({ project: projectId }));
  }

  const { meta, values, handleChange, handleCustomChange, handleSubmit } =
    useForm({
      initialValues: selectedData,
      required: ['name'],
      onSubmit: data => {
        const { theme, name, source, display_on_map } = data;
        const cateogoryId = themes?.filter(item => item.name === theme)?.[0]
          ?.id;
        const newData = { name, source, category: cateogoryId, display_on_map };
        console.log(newData, 'data');
      },
    });

  return (
    <>
      <div className="naxatw-space-y-3">
        <div>
          <Input
            label="Name"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {meta.name.error && meta.name.touched && (
            <FormErrorMessage message="Name is required" />
          )}
        </div>

        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Category</label>
          <Select
            options={themes || []}
            dataKey="name"
            onChange={data => {
              handleCustomChange('theme', data.name);
            }}
            selected={
              themes?.filter(theme => theme.name === values.theme)?.[0]?.name
            }
          />
        </div>
        <div className="naxatw-flex naxatw-justify-between naxatw-gap-x-4">
          <div className="naxatw-space-y-2 naxatw-basis-3/4">
            <label className="naxatw-label">Source</label>
            <Select
              options={dataSource}
              dataKey="label"
              onChange={data => {
                handleCustomChange('source', data.value);
              }}
              selected={
                dataSource?.filter(
                  source => source.value === values.source,
                )?.[0]?.label
              }
            />
          </div>
          <div className="naxatw-space-y-2 naxatw-basis-1/4">
            <label className="naxatw-label">Add To Map</label>
            <div className="naxatw-pt-3">
              <Toggle
                checked={values.display_on_map}
                onChange={() => {
                  handleCustomChange('display_on_map', !values.display_on_map);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="naxatw-flex naxatw-items-center naxatw-justify-center naxatw-py-4">
        <Button className="naxatw-btn-primary" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </>
  );
};

export default EditLayer;
