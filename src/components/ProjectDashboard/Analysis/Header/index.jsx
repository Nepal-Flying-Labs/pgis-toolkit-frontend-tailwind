import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import IconButton from '@Components/common/IconButton/index';
import { Creators } from '@Actions/analysis';

const { setSelectedInfo } = Creators;

const headerData = {
  'optimal-route': {
    title: 'Optimal route analysis',
    description:
      'This method is used to find the most efficient path between multiple locations based on factors such as distance, time, and road conditions.',
  },
  'buffer-analysis': {
    title: 'Buffer Analysis',
    description:
      'Creates a zone around a selected feature, distance or time-based, known as a buffer.',
  },
  'proximity-analysis': {
    title: 'Proximity Analysis',
    description:
      'Creates a zone around a selected feature, distance or time-based, known as a proximity, to find features that are within a certain distance of another feature.',
  },
};

export default function Header() {
  const dispatch = useDispatch();
  const { organizationId, projectId, tabname, analysisType } = useParams();
  const analysisDetail = useSelector(state => state.analysis.analysisDetail);
  const history = useHistory();

  return (
    <div
      className="naxatw-w-full naxatw-px-10 naxatw-py-5 naxatw-sticky naxatw-z-20
        naxatw-bg-white naxatw-top-0 naxatw-flex naxatw-justify-between
        naxatw-border-b naxatw-border-b-grey-300"
    >
      <div>
        <div className="naxatw-flex">
          <h3>{analysisDetail?.name || headerData[analysisType].title}</h3>
          {tabname === 'analysis' && (
            <div
              onMouseOver={() => dispatch(setSelectedInfo('default'))}
              // onMouseOut={() => dispatch(setSelectedInfo(null))}
              onBlur={() => {}}
              onFocus={() => {}}
            >
              <IconButton
                className="material-symbols-outlined naxatw-text-[1.2rem]"
                name="info"
                title="Info"
                // onClick={() => dispatch(setSelectedInfo('result'))}
              />
            </div>
          )}
        </div>

        <span className="naxatw-text-body-lg naxatw-mt-1">
          {analysisDetail?.name
            ? analysisDetail.description || ''
            : headerData[analysisType].description}
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          history.push(
            `/organizations/${organizationId}/projects/${projectId}/map`,
          );
        }}
        className="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 
          hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5
          naxatw-ml-auto naxatw-inline-flex naxatw-items-center naxatw-"
      >
        <i className="material-icons">close</i>
        <span className="naxatw-sr-only">Close modal</span>
      </button>
    </div>
  );
}
