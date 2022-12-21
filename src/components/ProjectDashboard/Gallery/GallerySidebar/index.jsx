import MaterialIcon from '@Components/common/MaterialIcon/index';
import React from 'react';
import PropTypes from 'prop-types';

function GallerySidebar({ data, onCloseClick }) {
  return (
    <div
      style={{ transition: 'ease-in-out 300ms' }}
      className="naxatw-min-w-[364px] naxatw-max-w-[364px] naxatw-px-5 naxatw-bg-[#F5F5F5] naxatw-border-[#D7D7D7] naxatw-border-l-[1px] naxatw-border-b-[1px]"
    >
      <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
        <h4 className="">{data?.label}</h4>
        <div
          onClick={onCloseClick}
          className="naxatw-my-3 naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center"
        >
          <MaterialIcon
            className="naxatw-text-2xl naxatw-leading-6 naxatw-p-2"
            name="close"
          />
        </div>
      </div>
      <div className="">
        <img
          src={data?.imgSrc}
          alt="sidebar"
          width="324px"
          height="160px"
          className="naxatw-object-contain naxatw-rounded-lg naxatw-border-[1px] naxatw-border-[#D7D7D7]"
        />
      </div>
      <div className="naxatw-my-5">
        <div className="naxatw-text-body-btn naxatw-mb-2">Caption</div>
        <div className="naxatw-text-body-lg">{data?.caption}</div>
      </div>
      <div className="naxatw-mb-5">
        <div className="naxatw-text-body-btn naxatw-mb-2">File Type</div>
        <div className="naxatw-text-body-lg">{data?.fileType}</div>
      </div>
      <div className="naxatw-mb-5">
        <div className="naxatw-text-body-btn naxatw-mb-2">Tags</div>
        <div className="naxatw-text-body-lg">{data?.tag}</div>
      </div>
      <div className="naxatw-mb-5">
        <div className="naxatw-text-body-btn naxatw-mb-2">Uploaded on</div>
        <div className="naxatw-text-body-lg">{data?.uploadedOn}</div>
      </div>
      <div className="naxatw-py-3 naxatw-flex naxatw-justify-center naxatw-items-center">
        <div className="naxatw-mr-1">
          <a className="naxatw-flex naxatw-items-center naxatw-py-[14px] ">
            <span className="material-icons naxatw-text-[#00A699]">
              download
            </span>
            <span className="naxatw-text-[#00A699]">Download All</span>
          </a>
        </div>
        <div className="naxatw-mr-1 naxatw-my-3 naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center">
          <MaterialIcon
            className="naxatw-text-2xl naxatw-leading-6 naxatw-p-2 naxatw-text-[#FF0F0F]"
            name="delete_outline"
          />
        </div>
        <div className="naxatw-my-3 naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center">
          <MaterialIcon
            className="naxatw-text-2xl naxatw-leading-6 naxatw-p-2"
            name="edit"
          />
        </div>
      </div>
    </div>
  );
}

GallerySidebar.propTypes = {
  data: PropTypes.object,
  onCloseClick: PropTypes.func,
};

GallerySidebar.defaultProps = {
  data: {
    id: '',
    label: 'title',
    imgSrc: '',
    caption: 'caption',
    fileType: 'file',
    tag: 'tags',
    uploadedOn: 'date',
  },
  onCloseClick: () => {},
};
export default GallerySidebar;
