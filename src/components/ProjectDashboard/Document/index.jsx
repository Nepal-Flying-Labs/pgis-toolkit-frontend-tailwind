import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import { isEmpty } from '@Utils/commonUtils';
import Button from '@Components/common/Button/index';
import AdditionalSidebar from '../Common/index';
import DocumentList from './DocumentList/index';

// import NoDataYet from './NoDataYet';
// import LayerList from './LayerList';

const { getProjectLayersRequest, checkUploadStatusRequest } =
  ProjectDashboardCreators;
const { toggleModal } = CommonCreators;

export default function Document() {
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

  const [toggleRightBar, setToggleRightBar] = useState(false);

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

  const getContent = () => (
    // if (!layers) return '';
    // if (isEmpty(layers)) return <NoDataYet />;
    <DocumentList openSidebar={setToggleRightBar} />
  );

  return (
    <div
      className={`${
        toggleRightBar ? 'naxatw-flex naxatw-pl-10' : 'naxatw-px-10'
      } naxatw-absolute naxatw-w-full  `}
    >
      <div
        style={{ width: `${toggleRightBar ? 'calc(100vw - 404px )' : '100%'}` }}
        className={`${toggleRightBar ? 'naxatw-pr-5' : ''}`}
      >
        <div className="naxatw-flex naxatw-justify-between">
          <div className="naxatw-w-2/3">
            <h3 className="naxatw-font-bold naxatw-pt-3 naxatw-pb-1">
              Documents
            </h3>
            <p className="naxatw-text-body-lg">
              You can add any sort of relevant documents to the project. It
              includes relevant report, findings etc. in file format DOCX, PDF,
              Excel or CSV.
            </p>
          </div>
          <div className="naxatw-flex naxatw-py-[26px]">
            <Button
              iconLeft="add"
              className="naxatw-btn-primary naxatw-flex"
              onClick={() => {
                dispatch(toggleModal('upload-document'));
              }}
            >
              Documents
            </Button>
          </div>
        </div>

        {getContent()}
      </div>
      {toggleRightBar && (
        <AdditionalSidebar
          onCloseClick={() => setToggleRightBar(false)}
          flag="document"
        />
      )}
    </div>
  );
}
