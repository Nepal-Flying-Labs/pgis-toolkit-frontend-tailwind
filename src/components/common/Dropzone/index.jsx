import React from 'react';
import PropTypes from 'prop-types';

export default function Dropzone({
  label,
  onChange,
  accept,
  multiple,
  ...rest
}) {
  return (
    <div className="naxatw-flex naxatw-justify-start naxatw-items-center naxatw-w-full naxatw-h-[144px] naxatw-mb-2">
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-w-full naxatw-h-36">
        <label className=" naxatw-flex naxatw-flex-col naxatw-gap-y-3 naxatw-justify-center naxatw-w-full naxatw-h-full naxatw-items-center naxatw-bg-[#F5F5F5] naxatw-rounded-lg naxatw-border-2 naxatw-border-[#BDBDBD] naxatw-border-dashed naxatw-cursor-pointer">
          <i className="material-icons-outlined naxatw-text-red-400 naxatw-text-[40px] naxatw-font-normal naxatw-select-none">
            cloud_upload
          </i>
          <span className="naxatw-text-body-md naxatw-text-[#757575]">
            {label}
          </span>
          <input
            type="file"
            className="naxatw-hidden"
            onChange={onChange}
            multiple={multiple}
            accept={accept}
            {...rest}
          />
        </label>
      </div>
    </div>
  );
}

Dropzone.defaultProps = {
  label: '',
  accept: '',
  multiple: false,
  onChange: () => {},
};

Dropzone.propTypes = {
  label: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};
