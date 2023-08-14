import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import analysisActions from '@Actions/analysis';

const { toggleModal } = CommonCreators;

export default function Iframe() {
  const dispatch = useDispatch();
  const tutorial = useSelector(state => state?.analysis?.currentTutorial);
  return (
    <div>
      <div className="naxatw-w-full">
        {tutorial?.returnTo && (
          <i
            className="material-symbols-outlined naxatw-cursor-pointer naxatw-absolute hover:naxatw-bg-[#E6E6E6] naxatw-p-1 naxatw-rounded-md naxatw-top-5 naxatw-text-2xl"
            onClick={() => {
              dispatch(toggleModal(tutorial?.returnTo));
              dispatch(analysisActions.clearCurrentTutorialId());
            }}
          >
            arrow_back
          </i>
        )}
        <iframe
          className="naxatw-w-full"
          height="333.75"
          src={`https://www.youtube.com/embed/${tutorial?.tutorialId}?rel=0&showinfo=0&autoplay=0&controls=1&modestbranding=1`}
          title="YouTube video player"
          allow=""
          allowFullScreen
        />
      </div>
    </div>
  );
}
