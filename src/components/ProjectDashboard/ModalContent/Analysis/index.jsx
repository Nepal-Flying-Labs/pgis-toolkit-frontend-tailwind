import React from 'react';
import { useDispatch } from 'react-redux';
import { Creators } from '@Actions/common';

const analysisData = [
  {
    id: 1,
    title: 'Service Area Analysis',
    description: 'Baseline Datasets contains different levels of boundaries.',
    analysisType: 'service-area',
  },
  {
    id: 2,
    title: 'Buffer Analysis',
    description: 'Baseline Datasets contains different levels of boundaries.',
    analysisType: 'buffer-analysis',
  },
  {
    id: 3,
    title: 'Nearest Distance Analysis',
    description: 'Baseline Datasets contains different levels of boundaries.',
    analysisType: 'nearest-distance',
  },
  {
    id: 4,
    title: 'Another Type of Analysis',
    description: 'Baseline Datasets contains different levels of boundaries.',
    analysisType: 'buffer',
  },
];

const { toggleModal } = Creators;

export default function Analysis() {
  const dispatch = useDispatch();

  return (
    <div>
      <p>
        USAFIRI allows you to do different sorts of analysis with your map
        datasets. Below are some of the analysis functions we have in the tool
        at the moment.
      </p>

      <div className="naxatw-mt-10 naxatw-grid naxatw-grid-cols-2 naxatw-gap-3">
        {analysisData.map(({ id, title, description, analysisType }) => (
          <div
            key={id}
            className="naxatw-border naxatw-border-grey-200 naxatw-rounded-lg naxatw-px-4 naxatw-py-3 naxatw-cursor-pointer"
            onClick={() => dispatch(toggleModal(analysisType))}
          >
            <h5 className="naxatw-text-grey-800">{title}</h5>
            <p className="naxatw-text-body-md">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
