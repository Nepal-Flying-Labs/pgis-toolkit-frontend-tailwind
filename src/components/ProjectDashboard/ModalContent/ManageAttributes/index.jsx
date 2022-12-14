import React from 'react';
import Table, { TableHeader } from '@Components/common/Table/Table';
import SortingContainer from '@Components/common/SortingContainer/index';
import Button from '@Components/common/Button/index';

const data = [
    {
      id: 1,
      attribute:'Name',
      alias: 'Name',
      type: 'Text',
      source:'OSM',
    },
    {
      id: 2,
      attribute:'Length',
      alias: 'Length',
      type: 'Integer',
      source:'USAFIRI',
    },
    {
      id: 3,
      attribute:'Tot_Area',
      alias: 'Total Area',
      type: 'Float',
      source:'Custom',
    },
  ];

const ManageAttributes = () => {
  return (
    <div className=''>
        <div className="naxatw-flex naxatw-justify-end " >
            <Button className="naxatw-text-secondary-400 hover:naxatw-bg-[#F5F5F5] hover:naxatw-underline">
                Attribute
            </Button>
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
            dataHeader=""
            dataFormat={row => (
              <span className="naxatw-text-base">
                <input type="checkbox" />
              </span>
            )}
          />
          <TableHeader
            dataField="Attribute"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
            rowcolSpan="rowSpan_2"
            dataHeader={
              <SortingContainer
                name="Attribute"
                className="naxatw-text-black"
              />
            }
            dataFormat={row => (
              <span className="naxatw-text-base naxatw-font-bold">
                {row.attribute}
              </span>
            )}
          />
          <TableHeader
            dataField="Alias"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            rowcolSpan="rowSpan_2"
            dataHeader={<span>Alias</span>}
            dataFormat={row => (
              <span className="naxatw-text-base">{row.alias}</span>
            )}
          />
             <TableHeader
            dataField="Type"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            rowcolSpan="rowSpan_2"
            dataHeader={<span>Type</span>}
            dataFormat={row => (
              <span className="naxatw-text-base">{row.type}</span>
            )}
          />
            <TableHeader
            dataField="Source"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            rowcolSpan="rowSpan_2"
            dataHeader={<span>Source</span>}
            dataFormat={row => (
              <span className="naxatw-text-base">{row.source}</span>
            )}
          />
          {/* <TableHeader
           dataField=""
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 naxatw-text-right"
            rowcolSpan=""
            dataHeader=""
            dataFormat={row => (
              <div className="">
                <a className="">
                  <span className="material-icons">
                    edit
                  </span>
                </a>
                <a className="">
                    hello
                  <span className="material-icons">
                    delete
                  </span>
                </a>
              </div>
            )}
          /> */}
        </Table>
      </div>
      <div className='naxatw-flex naxatw-justify-center naxatw-mt-5'>
        <Button className="naxatw-btn-primary naxatw-w-[77px]">
            Done
        </Button>
      </div>
    </div>
  )
}

export default ManageAttributes