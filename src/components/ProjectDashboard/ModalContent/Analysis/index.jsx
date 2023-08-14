import React, { useRef } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import { analysisData } from '@src/constants/analysis';

const { toggleModal } = CommonCreators;
const { copyLayerDataRequest, setAnalysisState, setCurrentTutorial } =
  AnalysisCreators;

export default function Analysis() {
  const { organizationId, projectId } = useParams();
  const dispatch = useDispatch();

  const tutorialRefs = {
    tutorialRef0: useRef(null),
    tutorialRef1: useRef(null),
    tutorialRef2: useRef(null),
  };

  setTimeout(() => {
    tutorialRefs.tutorialRef0.current.style.display = 'none';
    tutorialRefs.tutorialRef1.current.style.display = 'none';
    tutorialRefs.tutorialRef2.current.style.display = 'none';
  }, 8000);

  return (
    <div>
      <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-3">
        {Object.keys(analysisData).map((analysisType, i) => {
          const { title, description, disabled, tutorialId } =
            analysisData[analysisType];
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
              <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                <h5 className="naxatw-text-grey-800 naxatw-font-semibold">
                  {title}
                </h5>
                <div className="naxatw-relative">
                  <i
                    className="material-icons naxatw-font-normal naxatw-mr-2 naxatw-text-secondary-500 hover:naxatw-bg-[#f0f0f0] naxatw-p-1 naxatw-rounded-md"
                    title="Watch Tutorial"
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(
                        setCurrentTutorial({
                          tutorialId,
                          returnTo: 'analysis',
                        }),
                      );
                      dispatch(toggleModal('iframe-modal'));
                    }}
                  >
                    movie_filter
                  </i>
                  <p
                    ref={tutorialRefs[`tutorialRef${i}`]}
                    className="heartbeat scale-out-center naxatw-absolute naxatw-top-0 -naxatw-left-14 naxatw-z-10 naxatw-text-ellipsis naxatw-whitespace-nowrap naxatw-bg-yellow-500 naxatw-text-[10px] naxatw-px-1 naxatw-rounded-md naxatw-text-[#F5F5F5]"
                  >
                    Watch Tutorial!
                  </p>
                </div>
              </div>
              <p className="naxatw-text-body-md naxatw-mt-1">{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
