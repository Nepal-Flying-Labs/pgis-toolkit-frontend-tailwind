import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Creators as ProjectDashboardCreators,
  Types as ProjectDasboardTypes,
} from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import UploadFolder from '@Assets/images/project/upload-folder.png';
import ImportFromOSM from '@Assets/images/project/import-osm.png';
import WMSLayer from '@Assets/images/project/wms-layer.png';
import { isEmpty } from '@Utils/commonUtils';
import Button from '@Components/common/Button/index';
import Tooltip from '@Components/common/Tooltip/index';
import { checkIfLoading } from '@Utils/loaderSelector';
import NoDataYet from './NoDataYet';
import LayerList from './LayerList';

const {
  getProjectLayersRequest,
  checkUploadStatusRequest,
  checkImageUploadStatusRequest,
} = ProjectDashboardCreators;
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
  const uploadingImages = useSelector(
    state => state.projectDashboard.data.uploadingImage,
  );
  const uploadImageStatusId = useSelector(
    state => state.projectDashboard.data.uploadImageStatusId,
  );
  const isCheckStatusLoading = useSelector(state =>
    checkIfLoading(state, [
      ProjectDasboardTypes.CHECK_IMAGE_UPLOAD_STATUS_REQUEST,
    ]),
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

  // check upload status for image
  useEffect(() => {
    if (isEmpty(uploadingImages)) return;
    const uploadingImagesStatus = uploadingImages.filter(
      item =>
        !uploadImageStatusId.includes(item.task_id) && !isCheckStatusLoading,
    );
    uploadingImagesStatus?.forEach(image => {
      dispatch(
        checkImageUploadStatusRequest({
          task_id: image.task_id,
          name: image.name,
        }),
      );
    });
  }, [
    dispatch,
    isCheckStatusLoading,
    layers,
    uploadImageStatusId,
    uploadingImages,
  ]);

  const uploadMethods = [
    {
      id: 1,
      icon: UploadFolder,
      title: 'Upload your own Datasets',
      description:
        'You may upload the existing geospatial datasets associated to your project.',
      onClick: () => {
        dispatch(toggleModal('upload-dataset'));
      },
    },
    {
      id: 2,
      icon: ImportFromOSM,
      title: 'Import from OSM',
      description:
        'The selected data will be downloaded from OSM and will display all the attributes available in the OSM.',
      // onClick: () => {
      //   dispatch(toggleModal('import-osm'));
      // },
    },
    {
      id: 3,
      icon: WMSLayer,
      title: 'Add WMS Layer',
      description:
        'You may add WMS layer simply providing the WMS endpoint URL.',
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
            View on Map
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
        <p className="naxatw-text-grey-800 naxatw-text-body-lg">
          uSAFIRI supports data upload from multiple external sources. You may
          add data collected from field, extract data from OSM and simply add
          WMS layer in the data catalog.
        </p>
        {/* <p className="naxatw-text-body-lg">
          Download Datasets for Field Data Collection
        </p> */}
      </div>

      <div className="naxatw-py-6 naxatw-flex naxatw-gap-3">
        {uploadMethods.map(({ id, icon, title, description, onClick }) =>
          id === 2 ? (
            <div
              key={id}
              className={`${
                id === 2 ? 'naxatw-bg-grey-100 naxatw-cursor-not-allowed' : ''
              } naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-p-5 naxatw-cursor-pointer naxatw-basis-1/3`}
              onClick={onClick}
            >
              <Tooltip content="This feature is coming soon">
                <div className="naxatw-flex naxatw-gap-5 naxatw-items-center ">
                  <figure>
                    <img height={80} width={80} src={icon} alt="uploadx" />
                  </figure>
                  <div>
                    <h5 className="naxatw-text-grey-400 naxatw-mb-2">
                      {title}
                    </h5>
                    <p className="naxatw-text-body-md naxatw-text-grey-400">
                      {description}
                    </p>
                  </div>
                </div>
              </Tooltip>
            </div>
          ) : (
            <div
              key={id}
              className="naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-p-5 naxatw-cursor-pointer hover:naxatw-bg-grey-100 naxatw-basis-1/3 "
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
          ),
        )}
      </div>

      {getContent()}
    </div>
  );
}
