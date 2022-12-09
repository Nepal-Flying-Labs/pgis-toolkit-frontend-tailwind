/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import Dropzone from '@Components/common/Dropzone';
import MaterialIcon from '@Components/common/MaterialIcon';
import FileIcon from '@Assets/images/icons/file-icon.svg';
import Select from '@Components/common/Select';
import Toggle from '@Components/common/Toggle';
import Button from '@Components/common/Button';
import prepareFormData from '@Utils/prepareFormData';

const { getProjectThemesRequest } = ProjectMapCreators;
const { uploadDatasetsRequest } = ProjectDashboardCreators;

export default function UploadDataset() {
  const { projectId } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorFields, setErrorFields] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (themes) return;
    dispatch(getProjectThemesRequest({ project: projectId }));
  }, [dispatch, themes, projectId]);

  const handleUpload = e => {
    const { files } = e.target;
    setUploadedFiles(prev => {
      const prevId = prev.at(-1)?.id || 0;
      return [
        ...prev,
        ...Array.from(files).map((file, index) => ({
          id: prevId + 1 + index,
          name: '',
          category: null,
          addToMap: false,
          file,
        })),
      ];
    });
  };

  const handleChange = e => {
    const { id, name, value } = e.target;
    setUploadedFiles(prev =>
      prev.map(item =>
        item.id === +id ? { ...item, [name]: value } : { ...item },
      ),
    );
  };

  const handleCategorySelect = (id, selectedItem) => {
    setUploadedFiles(prev =>
      prev.map(item =>
        item.id === +id ? { ...item, category: selectedItem.id } : { ...item },
      ),
    );
  };

  const handleAddToMap = e => {
    const { id, checked } = e.target;
    setUploadedFiles(prev =>
      prev.map(item =>
        item.id === +id ? { ...item, addToMap: checked } : { ...item },
      ),
    );
  };

  const handleDelete = id => {
    setUploadedFiles(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    let errorCount = 0;
    const errors = uploadedFiles.reduce((obj, item) => {
      const fields = [];
      if (!item.name) fields.push('name');
      if (!item.category) fields.push('category');
      if (fields.length) errorCount += 1;
      return {
        ...obj,
        [item.id]: fields,
      };
    }, {});
    if (errorCount === 0) {
      const payloadData = uploadedFiles.map(item => {
        const data = {
          name: item.name,
          theme: item.category,
          display_on_map: item.addToMap,
          file: item.file,
          layer_type: 'Vector',
          source: 'computer',
        };
        return prepareFormData(data);
      });
      dispatch(uploadDatasetsRequest(payloadData));
    } else {
      setErrorFields(errors);
    }
  };

  return (
    <div>
      <p>
        USAFIRI allows you to do different sorts of analysis with your map
        datasets. Below are some of the analysis functions we have in the tool
        at the moment.
      </p>

      <div className="naxatw-mt-10 naxatw-flex naxatw-flex-col naxatw-gap-2">
        <Dropzone
          label="Please upload your datasets (shp, csv, geojson or gpkg file format)"
          accept=".shp, .csv, .geojson"
          multiple
          onChange={handleUpload}
        />

        {uploadedFiles.map(({ id, name, category, addToMap, file }) => (
          <div key={id} className="naxatw-flex naxatw-flex-col naxatw-gap-2">
            <div className="naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-px-5 naxatw-py-3 naxatw-flex naxatw-flex-col naxatw-gap-2">
              <div className="naxatw-flex naxatw-justify-between">
                <div className="naxatw-flex naxatw-gap-5">
                  <img src={FileIcon} alt="file-icon" />
                  <div>
                    <p className="naxatw-font-bold naxatw-text-[15px]">
                      {file.name}
                    </p>
                    <p className="naxatw-text-body-md naxatw-text-grey-600">
                      Uploaded on 16/11/2022
                    </p>
                  </div>
                </div>
                <a
                  className="naxatw-flex naxatw-items-center naxatw-p-2"
                  onClick={() => handleDelete(id)}
                >
                  <MaterialIcon
                    className="naxatw-text-[#FF0F0F]"
                    name="delete_outline"
                  />
                </a>
              </div>

              <div className="naxatw-flex naxatw-gap-3">
                <div className="naxatw-space-y-2 naxatw-grow">
                  <label className="naxatw-label">Data name*</label>
                  <input
                    type="text"
                    className="naxatw-input"
                    id={id}
                    name="name"
                    value={name}
                    placeholder="Enter Data Name"
                    onChange={handleChange}
                  />
                </div>

                <div className="naxatw-space-y-2">
                  <label className="naxatw-label">Category</label>
                  <Select
                    options={themes || []}
                    labelKey="name"
                    valueKey="id"
                    placeholder="Category"
                    onChange={selectedItem =>
                      handleCategorySelect(id, selectedItem)
                    }
                    selectedValue={category}
                  />
                </div>
                <div className="naxatw-space-y-2">
                  <label className="naxatw-label">Add To Map</label>
                  <div className="naxatw-pt-3">
                    <Toggle
                      id={id}
                      checked={addToMap}
                      onChange={handleAddToMap}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button className="naxatw-btn-primary" onClick={handleSubmit}>
          Add To Catalogue
        </Button>
      </div>
    </div>
  );
}
