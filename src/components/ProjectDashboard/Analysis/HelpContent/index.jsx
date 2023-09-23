/* eslint-disable react/no-danger */
import React, { useRef } from 'react';
import InfoLogo from '@Assets/images/info.png';
import SelfIntersection from '@Assets/images/self-intersection.png';
import Multipart from '@Assets/images/multipart-geometry.png';
import Overlapping from '@Assets/images/overlapping-geometry.png';
import Overshoot from '@Assets/images/overshoot-geometry.png';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as AnalysisCreators } from '@Actions/analysis';
import '@Assets/css/tailwind.css';

const { toggleModal } = CommonCreators;
const { setCurrentTutorial } = AnalysisCreators;

const stepOneInfoData = [
  {
    title: 'Road layer',
    description: `
      <p>Choose from the Transportation Network theme to select the road network with
      which you would like to perform the analysis.</p><br/>
      <p>Optimal route analysis is more dependent on road network. Therefore, the topology
      check needs to be done inorder to get the best results for optimum route analysis.</p><br/>
      <p>The selected layer will undergo topology check before starting the analysis.</p>
    `,
  },
  {
    title: 'Obstacles',
    description: `<p>Select the layers under the Transportation Obstacles theme to identify
      whether the route has any obstacles or not. You may choose multiple layers at once.</p><br/>
      <p>The optimum route analysis provides the best route avoiding the obstacles. But the
      obstacles should intersect with the above selected road network.</p><br/>
      <p>Therefore, the selected layer will undergo a topology check before starting the analysis.</p>
    `,
  },
];

const stepTwoInfoData = [
  {
    title: 'Null Geometry',
    description: `<p>A feature shouldn’t have an empty geometry. Null geometries occur when a feature 
      (can be point, line or polygon) has a record in the attribute table but not corresponding geometry.
    </p><br/><p>A feature with no geometry is an error.</p>`,
  },
  {
    title: 'Self-Intersection',
    description: `<p>A line feature from one layer must not intersect itself.</p><br/>
      <p>Any line where the feature overlaps itself or any point where the feature intersects itself is an error.</p>`,
    image: SelfIntersection,
  },
  {
    title: 'Multipart Geometry',
    description: `<p>A feature from one layer must not have more than one part.</p><br/>
    <p>Any feature with more than one part is an error.</p>`,
    image: Multipart,
  },
  {
    title: 'Overlapping Geometry',
    description: `<p>A line from one layer must not overlap lines from the same layer.</p><br/>
      <p>Any line that overlaps is an error.</p>`,
    image: Overlapping,
  },
  {
    title: 'Duplicate Geometry',
    description: `<p>A feature with exact duplication of geometry and attribute should not occur.</p><br/>
    <p>Duplicate feature is an error.</p>`,
  },
  {
    title: 'Overshoot & Undershoot Geometry',
    description: `<p>Requires that a line feature must touch lines from the same feature class (or subtype) at both endpoints.<p><br/>
    <p><span class="naxatw-text-secondary-500">Overshoot Geometry</span> error occur when digitised vector lines that should connect to each other don't quite touch.</p><br/>
    <p><span class="naxatw-text-secondary-500">Undershoot geometry</span> error happen if a line ends beyond the line it should connect to.</p><br/>
    <p><span class="naxatw-text-secondary-500">Isolated geometry</span> error occur if a line has open end points.</p><br/>
      <p>This rule is used where lines typically connect to other lines, as with streets. In this case, exceptions can be used where the rule is occasionally violated, as with cul-de-sac or dead-end street segments.</p>`,
    image: Overshoot,
  },
];

export default function HelpContent() {
  const stepIndex = useSelector(state => state.dataCleaning.stepIndex);

  const infoData = stepIndex === 1 ? stepOneInfoData : stepTwoInfoData;
  const dispatch = useDispatch();
  const tutorialRef = useRef(null);

  setTimeout(() => {
    tutorialRef.current.style.display = 'none';
  }, 8000);

  return (
    <div
      className="naxatw-w-[22.8125rem] naxatw-bg-secondary-50 naxatw-ml-auto naxatw-p-5
        naxatw-overflow-y-auto scrollbar"
    >
      <div>
        <div className="naxatw-flex naxatw-justify-between">
          <div className="naxatw-flex naxatw-items-center naxatw-space-x-3">
            <img
              className="naxatw-w-12 naxatw-h-12"
              src={InfoLogo}
              alt="info-logo"
            />
            <h4>Info</h4>
          </div>
          {stepIndex !== 1 && (
            <div className="naxatw-relative">
              <i
                className="material-icons naxatw-font-normal naxatw-cursor-pointer naxatw-text-secondary-500 hover:naxatw-bg-gray-50 naxatw-p-1 naxatw-rounded-md naxatw-text-[40px] naxatw-mr-4 naxatw-z-20"
                title="Watch Tutorial"
                onClick={e => {
                  e.stopPropagation();
                  dispatch(
                    setCurrentTutorial({
                      tutorialId: 'OJO0ww7F0eQ',
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
          )}
        </div>

        <div className="naxatw-mt-2 naxatw-space-y-5">
          {infoData.map(({ title, description, image }) => (
            <div
              key={title}
              className="naxatw-space-y-2 naxatw-border-b naxatw-border-b-grey-400 naxatw-pb-5 
                last:naxatw-border-b-0"
            >
              <div className="naxatw-mt-5 naxatw-flex naxatw-space-x-3">
                <p className="naxatw-btn-text">{title}</p>
              </div>
              <div className="naxatw-flex naxatw-flex-col naxatw-items-center">
                <div
                  className="naxatw-text-body-md naxatw-mb-3"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                {image && <img src={image} alt={`help-img-${title}`} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
