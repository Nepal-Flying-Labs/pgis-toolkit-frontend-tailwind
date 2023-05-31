import React from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import { analysisData } from '@src/constants/analysis';

const { toggleModal } = CommonCreators;
const { copyLayerDataRequest, setAnalysisState } = AnalysisCreators;

export default function Analysis() {
  const { organizationId, projectId } = useParams();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-3">
        {Object.keys(analysisData).map(analysisType => {
          const { title, description, disabled } = analysisData[analysisType];
          return (
            <div
              key={analysisType}
              className={`naxatw-border naxatw-border-grey-200 naxatw-rounded-lg naxatw-px-4 naxatw-py-3 naxatw-cursor-pointer
                ${disabled ? 'naxatw-cursor-not-allowed' : ''}
                `}
              onClick={() => {
                if (disabled) return;
                if (analysisType === 'optimal-route') {
                  dispatch(
                    copyLayerDataRequest({
                      analysisType,
                      organizationId,
                      projectId,
                    }),
                  );
                } else {
                  dispatch(toggleModal('create-analysis'));
                }
                dispatch(
                  setAnalysisState({
                    selectedAnalysisType: analysisType,
                  }),
                );
              }}
            >
              <h5 className="naxatw-text-grey-800 naxatw-font-semibold">
                {title}
              </h5>
              <p className="naxatw-text-body-md naxatw-mt-1">{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
