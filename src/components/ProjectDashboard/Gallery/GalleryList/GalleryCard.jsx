import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DropdownOptions from '@Components/common/DropdownOptions/index';
import CustomCheckbox from '@Components/common/CustomCheckbox/index';

function GalleryCard({
  id,
  imgSrc,
  label,
  onCardClick,
  checked,
  status,
  onCheckSelected,
}) {
  const [activeCard, setActiveCard] = useState(false);

  useEffect(() => {
    if (status === id) {
      setActiveCard(!activeCard);
    }
  }, [status]);

  const dropdownOptions = [
    {
      id: 1,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">edit</i>
          <p className="naxatw-text-body-lg">Edit</p>
        </span>
      ),
      //   logic for edit item
      onClick: () => {},
    },
    {
      id: 2,
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-delete_btn">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-delete_btn">Delete</p>
        </span>
      ),
      //   logic for delete item
      onClick: () => {},
    },
  ];

  return (
    <div
      role="button"
      tabIndex="0"
      className="naxatw-min-h-[190px] naxatw-max-h-[190px] naxatw-min-w-[210px] naxatw-max-w-[210px] naxatw-group hover:naxatw-cursor-pointer"
      onClick={() => {
        onCardClick(id);
      }}
    >
      <div className="naxatw-mb-1 naxatw-relative">
        <img
          src={imgSrc}
          alt="gallery"
          width="210px"
          height="140px"
          className={`${
            activeCard ? 'naxatw-border-2 naxatw-border-primary-400' : ''
          } naxatw-object-contain naxatw-rounded-lg naxatw-border-2`}
        />
        {/* <input
          type="checkbox"
          checked={checked}
          onClick={() => onCheckSelected(id)}
          className={`${
            checked ? 'naxatw-visible' : ''
          } naxatw-absolute group-hover:naxatw-visible naxatw-invisible naxatw-z-10 naxatw-h-5 naxatw-w-5 naxatw-top-2 naxatw-left-2`}
        /> */}
        <CustomCheckbox
          onClick={() => onCheckSelected()}
          wrapperClassName={`${
            checked ? 'naxatw-visible' : ''
          } naxatw-absolute naxatw-border-white group-hover:naxatw-visible naxatw-ring-2 naxatw-ring-offset-0 naxatw-ring-white naxatw-invisible naxatw-z-50 naxatw-top-2 naxatw-left-2`}
          iconClassName="naxatw-text-white"
        />
      </div>
      <div className=" naxatw-flex naxatw-justify-between">
        <p
          className={`${
            activeCard ? 'naxatw-text-[#00A699]' : ''
          } group-hover:naxatw-text-[#00A699] naxatw-py-[10px] naxatw-text-body-btn`}
        >
          {label}
        </p>
        <div className="">
          <DropdownOptions
            options={dropdownOptions}
            data={id}
            stopPropagation
          />
        </div>
      </div>
    </div>
  );
}

GalleryCard.propTypes = {
  id: PropTypes.string,
  imgSrc: PropTypes.string,
  label: PropTypes.string,
  onCardClick: PropTypes.func,
  checked: PropTypes.bool,
  status: PropTypes.string,
  onCheckSelected: PropTypes.func,
};

GalleryCard.defaultProps = {
  id: '',
  imgSrc: '',
  label: '-',
  onCardClick: () => {},
  checked: false,
  status: '',
  onCheckSelected: () => {},
};

export default GalleryCard;
