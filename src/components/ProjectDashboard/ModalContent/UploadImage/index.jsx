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
import { v4 as uuidv4 } from 'uuid';

const { getProjectThemesRequest } = ProjectMapCreators;
const { uploadDatasetsRequest } = ProjectDashboardCreators;

export default function UploadImage() {
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

  const handleAddToMap = e => {
    const { id, checked } = e.target;
    setUploadedFiles(prev =>
      prev.map(item =>
        item.id === +id ? { ...item, addToMap: checked } : { ...item },
      ),
    );
  };

  const handleLatLngSelect = (id, { name, value }) => {
    setUploadedFiles(prev =>
      prev.map(item =>
        item.id === +id ? { ...item, [name]: value } : { ...item },
      ),
    );
  };

  const handleDelete = id => {
    setUploadedFiles(prev => prev.filter(item => item.id !== id));
  };

  const [tags, setTags] = useState('');
  const [tagList, setTagList] = useState([]);

  const handleAddTag = ({ id, name, value }) => {
    setTagList([...tagList, { id, value }]);
    setTags('');
  };

  const handleRemoveTag = id => {
    const newTagList = tagList.filter(d => d.id !== id);
    return setTagList(newTagList);
  };

  // console.log('form data ', uploadedFiles);
  // console.log('tag list data ', tagList);

  const handleSubmit = () => {
    if (isUploading) return;
    console.log('submited');
    // let errorCount = 0;
    // const errors = uploadedFiles.reduce((obj, item) => {
    //   const fields = [];
    //   if (!item.name) fields.push('name');
    //   if (!item.category) fields.push('category');
    //   if (item.extension === 'csv') {
    //     if (!item.latField) fields.push('latField');
    //     if (!item.lonField) fields.push('lonField');
    //   }
    //   if (fields.length) errorCount += 1;
    //   return {
    //     ...obj,
    //     [item.id]: fields,
    //   };
    // }, {});
    // if (errorCount === 0) {
    //   const payloadData = uploadedFiles.map(item => {
    //     const data = {
    //       name: item.name,
    //       theme: item.category,
    //       display_on_map: item.addToMap,
    //       file: item.file,
    //       layer_type: 'Vector',
    //       source: 'computer',
    //       lat_field: item.latField.name,
    //       lon_field: item.lonField.name,
    //     };
    //     return prepareFormData(data);
    //   });
    //   dispatch(uploadDatasetsRequest(payloadData));
    // } else {
    //   setErrorFields(errors);
    // }
  };

  return (
    <div>
      <p>
        You can add any sort of relevant photographs & images or maps, in file
        format JPEG, PNG, GIF or PDF.
      </p>

      <div
        className="naxatw-mt-10 naxatw-flex naxatw-flex-col naxatw-gap-5 naxatw-overflow-auto scrollbar naxatw-max-h-96"
        style={{ maxHeight: `${height / 16 - 22}rem` }}
      >
        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Upload an image</label>
          <Dropzone
            label="Please upload an image (JPEG, PNG, GIF or PDF file format)"
            accept=".jpeg, .png, .gif, .pdf"
            multiple
            onChange={handleUpload}
          />
          {uploadedFiles?.map(({ id, file }) => (
            <div key={id} className="naxatw-flex naxatw-flex-col naxatw-gap-2">
              <div
                className="naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-pr-5
                naxatw-flex naxatw-gap-y-2"
              >
                <div className="naxatw-flex naxatw-gap-5 naxatw-w-4/5 naxatw-pr-2">
                  <div className="">
                    <img
                      src={noImg}
                      alt="file-icon"
                      width="60px"
                      className="naxatw-bg-slate-500 naxatw-rounded-tl-[8px] naxatw-rounded-bl-[8px] naxatw-h-full naxatw-object-cover"
                    />
                  </div>
                  <div className="naxatw-py-2">
                    <p className="naxatw-font-bold naxatw-text-[15px]">
                      {file?.name}
                    </p>
                    <p className="naxatw-text-body-md naxatw-text-grey-600">
                      Uploaded on 16/11/2022
                    </p>
                  </div>
                </div>

                <div className="naxatw-flex naxatw-gap-5 naxatw-items-center naxatw-w-1/5">
                  <MaterialIcon
                    // onIconClick={() => handleDelete(id)}
                    wrapperClassName="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
                    className="naxatw-text-[22px]"
                    name="file_download"
                  />
                  <MaterialIcon
                    // onIconClick={() => handleDelete(id)}
                    wrapperClassName="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
                    className="naxatw-text-[22px] naxatw-text-delete_btn"
                    name="delete_outline"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Input
          id={uuidv4()}
          label="Tags"
          name="tag"
          value={tags || ''}
          placeholder="Add your own tags"
          onChange={e => {
            console.log(e.target.value);
            setTags(e.target.value);
          }}
          className=""
          required={false}
          type="text"
          iconRight="add"
          onIconClick={data => {
            console.log(data);
            handleAddTag({ id: data.id, name: data.name, value: data.value });
          }}
        />
        {!isEmpty(tagList) && (
          <div className="tag-Chips naxatw-flex naxatw-gap-2">
            {tagList?.map(d => (
              <Chip
                name={d?.value}
                onClick={() => {}}
                status=""
                value=""
                iconRight="close"
                onIconClick={() => {
                  handleRemoveTag(d.id);
                }}
              />
            ))}
          </div>
        )}
        <Input
          id="title"
          label="Title of Image"
          name="title"
          value=""
          placeholder="Enter title of image"
          onChange={() => {}}
          className=""
          required={false}
          type="text"
        />
        <Input
          id="caption"
          label="Suitable Caption"
          name="caption"
          value=""
          placeholder="Write a Suitable Caption"
          onChange={() => {}}
          className=""
          required={false}
          type="text"
        />
      </div>

      {!isEmpty(uploadedFiles) && (
        <div className="naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
          <Button
            className="naxatw-btn-primary"
            onClick={handleSubmit}
            isLoading={isUploading}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
