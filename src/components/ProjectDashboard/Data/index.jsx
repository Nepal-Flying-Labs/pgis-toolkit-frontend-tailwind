import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import UploadFolder from '@Assets/images/project/upload-folder.png';
import ImportFromOSM from '@Assets/images/project/import-osm.png';
import WMSLayer from '@Assets/images/project/wms-layer.png';
import { isEmpty } from '@Utils/commonUtils';
import Button from '@Components/common/Button/index';
import Tooltip from '@Components/common/Tooltip/index';
import NoDataYet from './NoDataYet';
import LayerList from './LayerList';

const { getProjectLayersRequest, checkUploadStatusRequest } =
  ProjectDashboardCreators;
const { toggleModal } = CommonCreators;

export default function Data() {
  const { projectId, organizationId } = useParams();
  const history = useHistory();
  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const layers = useSelector(state => state.projectDashboard.data.layers);
  const uploadStatusCheckingIds = useSelector(
    state => state.projectDashboard.data.uploadStatusCheckingIds,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!projectDetail) return;
    dispatch(getProjectLayersRequest({ project: projectId }));
  }, [dispatch, projectId, projectDetail]);

  // check upload status for data
  useEffect(() => {
    if (!layers) return;
    const uploadingLayers = layers?.filter(
      item =>
        item.upload_status === 'uploading' &&
        !uploadStatusCheckingIds.includes(item.id),
    );

    uploadingLayers?.forEach(layer => {
      dispatch(checkUploadStatusRequest(layer.id));
    });
  }, [dispatch, layers, uploadStatusCheckingIds]);

  const uploadMethods = [
    {
      id: 1,
      icon: UploadFolder,
      title: 'Upload your own Datasets',
      description:
        'The selected data will be downloaded from OSM. But the downloaded data will be filled.',
      onClick: () => {
        dispatch(toggleModal('upload-dataset'));
      },
    },
    {
      id: 2,
      icon: ImportFromOSM,
      title: 'Import from OSM',
      description:
        'The selected data will be downloaded from OSM. But the downloaded data will be filled.',
      // onClick: () => {
      //   dispatch(toggleModal('import-osm'));
      // },
    },
    {
      id: 3,
      icon: WMSLayer,
      title: 'Add WMS Layer',
      description:
        'The selected data will be downloaded from OSM. But the downloaded data will be filled.',
      onClick: () => {
        dispatch(toggleModal('add-wms-layer'));
      },
    },
  ];

  const getContent = () => {
    if (!layers) return '';
    if (isEmpty(layers)) return <NoDataYet />;
    return <LayerList />;
  };

  return (
    <div className="naxatw-mx-10">
      <div className="naxatw-flex naxatw-justify-between naxatw-items-center ">
        <h3 className="naxatw-font-bold naxatw-py-5">Data Catalogue</h3>
        <div className="naxatw-flex naxatw-gap-3">
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder"
            onClick={() =>
              history.push(
                `/organizations/${organizationId}/projects/${projectId}/map`,
              )
            }
          >
            View on map
          </Button>
          <Button
            className="naxatw-btn-primary"
            onClick={() =>
              history.push(
                `/organizations/${organizationId}/projects/${projectId}/manage-data`,
              )
            }
          >
            Manage Data Collection
          </Button>
        </div>
      </div>

      <div className="naxatw-space-y-2">
        <h4 className="naxatw-text-grey-800">
          USAFIRI allows you to upload datasets from multiple sources
        </h4>
        {/* <p className="naxatw-text-body-lg">
          Download Datasets for Field Data Collection
        </p> */}
      </div>

      <div className="xl:naxatw-py-6 naxatw-py-4 naxatw-flex naxatw-gap-3">
        {uploadMethods.map(({ id, icon, title, description, onClick }) => (
          <Tooltip
            content={`${id === 2 ? 'The feature is coming soon' : title}`}
          >
            <div
              key={id}
              className={`${
                id === 2 ? 'naxatw-bg-grey-100 naxatw-cursor-not-allowed' : ''
              } naxatw-w-fit naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-p-5 naxatw-cursor-pointer hover:naxatw-bg-grey-100 `}
              onClick={onClick}
            >
              <div className="naxatw-flex naxatw-gap-5 naxatw-items-center ">
                <figure>
                  <img height={80} width={80} src={icon} alt="uploadx" />
                </figure>
                <div>
                  <h5 className="naxatw-text-grey-800 naxatw-mb-2">{title}</h5>
                  <p className="naxatw-text-body-md">{description}</p>
                </div>
              </div>
            </div>
          </Tooltip>
        ))}
      </div>

      {getContent()}
    </div>
  );
}
