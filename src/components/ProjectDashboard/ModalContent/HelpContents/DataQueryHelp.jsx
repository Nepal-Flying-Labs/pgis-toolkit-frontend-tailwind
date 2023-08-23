import React, { useRef } from 'react';
import QuestionMark from '@Assets/images/question-mark.png';
import HelpImg1 from '@Assets/images/help-img-1.png';
import HelpImg2 from '@Assets/images/help-img-2.png';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import { useDispatch } from 'react-redux';
import '@Assets/css/tailwind.css';

const { toggleModal } = CommonCreators;
const { setCurrentTutorial } = AnalysisCreators;

const helpData = [
  { id: 'Q1', title: 'Which roads have bicycle lanes?', image: HelpImg1 },
  {
    id: 'Q2',
    title: 'How many primary schools are in this area?',
    image: HelpImg2,
  },
];

export default function DataQueryHelp() {
  const dispatch = useDispatch();
  const tutorialRef = useRef(null);

  setTimeout(() => {
    tutorialRef.current.style.display = 'none';
  }, 8000);

  return (
    <div>
      <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
        <div className="naxatw-flex naxatw-items-center naxatw-space-x-3">
          <img
            className="naxatw-w-12 naxatw-h-12"
            src={QuestionMark}
            alt="question-mark"
          />
          <h4>Help</h4>
        </div>
        <div className="naxatw-relative">
          <i
            className="material-icons naxatw-font-normal naxatw-cursor-pointer naxatw-text-secondary-500 hover:naxatw-bg-gray-50 naxatw-p-1 naxatw-rounded-md naxatw-text-[40px] naxatw-mr-4 naxatw-z-20"
            title="Watch Tutorial"
            onClick={e => {
              e.stopPropagation();
              dispatch(
                setCurrentTutorial({
                  tutorialId: '-FUqGk-Waek',
                  returnTo: 'data-query',
                }),
              );
              dispatch(toggleModal('iframe-modal'));
            }}
          >
            movie_filter
          </i>
          <p
            ref={tutorialRef}
            className="heartbeat scale-out-center naxatw-absolute -naxatw-top-1 -naxatw-left-[4.4rem] naxatw-z-10 naxatw-text-ellipsis naxatw-whitespace-nowrap naxatw-bg-yellow-500 naxatw-text-[12px] naxatw-px-1 naxatw-rounded-md naxatw-text-[#F5F5F5]"
          >
            Watch Tutorial!
          </p>
        </div>
      </div>

      <p className="naxatw-mt-2 naxatw-text-body-md">
        Following are some sample spatial questions and queries that can be
        performed using this feature
      </p>

      <div className="naxatw-space-y-10">
        {helpData.map(({ id, title, image }) => (
          <div key={id} className="naxatw-space-y-3.5">
            <div className="naxatw-mt-5 naxatw-flex naxatw-space-x-3">
              <p className="naxatw-btn-text naxatw-text-secondary-400">{id}</p>
              <h5>{title}</h5>
            </div>
            <div className="naxatw-flex naxatw-flex-col naxatw-items-center">
              <p className="naxatw-btn-text">Query</p>
              <img src={image} alt={`help-img-${id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
