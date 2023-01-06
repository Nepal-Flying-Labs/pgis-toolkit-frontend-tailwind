/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import DropdownOptions from '@Components/common/DropdownOptions/index';
import CustomCheckbox from '@Components/common/CustomCheckbox/index';
import { useDispatch } from 'react-redux';
import Creators from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import { useParams } from 'react-router';

const { togglePromptDialog, toggleModal } = CommonCreators;
const { setGalleryState, getGalleryByIdRequest } = Creators;

function GalleryCard({
  id,
  imgSrc,
  label,
  onCardClick,
  checked,
  status,
  onCheckSelected,
}) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const dropdownOptions = [
    {
      id: 1,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">edit</i>
          <p className="naxatw-text-body-lg">Edit</p>
        </span>
      ),
      //   logic for edit item toggleModal
      onClick: () => {
        dispatch(dispatch(getGalleryByIdRequest(id)));
        dispatch(toggleModal('edit-image'));
      },
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
      onClick: () => {
        dispatch(
          setGalleryState({
            delete: { id, name: label, image: imgSrc, projectId },
          }),
        );
        dispatch(togglePromptDialog('delete-gallery'));
      },
    },
  ];

  return (
    <div
      role="button"
      tabIndex="0"
      className="naxatw-min-h-[260px] naxatw-max-h-[260px] naxatw-min-w-[215px] naxatw-max-w-[215px] naxatw-group hover:naxatw-cursor-pointer"
      onClick={() => {
        onCardClick(id);
      }}
    >
      <div className="naxatw-mb-1 naxatw-relative">
        <div className="naxatw-w-[210px] naxatw-h-[210px]">
          <img
            src={imgSrc}
            alt="gallery"
            // width="210px"
            // height="210px"
            className={`${
              status === id ? 'naxatw-border-2 naxatw-border-primary-400' : ''
            } naxatw-object-cover naxatw-h-full naxatw-w-full naxatw-rounded-lg naxatw-border-2`}
          />
        </div>
        {/* <input
          type="checkbox"
          checked={checked}
          onClick={() => onCheckSelected(id)}
          className={`${
            checked ? 'naxatw-visible' : ''
          } naxatw-absolute group-hover:naxatw-visible naxatw-invisible naxatw-z-10 naxatw-h-5 naxatw-w-5 naxatw-top-2 naxatw-left-2`}
        /> */}
        <CustomCheckbox
          onClick={e => onCheckSelected(e)}
          wrapperClassName={`${
            checked ? 'naxatw-visible' : 'naxatw-invisible'
          } naxatw-absolute naxatw-border-white group-hover:naxatw-visible naxatw-ring-2 naxatw-ring-offset-0 naxatw-ring-white naxatw-z-50 naxatw-top-2 naxatw-left-2`}
          iconClassName="naxatw-text-white"
          status={checked}
        />
      </div>
      <div className=" naxatw-flex naxatw-justify-between">
        <p
          className={`${
            status === id ? 'naxatw-text-[#00A699]' : ''
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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imgSrc: PropTypes.string,
  label: PropTypes.string,
  onCardClick: PropTypes.func,
  checked: PropTypes.bool,
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
