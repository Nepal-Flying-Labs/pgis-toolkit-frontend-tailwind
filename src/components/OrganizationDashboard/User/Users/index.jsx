/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable arrow-body-style */
import React from 'react';
import Searchbar from '@Components/common/Searchbar/index';
import Table, { TableHeader } from '@Components/common/Table/Table';
import DropdownOptions from '@Components/common/DropdownOptions';
import SortingContainer from '@Components/common/SortingContainer/index';
import Status from '@Components/common/Status';
import AvatarIcon from '@Assets/images/icons/avatar-icon.svg';
import './index.css';

const organizationData = [
  {
    id: 1,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
  {
    id: 11,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
  {
    id: 12,
    name: 'Annete Black',
    role: 'Project Manager',
    phone: '9803024306',
    email: 'sudeep.naxa@gmail.com',
    status: 'Active',
  },
];

const dropdownOptions = [
  {
    id: 1,
    label: (
      <span className="naxatw-flex naxatw-items-center">
        <i className="material-icons naxatw-mr-2">edit</i>
        <p className="naxatw-text-body-lg">Edit</p>
      </span>
    ),
    onClick: () => {},
  },
  {
    id: 2,
    label: (
      <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
        <i className="material-icons naxatw-mr-2">delete_outline</i>
        <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Delete</p>
      </span>
    ),
    onClick: () => {},
  },
];

const Users = () => {
  return (
    <div className="naxatw-mt-3 ">
      <div className="naxatw-flex naxatw-gap-x-3">
        <Searchbar className="naxatw-w-[15rem]" />
      </div>
      <div className="naxatw-mt-3 ">
        <div className="naxa-table naxatw-overflow-x-auto  scrollbar naxatw-relative naxatw-h-[600px]">
          {/* {!loading ? ( */}
          <Table
            data={organizationData}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            headerWidths={['396px', '220px', '220px', '280px', '180px', '50px']}
            // eslint-disable-next-line
            // onRowClick={row => {}}
          >
            <TableHeader
              dataField="Name"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer name="Name" className="naxatw-text-black" />
              }
              dataFormat={row => (
                <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2">
                  <img
                    src={AvatarIcon}
                    alt="img"
                    className="naxatw-w-7 naxatw-h-7 naxatw-rounded-full "
                  />
                  <span className="naxatw-text-base naxatw-font-bold">
                    {row.name}
                  </span>
                </div>
              )}
            />
            <TableHeader
              dataField="Role"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Role" />}
              dataFormat={row => <span className="text-base">{row.role}</span>}
            />
            <TableHeader
              dataField="Phone"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Phone" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.phone}</span>
              )}
            />
            <TableHeader
              dataField="Email"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Email" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.email}</span>
              )}
            />
            <TableHeader
              dataField="Status"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Status" />}
              dataFormat={row => <Status status={row.status} />}
            />
            <TableHeader
              dataField=""
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 naxatw-text-right"
              rowcolSpan="rowSpan_3"
              dataFormat={row => (
                <DropdownOptions options={dropdownOptions} data={row} />
              )}
            />
          </Table>
          {/* ) : (
            <TableSkeleton itemNumber={5} />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Users;
