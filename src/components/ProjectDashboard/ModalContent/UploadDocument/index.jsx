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
import CustomCalendar from '@Components/common/CustomCalendar/index';

const { getProjectThemesRequest } = ProjectMapCreators;
const { uploadDatasetsRequest } = ProjectDashboardCreators;

export default function UploadDocument() {
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

  return (
    <div>
      <p>
        You can add any sort of relevant documents to the project. It includes
        relevant report, findings etc. in file format DOCX, PDF, Excel or CSV.
      </p>

      <div
        className="naxatw-mt-10 naxatw-flex naxatw-flex-col naxatw-gap-5 naxatw-overflow-auto scrollbar naxatw-max-h-96"
        style={{ maxHeight: `${height / 16 - 22}rem` }}
      >
        <Input
          id="title"
          label="Title of Document"
          name="title"
          value=""
          placeholder="Enter title of document"
          onChange={() => {}}
          className=""
          required={false}
          type="text"
        />

        <Input
          id="document"
          label="About the Document"
          name="document"
          value=""
          placeholder="Write a short description about document"
          onChange={() => {}}
          className=""
          required={false}
          type="text"
        />

        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Upload a document</label>
          <Dropzone
            label="Please upload a document (DOCX, PDF, Excel or CSV file format)"
            accept=".docx, .pdf, .csv, .pdf, .xlxs"
            multiple
            onChange={handleUpload}
          />

          {uploadedFiles.map(({ id, file }) => (
            <div key={id} className="naxatw-flex naxatw-flex-col naxatw-gap-2">
              <div
                className="naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-pr-5
                naxatw-flex naxatw-gap-y-2"
              >
                <div className="naxatw-flex naxatw-gap-5 naxatw-w-4/5 naxatw-pr-2">
                  <div className="naxatw-flex naxatw-items-center naxatw-pl-4">
                    {/* <img
                    src={noImg}
                    alt="file-icon"
                    width="60px"
                    className="naxatw-bg-slate-500 naxatw-rounded-tl-[8px] naxatw-rounded-bl-[8px] naxatw-h-full naxatw-object-cover"
                  /> */}
                    <img src={FileIcon} alt="file-icon" />
                  </div>
                  <div className="naxatw-py-2">
                    <p className="naxatw-font-bold naxatw-text-[15px]">
                      {file.name}
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
                    className="naxatw-text-[22px] naxatw-text-[#FF0F0F]"
                    name="delete_outline"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Created on</label>
          <CustomCalendar
            startDate={new Date()}
            // onChange={date => {
            //   handleCustomChange('start_date', format(date, 'yyyy-MM-dd'));
            // }}
            // selected={values?.start_date}
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
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
