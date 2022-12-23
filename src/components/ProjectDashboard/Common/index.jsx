import MaterialIcon from '@Components/common/MaterialIcon/index';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@Components/common/Button/index';

function AdditionalSidebar({ data, onCloseClick, flag }) {
  return (
    <div
      style={{ height: `calc(100vh - 52px)`, transition: 'ease-in-out 300ms' }}
      className="naxatw-min-w-[364px] naxatw-max-w-[364px] naxatw-px-5 naxatw-bg-grey-100 naxatw-border-grey-300 naxatw-border-l-[1px] naxatw-border-b-[1px]"
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
      {flag?.toLowerCase() === 'gallery' && (
        <div className="">
          <img
            src={data?.imgSrc}
            alt="sidebar"
            width="324px"
            height="160px"
            className="naxatw-object-contain naxatw-rounded-lg naxatw-border-[1px] naxatw-border-[#D7D7D7]"
          />
        </div>
      )}
      <div className="naxatw-my-5">
        <div className="naxatw-text-body-btn naxatw-mb-2">
          {flag?.toLowerCase() === 'gallery' ? 'Caption' : 'Description'}
        </div>
        <div className="naxatw-text-body-lg">
          {flag?.toLowerCase() === 'gallery'
            ? data?.caption
            : data?.description}
        </div>
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
      <div className="naxatw-py-3 naxatw-gap-1 naxatw-flex naxatw-justify-center naxatw-items-center">
        <div>
          <Button
            iconLeft="download"
            className="naxatw-text-[#00A699] naxatw-btn-noborder"
          >
            <span className="naxatw-text-[#00A699]">Download All</span>
          </Button>
        </div>
        <div>
          <MaterialIcon
            // onIconClick={() => handleDelete(id)}
            wrapperClassName="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
            className="naxatw-text-[22px] naxatw-text-[#FF0F0F]"
            name="delete_outline"
          />
        </div>
        <div className="">
          <MaterialIcon
            // onIconClick={() => handleDelete(id)}
            wrapperClassName="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
            className="naxatw-text-[22px]"
            name="edit"
          />
        </div>
      </div>
    </div>
  );
}

AdditionalSidebar.propTypes = {
  data: PropTypes.object,
  onCloseClick: PropTypes.func,
  flag: PropTypes.string,
};

AdditionalSidebar.defaultProps = {
  data: {
    id: '',
    label: 'title',
    imgSrc: null,
    caption: null,
    fileType: 'file',
    tag: 'tags',
    uploadedOn: 'date',
    description: null,
  },
  onCloseClick: () => {},
  flag: null,
};
export default AdditionalSidebar;
