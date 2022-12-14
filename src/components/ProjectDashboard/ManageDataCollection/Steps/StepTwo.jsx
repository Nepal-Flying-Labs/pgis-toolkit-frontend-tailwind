/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable arrow-body-style */
import Searchbar from '@Components/common/Searchbar/index';
import Table, { TableHeader } from '@Components/common/Table/Table';
import SortingContainer from '@Components/common/SortingContainer/index';
import React from 'react';

const data = [
  {
    id: 1,
    checked: true,
    layer_name: 'Road',
    category: 'Transportation',
  },
  {
    id: 2,
    checked: true,
    layer_name: 'Road Accidents',
    category: 'Obstacle',
  },
  {
    id: 3,
    checked: true,
    layer_name: 'Street',
    category: 'Street',
  },
];

const StepTwo = () => {
  return (
    <div>
      <h4>Preparation for data collection</h4>
      <p className="naxatw-text-body-lg naxatw-mt-2">
        Choose the desired datasets from the two options below. You may choose
        data from both of the options below but make sure to choose the same
        data only once.
      </p>
      <div className="naxatw-mt-5 naxatw-flex naxatw-justify-between naxatw-items-center ">
        <p>List of data templates for field data collection</p>
        <div className="naxatw-py-[10px] naxatw-pr-3">
          <Searchbar />
        </div>
      </div>
      <div>
        <Table
          data={data || []}
          className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
          headerWidths={['50px', '200px', '150px', '150px', '50px']}
          // eslint-disable-next-line
          onRowClick={row => {}}
        >
          <TableHeader
            dataField=""
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            rowcolSpan="rowSpan_2"
            dataFormat={row => (
              <span className="naxatw-text-base">
                <input type="checkbox" />
              </span>
            )}
          />
          <TableHeader
            dataField="Layer Name"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
            rowcolSpan="rowSpan_2"
            dataHeader={
              <SortingContainer
                name="Layer Name"
                className="naxatw-text-black"
              />
            }
            dataFormat={row => (
              <span className="naxatw-text-base naxatw-font-bold">
                {row.layer_name}
              </span>
            )}
          />
          <TableHeader
            dataField="Category"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            rowcolSpan="rowSpan_2"
            dataHeader={<SortingContainer name="Category" />}
            dataFormat={row => (
              <span className="naxatw-text-base">{row.category}</span>
            )}
          />
          <TableHeader
            dataField="Data Import"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 naxatw-text-right"
            dataHeader={<SortingContainer name="Data Import" />}
            rowcolSpan="rowSpan_3"
            dataFormat={row => (
              <div className="naxatw-flex naxatw-justify-end naxatw-gap-x-2 naxatw-items-center">
                <a className="naxatw-px-2 naxatw-py-[11px]">
                  <span className="naxatw-text-secondary-400 naxatw-text-body-btn">
                    Import From OSM
                  </span>
                </a>

                <a className="naxatw-px-2 naxatw-py-[11px]">
                  <span className="naxatw-text-secondary-400 naxatw-text-body-btn">
                    Manage attributes
                  </span>
                </a>
                <a className="naxatw-px-2 naxatw-py-[11px]">
                  <span className="material-icons naxatw-text-[24px] naxatw-leading-[24px] naxatw-text-secondary-400">
                    map
                  </span>
                </a>
              </div>
            )}
          />
        </Table>
      </div>
      <p className="naxatw-text-body-md naxatw-text-[#484848] naxatw-py-3">
        Are you confused? Please check our guide document,{' '}
        <a className="naxatw-text-body-md naxatw-text-secondary-400">
          click here to view.
        </a>
      </p>
    </div>
  );
};

export default StepTwo;
