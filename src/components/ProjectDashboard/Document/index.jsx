import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import { isEmpty } from '@Utils/commonUtils';
import Button from '@Components/common/Button/index';
import AdditionalSidebar from '../Common/index';
import DocumentList from './DocumentList/index';
import NoDocumentYet from './NoDocumentYet/index';

const { getDocumentItemRequest } = ProjectDashboardCreators;
const { toggleModal } = CommonCreators;

export default function Document() {
  const { projectId } = useParams();
  const document = useSelector(state => state.projectDashboard.document.list);
  const dispatch = useDispatch();

  const [toggleRightBar, setToggleRightBar] = useState(false);

  useEffect(() => {
    dispatch(getDocumentItemRequest({ project: projectId }));
  }, [dispatch, projectId]);

  const getContent = () => {
    // if (!layers) return '';
    if (isEmpty(document)) return <NoDocumentYet />;
    return <DocumentList openSidebar={setToggleRightBar} />;
  };

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
