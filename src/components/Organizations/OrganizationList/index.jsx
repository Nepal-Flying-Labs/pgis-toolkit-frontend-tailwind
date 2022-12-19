/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
// import usePagination from '@Hooks/usePagination';
import {
  getSelectedRange,
  getMaxPage,
} from '@Components/common/Pagination/getSelectedItem';
// import { userRowsOption } from '@src/constants/paginationRowOptions';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import { Creators, Types } from '@Actions/organizations';
import Table, { TableHeader } from '@Components/common/Table/Table';
import { checkIfLoading } from '@Utils/loaderSelector';
import SortingContainer from '@Components/common/SortingContainer';
import Searchbar from '@Components/common/Searchbar/index';
import Pagination from '@Components/common/Pagination';
import DropdownOptions from '@Components/common/DropdownOptions';
import TableSkeleton from '../TableSkeleton/index';

const {
  setSearchText,
  handleNextClick,
  handlePreviousClick,
  handleJumpsTo,
  handleRowSelect,
} = Creators;
const dataPerPage = 10;

export default function OrganizationList() {
  const dispatch = useDispatch();
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ORGANIZATIONS_REQUEST]),
  );
  const searchText = useSelector(state => state.organizations.searchText);
  const organizationData = useSelector(
    state => state.organizations.organizationData,
  );
  // const {
  //   next,
  //   prev,
  //   jump,
  //   // handleSorting,
  //   // currentList,
  //   currentPage,
  //   begin,
  //   end,
  // } = usePagination(organizationData?.results, 10);
  const currentPage = useSelector(state => state.organizations.pagination.page);
  const rowPerPage = useSelector(
    state => state.organizations.pagination.rowSelect,
  );
  const totalCount = useSelector(state => state.organizations.pagination.count);
  const nextPage = useSelector(state => state.organizations.pagination.next);
  const previousPage = useSelector(
    state => state.organizations.pagination.previous,
  );

  const next = () => {
    if (nextPage !== null) dispatch(handleNextClick());
  };
  const previous = () => {
    if (previousPage !== null) dispatch(handlePreviousClick());
  };

  const jump = data => {
    dispatch(handleJumpsTo(data));
  };

  // const [rowPerPage, setRowPerPage] = useState(userRowsOption);
  const history = useHistory();

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

  const [value, handleSearch] = useDebouncedInput({
    ms: 300,
    init: searchText,
    onChange: debouncedEvent => {
      dispatch(setSearchText(debouncedEvent.target.value));
    },
  });
  return (
    <>
      <div className="naxatw-flex naxatw-items-center naxatw-w-60 naxatw-mt-4 ">
        <Searchbar placeholder="Search" value={value} onChange={handleSearch} />
      </div>

      <div className="naxatw-overflow-x-auto scrollbar naxatw-relative naxatw-mt-[1.875rem]">
        {!loading ? (
          <Table
            data={organizationData?.results || []}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-body-sm"
            headerClassName="naxatw-py-1 naxatw-px-3"
            headerWidths={['30px', '200px', '150px', '150px', '50px']}
            // eslint-disable-next-line
            onRowClick={row => {
              history.push(`/organizations/${row.id}/projects`);
            }}
          >
            <TableHeader
              dataField="SN"
              headerClassName="naxatw-py-1 naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="S.N" />}
              dataFormat={(row, _, index) => (
                <span className="naxatw-text-body-lg">
                  {(currentPage - 1) * dataPerPage + (index + 1)}
                </span>
              )}
            />
            <TableHeader
              dataField="Name"
              headerClassName="naxatw-py-1 naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Name" className="" />}
              dataFormat={row => (
                <span className="naxatw-text-body-lg ">{row.name}</span>
              )}
            />
            <TableHeader
              dataField="Email"
              headerClassName="naxatw-py-1 naxatw-px-3"
              rowcolSpan="rowSpan_2"
              // dataHeader={<SortingContainer name="S.N" />}
              dataFormat={row => (
                <span className="naxatw-text-body-lg">{row.email}</span>
              )}
            />
            <TableHeader
              dataField="Projects"
              headerClassName="naxatw-py-1 naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Projects" />}
              dataFormat={row => (
                <span className="naxatw-text-body-lg">{row.projects}</span>
              )}
            />
            <TableHeader
              dataField=""
              headerClassName="naxatw-py-1 naxatw-px-3 naxatw-text-right"
              rowcolSpan="rowSpan_3"
              dataFormat={row => (
                <div className="naxatw-flex naxatw-justify-end naxatw-w-full">
                  <DropdownOptions
                    options={dropdownOptions}
                    data={row}
                    stopPropagation
                  />
                </div>
              )}
            />
          </Table>
        ) : (
          <TableSkeleton itemNumber={5} />
        )}

        <Pagination
          nextPage={next}
          previousPage={previous}
          jumpTo={jump}
          currentPage={currentPage}
          count={totalCount || 0}
          paginatedCounts={getSelectedRange(
            totalCount,
            rowPerPage,
            currentPage,
          )}
          maxPage={getMaxPage(totalCount, rowPerPage)}
          rowSelect={rowPerPage}
          handleSelect={data => dispatch(handleRowSelect(data))}
        />
      </div>
    </>
  );
}
