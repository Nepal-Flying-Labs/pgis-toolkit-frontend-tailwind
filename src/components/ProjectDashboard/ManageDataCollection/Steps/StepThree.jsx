/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
// import { saveAs } from 'file-saver';
// import { baseURL } from '@Services';
import Button from '@Components/common/Button/index';
import { checkIfLoading } from '@Utils/loaderSelector';
import { Creators, Types } from '@Actions/projectDashboard';

const { downloadBulkTemplateRequest } = Creators;

const StepThree = () => {
  const token = localStorage.getItem('userToken');
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.DOWNLOAD_BULK_TEMPLATE_REQUEST]),
  );
  const handleStandardDownload = () => {
    dispatch(downloadBulkTemplateRequest({ project: projectId }));
  };
  return (
    <div className="naxatw-container ">
      <div className="md:naxatw-w-[800px] naxatw-mx-auto">
        <h4 className="naxatw-mb-2">Download Data & Template</h4>
        <p className="naxatw-text-body-lg">
          Download Datasets for Field Data Collection
        </p>
        <div className="naxatw-px-4 naxatw-py-3 naxatw-mt-6 naxatw-border naxatw-border-grey-300 naxatw-rounded-xl">
          <h5>Download data in Standard format</h5>
          <span className="naxatw-text-[12px] naxatw-font-bold naxatw-leading-[16px]">
            (shp, csv, geojson or gpkg)
          </span>
          <p className="naxatw-text-body-md naxatw-mt-2">
            These are the templates that will help you collect data in
            pre-defined format.
          </p>
          <div className="naxatw-mt-2 naxatw-flex naxatw-items-center naxatw-gap-x-3">
            <Button
              iconLeft="download"
              className="naxatw-btn-secondary naxatw-btn-noborder naxatw-mt-3 "
              isLoading={loading}
              loaderClassName="naxatw-fill-secondary-400"
              onClick={handleStandardDownload}
            >
              Download
            </Button>
          </div>
        </div>
        <span className="naxatw-flex naxatw-justify-center naxatw-text-body-sm naxatw-mt-3">
          OR
        </span>
        <div className="naxatw-px-4 naxatw-py-3 naxatw-mt-6 naxatw-border naxatw-border-grey-300 naxatw-rounded-xl naxatw-bg-grey-100 naxatw-cursor-not-allowed">
          <h5>Download data in QField Project</h5>

          <p className="naxatw-text-body-md naxatw-mt-2">
            The data downloaded will open directly in QField Mobile Application.
            You may download the app and start collecting/ updating data. watch
            this video to understand how to use this QField project file,
            collect data and re-upload back to the USAFIRI project.
          </p>
          <div className="naxatw-mt-2 naxatw-flex naxatw-items-center naxatw-gap-x-3 ">
            <Button
              iconLeft="download"
              disabled
              className="naxatw-btn-secondary naxatw-btn-noborder naxatw-mt-3 "
            >
              Download
            </Button>
            {/* <div className="naxatw-flex naxatw-items-center naxatw-gap-x-3">
              <div className="naxatw-w-[567px] naxatw-h-2 naxatw-bg-primary-400 naxatw-rounded-3xl" />
              <span>100%</span>
            </div> */}
          </div>
        </div>
        <Button className="hover:naxatw-bg-[#F5F5F5] hover:naxatw-underline naxatw-mt-3 naxatw-text-secondary-400">
          <span className=" naxatw-text-[15px] naxatw-text-secondary-400 naxatw-font-bold">
            I want to download later
          </span>
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
