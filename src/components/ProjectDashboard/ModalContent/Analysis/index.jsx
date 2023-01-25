import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Creators } from '@Actions/analysis';

const { copyLayerDataRequest } = Creators;

const analysisData = [
  // {
  //   title: 'Service area analysis',
  //   description:
  //     'Identifies areas that can be reached by a certain service or facility within a specified travel time or distance. ',
  //   analysisType: 'service-area',
  //   disabled: true,
  // },
  {
    title: 'Buffer analysis',
    description:
      'Creates a zone around a selected feature, distance or time-based, known as a buffer, to find features that are within a certain distance of another feature.',
    analysisType: 'buffer-analysis',
    disabled: false,
  },
  // {
  //   title: 'Nearest distance analysis',
  //   description: 'Baseline Datasets contains different levels of boundaries.',
  //   analysisType: 'nearest-distance',
  //   disabled: true,
  // },
  {
    title: 'Optimal route analysis',
    description:
      'Finds the most efficient path between multiple locations based on factors such as distance, time, and road conditions.',
    analysisType: 'optimal-route',
    disabled: false,
  },
];

export default function Analysis() {
  const { organizationId, projectId } = useParams();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-3">
        {analysisData.map(({ title, description, analysisType, disabled }) => (
          <div
            key={analysisType}
            className={`naxatw-border naxatw-border-grey-200 naxatw-rounded-lg naxatw-px-4 naxatw-py-3 naxatw-cursor-pointer
                ${disabled ? 'naxatw-cursor-not-allowed' : ''}
                `}
            onClick={() => {
              if (disabled) return;
              dispatch(
                copyLayerDataRequest({
                  analysisType,
                  organizationId,
                  projectId,
                }),
              );
            }}
          >
            <h5 className="naxatw-text-grey-800 naxatw-font-semibold">
              {title}
            </h5>
            <p className="naxatw-text-body-md naxatw-mt-1">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
