import React from 'react';
import QuestionMark from '@Assets/images/question-mark.png';
import HelpImg1 from '@Assets/images/help-img-1.png';
import HelpImg2 from '@Assets/images/help-img-2.png';

const helpData = [
  { id: 'Q1', title: 'What are road with cycleway?', image: HelpImg1 },
  { id: 'Q2', title: 'How many primary schools in the area?', image: HelpImg2 },
];

export default function DataQueryHelp() {
  return (
    <div>
      <div className="naxatw-flex naxatw-items-center naxatw-space-x-3">
        <img
          className="naxatw-w-12 naxatw-h-12"
          src={QuestionMark}
          alt="question-mark"
        />
        <h4>Help</h4>
      </div>

      <p className="naxatw-mt-2 naxatw-text-body-md">
        Following are some sample spatial questions and queries that can be
        performed using this feature
      </p>

      <div className="naxatw-space-y-10">
        {helpData.map(({ id, title, image }) => (
          <div className="naxatw-space-y-3.5">
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
