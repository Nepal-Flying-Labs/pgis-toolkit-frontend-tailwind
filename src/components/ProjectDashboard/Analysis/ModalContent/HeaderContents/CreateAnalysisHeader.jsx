import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';

import MaterialIcon from '@Components/common/MaterialIcon/index';

const { toggleModal } = CommonCreators;

export default function CreateAnalysisHeader() {
  const dispatch = useDispatch();
  const selectedAnalysis = useSelector(
    state => state.analysis.selectedAnalysis,
  );

  return (
    <div className="naxatw-flex naxatw-items-start naxatw-gap-x-3">
      <MaterialIcon
        name="arrow_back"
        className="naxatw-text-icon-md"
        wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md naxatw-cursor-pointer"
        onIconClick={() => dispatch(toggleModal('analysis'))}
      />
      <div>
        <h3>{selectedAnalysis?.title}</h3>
        <p className="naxatw-text-body-lg">{selectedAnalysis?.description}</p>
      </div>
    </div>
  );
}
