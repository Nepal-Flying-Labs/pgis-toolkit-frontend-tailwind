import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Creators as CommonCreators } from '@Actions/common';
import MaterialIcon from '@Components/common/MaterialIcon';
import { analysisData } from '@src/constants/analysis';

const { toggleModal } = CommonCreators;

export default function CreateAnalysisHeader() {
  const { analysisType } = useParams();
  const dispatch = useDispatch();
  const selectedAnalysisType =
    useSelector(state => state.analysis.selectedAnalysisType) || analysisType;

  return (
    <div className="naxatw-flex naxatw-items-start naxatw-gap-x-3">
      {selectedAnalysisType !== 'optimal-route' && (
        <MaterialIcon
          name="arrow_back"
          className="naxatw-text-icon-md"
          wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md naxatw-cursor-pointer"
          onIconClick={() => dispatch(toggleModal('analysis'))}
        />
      )}
      <div>
        <h3>{analysisData[selectedAnalysisType]?.title}</h3>
        <p className="naxatw-text-body-lg">
          {analysisData[selectedAnalysisType]?.description}
        </p>
      </div>
    </div>
  );
}
