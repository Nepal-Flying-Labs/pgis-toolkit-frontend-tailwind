import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import {
  Creators as ProjectDashboardCreators,
  Types,
} from '@Actions/projectDashboard';
import useForm from '@Hooks/useForm';
import Input from '@Components/common/Input';
import Button from '@Components/common/Button';
import Select from '@Components/common/Select';
import prepareFormData from '@Utils/prepareFormData';

const initialState = {
  layerName: '',
  url: '',
  category: null,
};

const { getProjectThemesRequest } = ProjectMapCreators;
const { uploadDatasetsRequest } = ProjectDashboardCreators;

const AddWMSLayer = () => {
  const { projectId } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
  const dispatch = useDispatch();
  const { values, inputProps, handleSubmit, handleChange } = useForm({
    initialValues: initialState,
    required: ['layerName', 'url', 'category'],
    onSubmit: data => {
      const payloadData = {
        theme: data.category,
        name: data.layerName,
        url: data.url,
        layer_type: 'WMS',
        display_on_map: true,
      };
      const formdata = prepareFormData(payloadData);
      dispatch(uploadDatasetsRequest([formdata]));
    },
  });

  useEffect(() => {
    if (themes) return;
    dispatch(getProjectThemesRequest({ project: projectId }));
  }, [dispatch, themes, projectId]);

  return (
    <div>
      <div className="naxatw-space-y-5">
        <Input
          label="Layer Name"
          name="layerName"
          placeholder="Enter layer Name"
          value={values.layerName}
          onChange={handleChange}
          {...inputProps}
        />
        <Input
          label="Your URL Here"
          name="url"
          placeholder="Yout URL Heree"
          value={values.url}
          onChange={handleChange}
          {...inputProps}
        />

        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Category</label>
          <Select
            options={themes || []}
            labelKey="name"
            valueKey="id"
            placeholder="Category"
            onChange={selectedItem =>
              handleChange({
                target: { name: 'category', value: selectedItem.id },
              })
            }
            selectedValue={values.category}
            style={{ minWidth: '10rem' }}
          />
          {/* {errorFields?.[id]?.includes('category') && (
            <FormErrorMessage message="Required" />
          )} */}
        </div>
        <div className="naxatw-pt-5 naxatw-flex naxatw-justify-center">
          <Button className="naxatw-btn-primary" onClick={handleSubmit}>
            Add to Catalogue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddWMSLayer;
