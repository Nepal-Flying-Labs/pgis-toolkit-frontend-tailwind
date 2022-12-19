/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Searchbar from '@Components/common/Searchbar/index';
import { Creators, Types } from '@Actions/organizationDashboard';
import Table, { TableHeader } from '@Components/common/Table/Table';
import DropdownOptions from '@Components/common/DropdownOptions';
import SortingContainer from '@Components/common/SortingContainer/index';
import Status from '@Components/common/Status';
import AvatarIcon from '@Assets/images/icons/avatar-icon.svg';
import { checkIfLoading } from '@Utils/loaderSelector';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import Select from '@Components/common/Select/index';
import TableSkeleton from '@Components/common/TableSkeleton';
import './index.css';
import { useParams } from 'react-router';

const { setUserRole, getUsersRequest, setSearchText } = Creators;

const roles = [
  {
    id: 1,
    value: '1',
    name: 'Project Manager',
  },
  {
    id: 2,
    value: '2',
    name: 'Organization Admin',
  },
  {
    id: 3,
    value: '3',
    name: 'Medical Assistant',
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
  const { organizationId } = useParams();
  const dispatch = useDispatch();
  const userRole = useSelector(
    state => state.organizationDashboard.usersFilter.userRole,
  );
  const searchText = useSelector(
    state => state.organizationDashboard.usersFilter.searchText,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_USERS_REQUEST]),
  );
  const users = useSelector(state => state.organizationDashboard.users);

  const [value, handleSearch] = useDebouncedInput({
    ms: 300,
    init: searchText,
    onChange: debouncedEvent => {
      dispatch(setSearchText(debouncedEvent.target.value));
    },
  });

  useEffect(() => {
    dispatch(
      getUsersRequest({
        organization: organizationId,
        search: searchText,
        group: userRole,
      }),
    );
  }, [dispatch, searchText, organizationId, userRole]);
  return (
    <div className="naxatw-mt-3 ">
      <div className="naxatw-flex naxatw-gap-x-3 naxatw-justify-start ">
        <div className="naxatw-w-[15rem]">
          <Searchbar value={value} onChange={handleSearch} />
        </div>
        <div className="naxatw-w-fit naxatw-h-[48px]">
          <Select
            options={roles}
            dataKey="name"
            placeholder="Role"
            onChange={data => {
              dispatch(setUserRole(data.value));
            }}
            selected={roles.filter(role => role.value === userRole)[0]?.name}
          />
        </div>
      </div>
      <div className="naxatw-mt-3 ">
        <div className="naxa-table naxatw-overflow-x-auto  scrollbar naxatw-relative naxatw-h-[600px]">
          {!loading ? (
            <Table
              data={users || []}
              className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              headerWidths={[
                '396px',
                '220px',
                '220px',
                '280px',
                '180px',
                '50px',
              ]}
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
                      src={row.image_thumbnail || AvatarIcon}
                      alt="img"
                      className="naxatw-w-7 naxatw-h-7 naxatw-rounded-full "
                    />
                    <span className="naxatw-text-base naxatw-font-bold">
                      {row.full_name}
                    </span>
                  </div>
                )}
              />
              <TableHeader
                dataField="Role"
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
                rowcolSpan="rowSpan_2"
                dataHeader={<SortingContainer name="Role" />}
                dataFormat={row => (
                  <span className="text-base">{row.group}</span>
                )}
              />
              <TableHeader
                dataField="Phone"
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
                rowcolSpan="rowSpan_2"
                dataHeader={<SortingContainer name="Phone" />}
                dataFormat={row => (
                  <span className="naxatw-text-base">{row.contact || '-'}</span>
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
                dataFormat={row => <Status status={row.active} />}
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
          ) : (
            <TableSkeleton itemNumber={5} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
