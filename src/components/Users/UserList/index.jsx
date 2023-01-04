/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Searchbar from '@Components/common/Searchbar/index';
import { Creators, Types } from '@Actions/users';
import DropdownOptions from '@Components/common/DropdownOptions';
import SortingContainer from '@Components/common/SortingContainer/index';
import Status from '@Components/common/Status';
import AvatarIcon from '@Assets/images/icons/avatar-icon.svg';
import { checkIfLoading } from '@Utils/loaderSelector';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import TableSkeleton from '@Components/common/TableSkeleton';
import Table, { TableHeader } from '@Components/common/Table/Table';
import Pagination from '@Components/common/Pagination/index';
import usePagination from '@Hooks/usePagination';
import { getSelectedRange } from '@Components/common/Pagination/getSelectedItem';

const { setSearchText } = Creators;

// const roles = [
//   {
//     id: 1,
//     value: '1',
//     name: 'Project Manager',
//   },
//   {
//     id: 2,
//     value: '2',
//     name: 'Organization Admin',
//   },
//   {
//     id: 3,
//     value: '3',
//     name: 'Medical Assistant',
//   },
// ];

// const groupBy = [
//   { id: 1, value: 'role', name: 'Role' },
//   { id: 2, value: 'project', name: 'Project' },
// ];
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

const UserList = () => {
  const dispatch = useDispatch();
  // const [byGroup, setByGroup] = useState('role');
  const users = useSelector(state => state.users.userData);
  const [rowPerPage, setRowPerPage] = useState(10);

  const {
    next,
    prev,
    jump,
    // currentData,
    currentPage,
    maxPage,
    // begin,
    // end,
    currentList,
    // handleSorting,
  } = usePagination(users || [], rowPerPage);

  // const userRole = useSelector(
  //   state => state.organizationDashboard.usersFilter.userRole,
  // );
  const searchText = useSelector(state => state.users.searchText);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_USERS_REQUEST]),
  );

  const [value, handleSearch] = useDebouncedInput({
    ms: 800,
    init: searchText,
    onChange: debouncedEvent => {
      dispatch(setSearchText(debouncedEvent.target.value));
    },
  });

  return (
    <div className="naxatw-mt-3 ">
      <div className="naxatw-flex naxatw-gap-x-5 naxatw-justify-start ">
        <div className="naxatw-w-[15rem]">
          <Searchbar value={value} onChange={handleSearch} />
        </div>
        {/* <div className="naxatw-flex naxatw-gap-2">
          {groupBy.map(item => (
            <Chip
              name={item.name}
              status={byGroup}
              value={item.value}
              onClick={e => setByGroup(item.value)}
            />
          ))}
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
        </div> */}
      </div>
      <div className="naxatw-mt-3 ">
        <div
          style={{ height: `calc(100vh - 25rem)` }}
          className="naxa-table naxatw-overflow-x-auto scrollbar naxatw-relative"
        >
          {!loading ? (
            <Table
              data={
                currentList?.filter(
                  item =>
                    item?.full_name
                      ?.toLowerCase()
                      ?.includes(searchText.toLowerCase()) ||
                    item?.email
                      ?.toLowerCase()
                      ?.includes(searchText.toLowerCase()),
                ) || []
              }
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
                dataField="Organization Name"
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
                rowcolSpan="rowSpan_2"
                dataHeader={<SortingContainer name="Organization Name" />}
                dataFormat={row => (
                  <span className="text-base">{row.organization || '-'}</span>
                )}
              />
              <TableHeader
                dataField="Project"
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
                rowcolSpan="rowSpan_2"
                dataHeader={<SortingContainer name="Project" />}
                dataFormat={row => (
                  <span className="text-base">{row.project || '-'}</span>
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
                dataFormat={row => (
                  <Status
                    status={row.active}
                    invitationStatus={row.status || ''}
                  />
                )}
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
        <Pagination
          nextPage={next}
          previousPage={prev}
          jumpTo={jump}
          currentPage={currentPage}
          count={users?.length || 0}
          paginatedCounts={getSelectedRange(
            users?.length,
            rowPerPage,
            currentPage,
          )}
          maxPage={maxPage}
          rowSelect={rowPerPage}
          handleSelect={data => setRowPerPage(data)}
        />
      </div>
    </div>
  );
};

export default UserList;
