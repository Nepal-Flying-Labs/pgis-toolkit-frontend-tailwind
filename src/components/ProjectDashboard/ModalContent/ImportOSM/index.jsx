/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import toastActions from '@Actions/toast';
import {
  Creators as ProjectDashboardCreators,
  Types,
} from '@Actions/projectDashboard';
import Dropzone from '@Components/common/Dropzone';
import MaterialIcon from '@Components/common/MaterialIcon';
import FileIcon from '@Assets/images/icons/file-icon.svg';
import Select from '@Components/common/Select';
import Input from '@Components/common/Input';
import Toggle from '@Components/common/Toggle';
import Button from '@Components/common/Button';
import prepareFormData from '@Utils/prepareFormData';
import { checkIfLoading } from '@Utils/loaderSelector';
import { isEmpty } from '@Utils/commonUtils';
import { getCSVHeaders } from '@Utils/convertLayerUtils';
import useWindowDimensions from '@Hooks/useWindowDimentions';
import Chip from '@Components/common/Chip/index';
import noImg from '@Assets/images/noImage.png';
import CustomCheckbox from '@Components/common/CustomCheckbox/index';
import MultiSelect from '@Components/common/MultiSelect/index';

const { getProjectThemesRequest } = ProjectMapCreators;
const { uploadDatasetsRequest } = ProjectDashboardCreators;

export default function ImportOSM() {
  const { projectId } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorFields, setErrorFields] = useState({});
  const isUploading = useSelector(state =>
    checkIfLoading(state, [Types.UPLOAD_DATASETS_REQUEST]),
  );
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();

  useEffect(() => {
    if (themes) return;
    dispatch(getProjectThemesRequest({ project: projectId }));
  }, [dispatch, themes, projectId]);

  const handleUpload = e => {
    const { files } = e.target;
    if (files.length + uploadedFiles.length > 5) {
      dispatch(
        toastActions.error({
          message: 'Only 5 files can be uploaded at a time.',
        }),
      );
      return;
    }
    Array.from(files).forEach((file, index) => {
      const [filename, extension] = file.name.split('.');
      const prevId = uploadedFiles.at(-1)?.id || 0;
      const fileObj = {
        id: prevId + 1 + index,
        name: filename,
        extension,
        category: null,
        addToMap: false,
        file,
        latField: '',
        lonField: '',
        latlngOptions: [],
      };
      if (extension === 'csv') {
        getCSVHeaders(file).then(headers => {
          const latlngOptions = headers.map((item, idx) => ({
            id: idx + 1,
            name: item,
          }));
          setUploadedFiles(prev => [...prev, { ...fileObj, latlngOptions }]);
        });
      } else {
        setUploadedFiles(prev => [...prev, fileObj]);
      }
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

  const handleDelete = id => {
    setUploadedFiles(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    if (isUploading) return;
    let errorCount = 0;
    const errors = uploadedFiles.reduce((obj, item) => {
      const fields = [];
      if (!item.name) fields.push('name');
      if (!item.category) fields.push('category');
      if (item.extension === 'csv') {
        if (!item.latField) fields.push('latField');
        if (!item.lonField) fields.push('lonField');
      }
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
          lat_field: item.latField.name,
          lon_field: item.lonField.name,
        };
        return prepareFormData(data);
      });
      dispatch(uploadDatasetsRequest(payloadData));
    } else {
      setErrorFields(errors);
    }
  };

  const [selectArea, setSelectedArea] = useState([
    {
      id: 1,
      title: 'Street',
      checked: true,
    },
    {
      id: 2,
      title: 'Obstacle',
      checked: false,
    },
    {
      id: 3,
      title: 'School',
      checked: false,
    },
    {
      id: 4,
      title: 'Facilities',
      checked: false,
    },
    {
      id: 5,
      title: 'Others',
      checked: false,
    },
  ]);

  const handleSelect = id => {
    setSelectedArea(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : { ...item },
      ),
    );
  };

  return (
    <div>
      <p>
        USAFIRI allows you to do different sorts of analysis with your map
        datasets. Below are some of the analysis functions we have in the tool
        at the moment.
      </p>

      <div
        className="naxatw-mt-10 naxatw-flex naxatw-flex-col naxatw-gap-5 naxatw-overflow-auto scrollbar naxatw-max-h-96"
        style={{ maxHeight: `${height / 16 - 22}rem` }}
      >
        <div className="naxatw-space-y-2">
          <p className="naxatw-text-body-btn">Select Data</p>
          <ul className="">
            {selectArea?.length &&
              selectArea.map(item => (
                <li
                  key={item.id}
                  className="naxatw-space-x-2 naxatw-flex naxatw-items-center naxatw-py-2 naxatw-px-3 hover:naxatw-bg-[#F2F2F2] naxatw-cursor-pointer"
                >
                  <CustomCheckbox
                    status={item.checked}
                    onClick={() => handleSelect(item.id)}
                  />
                  <span
                    role="tab"
                    tabIndex="0"
                    onKeyDown={() => {}}
                    onClick={() => handleSelect(item.id)}
                    className="naxatw-text-body-lg"
                  >
                    {item.title}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <div className="naxatw-space-y-2">
          <p className="naxatw-text-body-btn">Select bounding box</p>
          <MultiSelect
            options={selectArea}
            placeholder="Map extend"
            field="displayName"
            onChange={data => {
              const area = data.map(i => i.value);
              // handleCustomChange('thematic_areas', area);
            }}
            selected={selectArea?.checked}
          />
        </div>

        <div className="naxatw-space-y-2">
          <p className="naxatw-text-body-btn">Choose Layer</p>
          <MultiSelect
            options={selectArea}
            placeholder="Choose"
            field="displayName"
            onChange={data => {
              const area = data.map(i => i.value);
              // handleCustomChange('thematic_areas', area);
            }}
            selected={selectArea?.checked}
          />
        </div>
      </div>
      {!isEmpty(uploadedFiles) && (
        <div className="naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
          <Button
            className="naxatw-btn-primary"
            onClick={handleSubmit}
            isLoading={isUploading}
          >
            Add to Catalogue
          </Button>
        </div>
      )}
    </div>
  );
}
