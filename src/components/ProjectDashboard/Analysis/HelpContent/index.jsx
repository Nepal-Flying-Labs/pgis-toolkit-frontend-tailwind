/* eslint-disable react/no-danger */
import React from 'react';
import InfoLogo from '@Assets/images/info.png';
import SelfIntersection from '@Assets/images/self-intersection.png';
import Multipart from '@Assets/images/multipart-geometry.png';
import Overlapping from '@Assets/images/overlapping-geometry.png';
import Overshoot from '@Assets/images/overshoot-geometry.png';

const infoData = [
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
  return (
    <div
      className="naxatw-w-[22.8125rem] naxatw-bg-secondary-50 naxatw-ml-auto naxatw-p-5
        naxatw-overflow-y-auto scrollbar"
    >
      <div>
        <div className="naxatw-flex naxatw-items-center naxatw-space-x-3">
          <img
            className="naxatw-w-12 naxatw-h-12"
            src={InfoLogo}
            alt="info-logo"
          />
          <h4>Info</h4>
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
