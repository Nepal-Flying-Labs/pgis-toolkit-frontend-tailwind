import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import { isEmpty } from '@Utils/commonUtils';
import Button from '@Components/common/Button/index';
import AdditionalSidebar from '../Common/index';
import DocumentList from './DocumentList/index';
import NoDocumentYet from './NoDocumentYet/index';
import PreviewDocument from './DocumentList/PreviewDocument';

const { getDocumentItemRequest, downloadDocumentRequest, setDocumentState } =
  ProjectDashboardCreators;

const {
  toggleModal,
  togglePromptDialog,
  setRightSidebarState,
  setPreviewDocument,
} = CommonCreators;

export default function Document() {
  const { projectId } = useParams();
  const document = useSelector(state => state.projectDashboard.document.list);
  const dispatch = useDispatch();
  // const [initialLoad, setInitialLoad] = useState(true);

  const toggleRightBar = useSelector(state => state.common.rightSidebar.show);
  const togglePreviewDocument = useSelector(
    state => state.common.showPreviewDocument,
  );

  useEffect(() => {
    // setInitialLoad(false);
    dispatch(setDocumentState({ searchText: '' }));
    dispatch(setRightSidebarState({ show: false, flag: '' }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDocumentItemRequest({ project: projectId }));
  }, [dispatch, projectId]);

  const getContent = () => {
    // if (!layers) return '';
    if (isEmpty(document)) return <NoDocumentYet />;
    return <DocumentList />;
  };

  const handleDownload = id => {
    dispatch(
      downloadDocumentRequest({ document: [id].join(), project: projectId }),
    );
  };

  return (
    <div>
      <div
        className={`${
          toggleRightBar ? 'naxatw-flex naxatw-pl-10' : 'naxatw-px-10'
        } naxatw-absolute naxatw-w-full naxatw-overflow-x-hidden `}
      >
        <div
          style={{
            width: `${toggleRightBar ? 'calc(100vw - 404px )' : '100%'}`,
          }}
          className={`${toggleRightBar ? 'naxatw-pr-5' : ''}`}
        >
          <div className="naxatw-flex naxatw-justify-between">
            <div className="naxatw-w-2/3">
              <h3 className="naxatw-font-bold naxatw-pt-3 naxatw-pb-1">
                Documents
              </h3>
              <p className="naxatw-text-body-lg">
                You can add any sort of relevant documents to the project. It
                may include relevant report, findings etc. in various file
                formats such as docs, pdf, csv,etc.
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
                Add Documents
              </Button>
            </div>
          </div>

          {getContent()}
        </div>
        {toggleRightBar && (
          <AdditionalSidebar
            onCloseClick={() =>
              dispatch(setRightSidebarState({ show: false, flag: '' }))
            }
            flag="document"
            onDownload={id => handleDownload(id)}
            onDelete={data => {
              dispatch(setDocumentState({ delete: { ...data, projectId } }));
              dispatch(togglePromptDialog('delete-document'));
            }}
            onEdit={() => {
              dispatch(toggleModal('edit-document'));
            }}
          />
        )}
      </div>
      {togglePreviewDocument && (
        <div className="naxatw-absolute naxatw-top-12 naxatw-z-[100] naxatw-w-full naxatw-flex naxatw-justify-center">
          <div className="naxatw-w-full sm:naxatw-w-[calc(100vw-5rem)]  lg:naxatw-w-[calc(100vw-10rem)] xl:naxatw-w-[calc(100vw-20rem)] naxatw-flex naxatw-justify-center naxatw-z-[200] naxatw-items-start">
            <PreviewDocument />
            <button
              type="button"
              className="naxatw-text-black 
                      hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5
                      naxatw-z-50 naxatw-pt-3"
              onClick={() => dispatch(setPreviewDocument(false))}
            >
              <i className="material-icons">close</i>
              <span className="naxatw-sr-only">Close modal</span>
            </button>
          </div>
          <div className="naxatw-absolute naxatw-top-0 naxatw-left-0 naxatw-w-full naxatw-h-full naxatw-bg-white -naxatw-z-20" />
        </div>
      )}
    </div>
  );
}
