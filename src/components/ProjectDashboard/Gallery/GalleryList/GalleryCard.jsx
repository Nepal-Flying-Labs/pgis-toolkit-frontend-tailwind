import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DropdownOptions from '@Components/common/DropdownOptions/index';

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
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Delete</p>
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
      className="naxatw-h-[190px] naxatw-w-[210px] naxatw-group hover:naxatw-cursor-pointer"
      onClick={() => {
        onCardClick(id);
      }}
    >
      <div className="naxatw-mb-1">
        <input
          type="checkbox"
          checked={checked}
          onClick={() => onCheckSelected(id)}
          className={`${
            checked ? 'naxatw-z-10' : 'naxatw-z-0'
          } group-hover:naxatw-absolute naxatw-top-2 naxatw-right-2 group-hover:naxatw-z-10`}
        />
        <img
          src={imgSrc}
          alt="gallery"
          width="210px"
          height="140px"
          className={`${
            activeCard ? 'naxatw-border-2 naxatw-border-[#FF5A5F]' : ''
          } naxatw-object-contain naxatw-rounded-lg naxatw-border-2`}
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
