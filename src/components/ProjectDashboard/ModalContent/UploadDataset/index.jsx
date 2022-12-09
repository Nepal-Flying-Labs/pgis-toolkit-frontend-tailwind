import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import Dropzone from '@Components/common/Dropzone';
import MaterialIcon from '@Components/common/MaterialIcon';
import FileIcon from '@Assets/images/icons/file-icon.svg';
import Select from '@Components/common/Select';
import Toggle from '@Components/common/Toggle';
import Button from '@Components/common/Button';

export default function UploadDataset() {
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const dispatch = useDispatch();

  const handleUpload = e => {
    setUploadedFiles(e.target.files);
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

        {uploadedFiles &&
          Array.from(uploadedFiles).map(item => (
            <div className="naxatw-flex naxatw-flex-col naxatw-gap-2">
              <div className="naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-px-5 naxatw-py-3 naxatw-flex naxatw-flex-col naxatw-gap-2">
                <div className="naxatw-flex naxatw-justify-between">
                  <div className="naxatw-flex naxatw-gap-5">
                    <img src={FileIcon} alt="file-icon" />
                    <div>
                      <p className="naxatw-font-bold naxatw-text-[15px]">
                        {item.name}
                      </p>
                      <p className="naxatw-text-body-md naxatw-text-grey-600">
                        Uploaded on 16/11/2022
                      </p>
                    </div>
                  </div>
                  <a className="naxatw-flex naxatw-items-center naxatw-p-2">
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
                      name="dataname"
                      placeholder="Enter Data Name"
                      // value={values.username}
                      // onChange={handleChange}
                      // {...inputProps}
                    />
                  </div>

                  <div className="naxatw-space-y-2">
                    <label className="naxatw-label">Category</label>
                    <Select
                      options={[]}
                      dataKey="category"
                      placeholder="Category"
                      onChange={data => {
                        // handleCustomChange('thematicAreas', data.name);
                      }}
                      // selected={values.thematicAreas}
                    />
                  </div>
                  <div className="naxatw-space-y-2">
                    <label className="naxatw-label">Add To Map</label>
                    <div className="naxatw-pt-3">
                      <Toggle />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className=" naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-btn-primary"
          // onClick={handleSubmit}
        >
          Add To Catalogue
        </Button>
      </div>
    </div>
  );
}
