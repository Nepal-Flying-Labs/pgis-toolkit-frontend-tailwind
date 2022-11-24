import React from 'react';
import Button from '@Components/common/Button';
import Searchbar from '@Components/common/Searchbar';
import ProjectCard from './ProjectCard/index';

const projects = [
  {
    id: 1,
    name: 'Draft Project X',
    address: 'Malawi, Country',
    status: 'Ongoing',
  },
  {
    id: 2,
    name: 'Kenya Transportation mapping',
    address: 'Malawi, Country',
    status: 'Ongoing',
  },
  {
    id: 3,
    name: 'Draft Project X',
    address: 'Malawi, Country',
    status: 'Ongoing',
  },
];

export default function MapSidebar() {
  return (
    <div className="naxatw-w-96 naxatw-bg-grey-100 naxatw-pl-10 naxatw-pr-5 naxatw-pt-5">
      <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-gap-2">
        <Searchbar className="naxatw-bg-white" />

        <Button className="naxatw-btn-primary" iconLeft="add_circle_outline">
          Project
        </Button>
      </div>

      <div className="naxatw-flex naxatw-mt-2 naxatw-gap-2">
        <div className="naxatw-px-5 naxatw-py-2.5 naxatw-bg-white naxatw-border naxatw-border-grey-800 naxatw-rounded-full">
          All(47)
        </div>
        <div className="naxatw-px-5 naxatw-py-2.5 naxatw-bg-white naxatw-border naxatw-bonaxatw-bg-grey-300 naxatw-rounded-full">
          Ongoing(32)
        </div>
      </div>

      <div className="naxatw-mt-5 naxatw-flex naxatw-flex-col naxatw-gap-2">
        {projects.map(({ id, name, address, status }) => (
          <ProjectCard
            key={id}
            title={name}
            address={address}
            status={status}
          />
        ))}
      </div>
    </div>
  );
}
