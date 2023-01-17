/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable arrow-body-style */
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Searchbar from '@Components/common/Searchbar/index';
import { Creators, Types } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import DropdownOptions from '@Components/common/DropdownOptions';
import SortingContainer from '@Components/common/SortingContainer/index';
import Status from '@Components/common/Status';
import AvatarIcon from '@Assets/images/icons/avatar-icon.svg';
import { checkIfLoading } from '@Utils/loaderSelector';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import TableSkeleton from '@Components/common/TableSkeleton';
import Table, { TableHeader } from '@Components/common/Table/Table';
// import { useParams } from 'react-router';
import Select from '@Components/common/Select/index';
import Pagination from '@Components/common/Pagination/index';
import usePagination from '@Hooks/usePagination';
import { getSelectedRange } from '@Components/common/Pagination/getSelectedItem';

const {
  setUserState,
  updateUserStatusRequest,
  updateInvitedUserStatusRequest,
  resendInvitationRequest,
} = Creators;
const { togglePromptDialog } = CommonCreators;

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

// const groupBy = [
//   { id: 1, value: 'role', name: 'Role' },
//   { id: 2, value: 'project', name: 'Project' },
// ];

const UserList = () => {
  // const { organizationId, projectId } = useParams();
  const dispatch = useDispatch();
  // const [byGroup, setByGroup] = useState('role');
  const users = useSelector(state => state.projectDashboard.user.list);
  const userRole = useSelector(state => state.projectDashboard.user.userRole);
  const ordering = useSelector(state => state.projectDashboard.user.ordering);
  const selectedData = useSelector(state => state.projectDashboard.user.item);
  const invitationLoading = useSelector(state =>
    checkIfLoading(state, [
      Types.UPDATE_INVITED_USER_STATUS_REQUEST,
      Types.RESEND_INVITATION_REQUEST,
    ]),
  );

  const userOptions = [
    {
      id: 1,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">group</i>
          <p className="naxatw-text-body-lg">Assign</p>
        </span>
      ),
      onClick: data => {
        dispatch(
          setUserState({
            // pageTab: 'assign-users',
            item: { ...data, fromUserTab: true },
          }),
        );
      },
    },
    {
      id: 2,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">edit</i>
          <p className="naxatw-text-body-lg">Deactivate</p>
        </span>
      ),
      onClick: data => {
        dispatch(setUserState({ item: data }));
        dispatch(updateUserStatusRequest(data.id, { active: !data.active }));
      },
    },
    {
      id: 3,
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Remove</p>
        </span>
      ),
      onClick: data => {
        dispatch(setUserState({ item: data }));
        dispatch(togglePromptDialog('delete-project-user'));
      },
    },
  ];

  const invitedUserOptions = [
    {
      id: 1,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">group</i>
          <p className="naxatw-text-body-lg">Expire</p>
        </span>
      ),
      onClick: data => {
        dispatch(setUserState({ item: data }));
        dispatch(
          updateInvitedUserStatusRequest(data.id, { status: 'Expired' }),
        );
      },
    },
    {
      id: 2,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">edit</i>
          <p className="naxatw-text-body-lg">Resend</p>
        </span>
      ),
      onClick: data => {
        dispatch(setUserState({ item: data }));
        dispatch(resendInvitationRequest(data.id, { resend: true }));
      },
    },
    {
      id: 3,
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Remove</p>
        </span>
      ),
      onClick: data => {
        dispatch(setUserState({ item: data }));
        dispatch(togglePromptDialog('delete-project-invited-user'));
      },
    },
  ];

  const searchText = useSelector(
    state => state.projectDashboard.user.searchText,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_USERS_REQUEST]),
  );

  const [value, handleSearch] = useDebouncedInput({
    ms: 300,
    init: searchText,
    onChange: debouncedEvent => {
      dispatch(setUserState({ searchText: debouncedEvent.target.value }));
    },
  });

  const [rowPerPage, setRowPerPage] = useState(10);

  const filteredData = useMemo(
    () =>
      users
        ?.filter(
          item =>
            item?.full_name
              ?.toLowerCase()
              ?.includes(searchText.toLowerCase()) ||
            item?.email?.toLowerCase()?.includes(searchText.toLowerCase()),
        )
        ?.filter(d => (userRole ? d?.group === userRole : d)) || [],
    [searchText, userRole, users],
  );

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
    handleSorting,
  } = usePagination(filteredData || [], rowPerPage);

  // useEffect(() => {
  //   if (!users) {
  //     dispatch(
  //       getUsersRequest({
  //         search: searchText,
  //         // group: userRole,
  //       }),
  //     );
  //   }
  // }, [dispatch, users]);

  // useEffect(() => {
  //   dispatch(
  //     getUsersRequest({
  //       search: searchText,
  //       project: projectId,
  //       organization: organizationId,
  //       group: userRole,
  //     }),
  //   );
  // }, [dispatch, searchText, userRole]);

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
        </div> */}
        <div className="naxatw-w-fit naxatw-h-[48px]">
          <Select
            options={roles}
            dataKey="name"
            placeholder="Role"
            onChange={data => {
              dispatch(setUserState({ userRole: data.name }));
            }}
            selected={roles.filter(role => role.name === userRole)[0]?.name}
          />
        </div>
      </div>
      <div className="xl:naxatw-mt-3 ">
        <div className="naxa-table naxatw-overflow-x-auto scrollbar naxatw-relative naxatw-h-[calc(100vh-19rem)] xl:naxatw-h-[calc(100vh-24rem)]">
          {!loading ? (
            <Table
              data={currentList || []}
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
                  <SortingContainer
                    name="Name"
                    className=""
                    isActive={ordering === 'name'}
                    handleSort={() => {
                      dispatch(
                        setUserState({
                          ordering: ordering === 'name' ? null : 'name',
                        }),
                      );
                      handleSorting('full_name');
                    }}
                  />
                }
                dataFormat={row => (
                  <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2">
                    <img
                      src={row.image_thumbnail || AvatarIcon}
                      alt="img"
                      className="naxatw-w-7 naxatw-h-7 naxatw-rounded-full "
                    />
                    <span
                      className={` ${
                        ordering === 'name'
                          ? 'naxatw-text-body-btn'
                          : 'naxatw-text-body-lg'
                      } `}
                    >
                      {row.full_name}
                    </span>
                  </div>
                )}
              />
              {/* <TableHeader
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
              /> */}
              <TableHeader
                dataField="Role"
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
                rowcolSpan="rowSpan_2"
                dataHeader={
                  <SortingContainer
                    name="Role"
                    className=""
                    isActive={ordering === 'group'}
                    handleSort={() => {
                      dispatch(
                        setUserState({
                          ordering: ordering === 'group' ? null : 'group',
                        }),
                      );
                      handleSorting('group');
                    }}
                  />
                }
                dataFormat={row => (
                  <span
                    className={` ${
                      ordering === 'group'
                        ? 'naxatw-text-body-btn'
                        : 'naxatw-text-body-lg'
                    } `}
                  >
                    {row.group}
                  </span>
                )}
              />
              <TableHeader
                dataField="Phone"
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
                rowcolSpan="rowSpan_2"
                // dataHeader={<SortingContainer name="Phone" />}
                dataFormat={row => (
                  <span className="naxatw-text-body-lg">
                    {row.contact || '-'}
                  </span>
                )}
              />
              <TableHeader
                dataField="Email"
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
                rowcolSpan="rowSpan_2"
                // dataHeader={<SortingContainer name="Email" />}
                dataFormat={row => (
                  <span className="naxatw-text-body-lg">{row.email}</span>
                )}
              />
              <TableHeader
                dataField="Status"
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
                rowcolSpan="rowSpan_2"
                // dataHeader={
                // <SortingContainer
                //   name="Status"
                //   className=""
                //   isActive={ordering === 'status'}
                //   handleSort={() =>
                //     dispatch(
                //       setUserState({
                //         ordering: ordering === 'status' ? null : 'status',
                //       }),
                //     )
                //   }
                // />
                // }
                dataFormat={row => (
                  <Status
                    status={row.active}
                    invitationStatus={row.status || ''}
                    isLoading={invitationLoading && row.id === selectedData?.id}
                  />
                )}
              />
              <TableHeader
                dataField=""
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 naxatw-text-right"
                rowcolSpan="rowSpan_3"
                dataFormat={row => (
                  <DropdownOptions
                    options={
                      row.active !== null
                        ? userOptions.map(option =>
                            option.id === 2
                              ? {
                                  ...option,
                                  label: (
                                    <span className="naxatw-flex naxatw-items-center">
                                      <i className="material-icons naxatw-mr-2">
                                        edit
                                      </i>
                                      <p className="naxatw-text-body-lg">
                                        {row.active ? 'Deactivate' : 'Activate'}
                                      </p>
                                    </span>
                                  ),
                                }
                              : { ...option },
                          )
                        : invitedUserOptions
                    }
                    data={row}
                  />
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
          count={filteredData?.length || 0}
          paginatedCounts={getSelectedRange(
            currentList?.length,
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
