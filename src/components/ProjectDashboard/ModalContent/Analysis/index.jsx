import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Creators } from '@Actions/common';

const analysisData = [
  {
    id: 1,
    title: 'Service Area Analysis',
    description: 'Baseline Datasets contains different levels of boundaries.',
    analysisType: 'service-area',
    disabled: true,
  },
  {
    id: 2,
    title: 'Buffer Analysis',
    description: 'Baseline Datasets contains different levels of boundaries.',
    analysisType: 'buffer-analysis',
    disabled: true,
  },
  {
    id: 3,
    title: 'Nearest Distance Analysis',
    description: 'Baseline Datasets contains different levels of boundaries.',
    analysisType: 'nearest-distance',
    disabled: true,
  },
  {
    id: 4,
    title: 'Optimal Route Analysis',
    description: 'Baseline Datasets contains different levels of boundaries.',
    analysisType: 'optimal-route',
    disabled: false,
  },
];

const { toggleModal } = Creators;

export default function Analysis() {
  const { organizationId, projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-3">
        {analysisData.map(
          ({ id, title, description, analysisType, disabled }) => (
            <div
              key={id}
              className={`naxatw-border naxatw-border-grey-200 naxatw-rounded-lg naxatw-px-4 naxatw-py-3 naxatw-cursor-pointer
                ${disabled ? 'naxatw-cursor-not-allowed' : ''}
                `}
              onClick={() => {
                if (disabled) return;
                dispatch(toggleModal());
                history.push(
                  `/organizations/${organizationId}/projects/${projectId}/data-cleaning/${analysisType}`,
                );
              }}
            >
              <h5 className="naxatw-text-grey-800">{title}</h5>
              <p className="naxatw-text-body-md">{description}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
