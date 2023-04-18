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
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import getImageSource from '@Utils/getImageSource';

const { uploadGalleryRequest } = ProjectDashboardCreators;

export default function UploadGallery() {
  const { projectId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorFields, setErrorFields] = useState({});
  const isUploading = useSelector(state =>
    checkIfLoading(state, [Types.UPLOAD_GALLERY_REQUEST]),
  );
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();

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
        // tag: [],
        title: filename,
        caption: '',
        file,
        project: projectId,
      };
      setUploadedFiles(prev => [...prev, fileObj]);
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

  const handleSubmit = () => {
    if (isUploading) return;
    let errorCount = 0;
    const errors = uploadedFiles.reduce((obj, item) => {
      const fields = [];
      // form validation
      if (!item.title) fields.push('title');
      if (fields.length) errorCount += 1;
      return {
        ...obj,
        [item.id]: fields,
      };
    }, {});
    setErrorFields(errors);
    if (errorCount === 0) {
      const payloadData = uploadedFiles.map(item => {
        const data = {
          title: item.title,
          caption: item.caption,
          image: item.file,
          project: item.project,
        };
        return prepareFormData(data);
      });
      dispatch(uploadGalleryRequest(projectId, payloadData));
    } else {
      dispatch(
        toastActions.error({
          message: 'Please fill out all the required fields.',
        }),
      );
    }
  };

  return (
    <div>
      <div
        className="naxatw-flex naxatw-flex-col naxatw-gap-5 naxatw-overflow-auto scrollbar naxatw-max-h-96"
        style={{ maxHeight: `${height / 16 - 22}rem` }}
      >
        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Upload an image</label>
          <Dropzone
            label="Please upload images (JPEG, PNG, or GIF file format)"
            accept=".jpeg, .png, .gif"
            multiple
            onChange={handleUpload}
          />
          {uploadedFiles?.map(({ id, title, caption, file }) => (
            <div
              key={id}
              className="naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-px-5 naxatw-py-3 naxatw-flex naxatw-items-center naxatw-gap-x-5"
            >
              {/* <div className="naxatw-space-y-2">
                  <Input
                    id={uuidv4()}
                    label="Tags"
                    name="tag"
                    value={tags || ''}
                    placeholder="Add your own tags"
                    onChange={e => {
                      // console.log(e.target.value);
                      setTags(e.target.value);
                    }}
                    className=""
                    required={false}
                    type="text"
                    iconRight="add"
                    onKeyDown={e => {
                      console.log('tags ', e.target);
                      if (e.key === 'Enter') {
                        if (tags) {
                          setTagList(prev => [
                            ...prev,
                            {
                              id: e.target.id,
                              value: tags,
                            },
                          ]);
                          setTags('');
                        }
                      }
                    }}
                    onIconClick={data => {
                      // console.log(data);
                      handleAddTag({
                        id: data.id,
                        name: data.name,
                        value: data.value,
                      });
                    }}
                  />
                  {!isEmpty(tagList) && (
                    <div className="tag-Chips naxatw-flex naxatw-gap-2">
                      {tagList?.map(d => (
                        <Chip
                          key={d.id}
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
                </div> */}
              <div className="naxatw-min-w-40 naxatw-w-40 naxatw-space-y-2">
                <img
                  src={file ? getImageSource(file) : ''}
                  alt="file"
                  className="naxatw-w-40 naxatw-h-32 naxatw-object-cover naxatw-rounded-lg"
                />
                {/* <Button
                  className="naxatw-btn-primary naxatw-w-full"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </Button> */}
                <a
                  className="naxatw-flex naxatw-items-center naxatw-p-2 naxatw-justify-center"
                  onClick={() => handleDelete(id)}
                >
                  <MaterialIcon
                    className="naxatw-text-delete_btn"
                    name="delete_outline"
                  />
                </a>
              </div>
              <div className="naxatw-w-full naxatw-space-y-2">
                <Input
                  id={id}
                  label="Title of Image*"
                  name="title"
                  value={title || ''}
                  placeholder="Enter title of image"
                  onChange={handleChange}
                  className=""
                  required={false}
                  type="text"
                />
                {errorFields?.[id]?.includes('title') && (
                  <FormErrorMessage message="Required" />
                )}

                <Input
                  id={id}
                  label="Suitable Caption"
                  name="caption"
                  value={caption || ''}
                  placeholder="Write a Suitable Caption"
                  onChange={handleChange}
                  className=""
                  required={false}
                  type="text"
                />
                {errorFields?.[id]?.includes('caption') && (
                  <FormErrorMessage message="Required" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isEmpty(uploadedFiles) && (
        <div className="naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
          <Button
            className="naxatw-btn-primary"
            onClick={handleSubmit}
            isLoading={isUploading}
            loaderClassName="naxatw-fill-secondary-400"
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
