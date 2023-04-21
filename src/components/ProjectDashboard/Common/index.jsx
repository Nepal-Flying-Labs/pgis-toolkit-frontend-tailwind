import MaterialIcon from '@Components/common/MaterialIcon/index';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@Components/common/Button/index';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { checkIfLoading } from '@Utils/loaderSelector';
import { Types } from '@Actions/projectDashboard';

function AdditionalSidebar({ onCloseClick, onDownload, onDelete, onEdit }) {
  const { tabname } = useParams();
  // console.log(tabname);

  const documentData = useSelector(
    state => state.projectDashboard.document.item,
  );
  const flag = useSelector(state => state.common.rightSidebar.flag);
  const galleryData = useSelector(state => state.projectDashboard.gallery.item);

  const loading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_GALLERY_BY_ID_REQUEST,
      Types.GET_DOCUMENT_BY_ID_REQUEST,
    ]),
  );

  const [sidebarData, setSidebarData] = useState([]);

  useEffect(() => {
    if (tabname === 'document') {
      return setSidebarData(documentData);
    }
    if (tabname === 'gallery') {
      return setSidebarData(galleryData);
    }
    return setSidebarData([]);
  }, [tabname, documentData, galleryData]);

  // console.log('sidebar data ', sidebarData);

  return (
    <div
      style={{ height: `calc(100vh - 52px)` }}
      className="naxatw-min-w-[364px] naxatw-max-w-[364px] naxatw-pl-5 naxatw-bg-grey-100 naxatw-border-grey-300 naxatw-border-l-[1px] naxatw-border-b-[1px]  naxatw-transition-all naxatw-ease-in-out naxatw-duration-200 -naxatw-translate-x-1"
    >
      {loading ? (
        <>
          <div className="naxatw-w-[250px] naxatw-mt-3 naxatw-h-4 naxatw-bg-gray-200">
            <span className="naxatw-w-[250px] naxatw-bg-gray-200 naxatw-h-4" />
          </div>
          <div className="naxatw-w-[250px] naxatw-mt-5 naxatw-h-20 naxatw-bg-gray-200">
            <span className="naxatw-w-[250px] naxatw-bg-gray-200 naxatw-h-20" />
          </div>
          <div className="naxatw-w-[250px] naxatw-mt-5 naxatw-h-4 naxatw-bg-gray-200">
            <span className="naxatw-w-[250px] naxatw-bg-gray-200 naxatw-h-4" />
          </div>
          <div className="naxatw-w-[250px] naxatw-mt-3 naxatw-h-4 naxatw-bg-gray-200">
            <span className="naxatw-w-[250px] naxatw-bg-gray-200 naxatw-h-4" />
          </div>
          <div className="naxatw-w-[250px] naxatw-mt-5 naxatw-h-4 naxatw-bg-gray-200">
            <span className="naxatw-w-[250px] naxatw-bg-gray-200 naxatw-h-4" />
          </div>
          <div className="naxatw-w-[250px] naxatw-mt-3 naxatw-h-4 naxatw-bg-gray-200">
            <span className="naxatw-w-[250px] naxatw-bg-gray-200 naxatw-h-4" />
          </div>
          <div className="naxatw-w-[250px] naxatw-mt-5 naxatw-h-4 naxatw-bg-gray-200">
            <span className="naxatw-w-[250px] naxatw-bg-gray-200 naxatw-h-4" />
          </div>
          <div className="naxatw-w-[250px] naxatw-mt-3 naxatw-h-4 naxatw-bg-gray-200">
            <span className="naxatw-w-[250px] naxatw-bg-gray-200 naxatw-h-4" />
          </div>
        </>
      ) : (
        <div className="naxatw-overflow-hidden naxatw-overflow-y-auto naxatw-pr-5 scrollbar naxatw-h-[calc(100vh-52px)]">
          <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
            <h4 className="">
              {flag?.toLowerCase() === 'gallery'
                ? sidebarData?.title
                : sidebarData?.name || '-'}
            </h4>
            <div
              onClick={onCloseClick}
              className="naxatw-my-3 naxatw-cursor-pointer naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center"
            >
              <MaterialIcon
                className="naxatw-text-2xl naxatw-leading-6 naxatw-p-2"
                name="close"
              />
            </div>
          </div>
          {flag?.toLowerCase() === 'gallery' && (
            <div className="naxatw-w-[324px] naxatw-min-w-[324px] naxatw-h-[190px] ">
              <img
                src={sidebarData?.image}
                alt="sidebar"
                className="naxatw-object-cover naxatw-h-full naxatw-w-full naxatw-rounded-lg naxatw-border-[1px] naxatw-border-[#D7D7D7]"
              />
            </div>
          )}
          <div className="naxatw-my-5">
            <div className="naxatw-text-body-btn naxatw-mb-2">
              {flag?.toLowerCase() === 'gallery' ? 'Caption' : 'Description'}
            </div>
            <div className="naxatw-text-body-lg">
              {flag?.toLowerCase() === 'gallery'
                ? sidebarData?.caption || '-'
                : sidebarData?.description || '-'}
            </div>
          </div>
          {/* <div className="naxatw-mb-5">
            <div className="naxatw-text-body-btn naxatw-mb-2">File Type</div>
            <div className="naxatw-text-body-lg">
              {sidebarData?.type || '-'}
            </div>
          </div> */}
          {/* <div className="naxatw-mb-5">
        <div className="naxatw-text-body-btn naxatw-mb-2">Tags</div>
        <div className="naxatw-text-body-lg">{sidebarData?.tag || '-'}</div>
      </div> */}
          <div className="naxatw-mb-5">
            <div className="naxatw-text-body-btn naxatw-mb-2">Uploaded on</div>
            <div className="naxatw-text-body-lg">
              {(sidebarData?.uploaded_date &&
                format(new Date(sidebarData.uploaded_date), 'MMM dd, yyyy')) ||
                '-'}
            </div>
          </div>
          <div className="naxatw-py-3 naxatw-gap-1 naxatw-flex naxatw-justify-center naxatw-items-center">
            <div>
              <Button
                iconLeft="download"
                onClick={() => onDownload(sidebarData?.id)}
                className="naxatw-text-[#00A699] naxatw-btn-noborder naxatw-cursor-pointer"
              >
                <span className="naxatw-text-[#00A699]">Download</span>
              </Button>
            </div>
            <div>
              <MaterialIcon
                onIconClick={() => onDelete(sidebarData)}
                wrapperClassName="naxatw-text-grey-800 naxatw-bg-transparent naxatw-cursor-pointer hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
                className="naxatw-text-[22px] naxatw-text-[#FF0F0F]"
                name="delete_outline"
              />
            </div>
            <div className="">
              <MaterialIcon
                onIconClick={() => onEdit(sidebarData?.id)}
                wrapperClassName="naxatw-text-grey-800 naxatw-bg-transparent naxatw-cursor-pointer hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
                className="naxatw-text-[22px]"
                name="edit"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

AdditionalSidebar.propTypes = {
  onCloseClick: PropTypes.func,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

AdditionalSidebar.defaultProps = {
  onCloseClick: () => {},
  onDownload: () => {},
  onDelete: () => {},
  onEdit: () => {},
};
export default AdditionalSidebar;
