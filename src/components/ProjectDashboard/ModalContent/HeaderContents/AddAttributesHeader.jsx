import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';

import MaterialIcon from '@Components/common/MaterialIcon/index';

const { toggleModal } = CommonCreators;

export default function AddAttributesHeader() {
  const dispatch = useDispatch();
  const selectedLayer = useSelector(
    state => state.projectDashboard.data.manageData.selectedData,
  );
  return (
    <div className="naxatw-flex naxatw-items-center naxatw-gap-x-3">
      <MaterialIcon
        name="arrow_back"
        className="naxatw-text-icon-md"
        wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md naxatw-cursor-pointer"
        onIconClick={() => dispatch(toggleModal('manage-attributes'))}
      />
      <h4>{`Add ${selectedLayer?.name} attributes`}</h4>
    </div>
  );
}
