/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/organizations';
import usePagination from '@Hooks/usePagination';
import Header from '@Components/common/Header';
import Button from '@Components/common/Button';
import Table, { TableHeader } from '@Components/common/Table/Table';
import SortingContainer from '@Components/common/SortingContainer';
import Pagination from '@Components/common/Pagination';
import { getSelectedItemRange } from '@Components/common/Pagination/getSelectedItem';
import { userRowsOption } from '@src/constants/paginationRowOptions';
import Modal from '@Components/common/Modal';
import CreateAnOrganization from '@Components/ModalContent/CreateAnOrganization';
import CreateOrganizationSuccess from '@Components/ModalContent/CreateOrganizationSuccess';
import DropdownOptions from '@Components/common/DropdownOptions/index';

const { getOrganizationsRequest, toggleModal } = Creators;

const dataPerPage = 10;

export default function Organizations() {
  const organizationData = useSelector(
    state => state.organizations.organizationData,
  );
  const showModal = useSelector(state => state.organizations.showModal);
  const createOrganizationDetail = useSelector(
    state => state.organizations.createOrganizationDetail,
  );
  const {
    next,
    prev,
    jump,
    // handleSorting,
    // currentList,
    currentPage,
    begin,
    end,
  } = usePagination(organizationData?.results, 10);
  const [rowPerPage, setRowPerPage] = useState(userRowsOption);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganizationsRequest());
  }, [dispatch]);

  const dropdownOptions = [
    {
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">edit</i>
          <p className="naxatw-text-body-lg">Edit</p>
        </span>
      ),
      onClick: () => {},
    },
    {
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Delete</p>
        </span>
      ),
      onClick: () => {},
    },
  ];

  return (
    <div>
      <Header />

      <Modal
        show={showModal}
        title={createOrganizationDetail ? '' : 'Create an Organization'}
        onClose={() => {
          dispatch(toggleModal(false));
        }}
      >
        {createOrganizationDetail ? (
          <CreateOrganizationSuccess />
        ) : (
          <CreateAnOrganization />
        )}
      </Modal>

      <div className="naxatw-mt-24 naxatw-px-10">
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <h3 className="naxatw-font-bold naxatw-tracking-wider">
            Organizations
          </h3>
          <Button
            className="naxatw-btn-primary"
            iconLeft="add_circle_outline"
            onClick={() => dispatch(toggleModal(true))}
          >
            Create New
          </Button>
        </div>

        <div className="naxatw-flex naxatw-items-center naxatw-w-60 naxatw-mt-4 naxatw-h-12">
          <label htmlFor="simple-search" className="naxatw-sr-only">
            Search
          </label>
          <div className="naxatw-relative naxatw-w-full">
            <div className="naxatw-absolute naxatw-inset-y-0 naxatw-left-0 naxatw-flex naxatw-items-center naxatw-pl-3 naxatw-pointer-events-none">
              <svg
                aria-hidden="true"
                className="naxatw-w-5 naxatw-h-5 naxatw-text-grey-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="naxatw-bg-grey-100 naxatw-border naxatw-border-grey-300 naxatw-text-grey-900 naxatw-rounded-full naxatw-focus:ring-blue-500 naxatw-focus:border-blue-500 naxatw-block naxatw-w-full naxatw-pl-10 naxatw-p-2.5"
              placeholder="Search"
              required
            />
          </div>
        </div>

        <div className="naxatw-overflow-x-auto naxatw-relative naxatw-mt-[1.875rem]">
          <Table
            data={organizationData?.results}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            headerWidths={['50px', '200px', '150px', '150px', '50px']}
            // eslint-disable-next-line
            onRowClick={row => {
              // history.push(`/`);
            }}
          >
            <TableHeader
              dataField="SN"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowspan_2"
              dataHeader={<SortingContainer name="S.N" />}
              dataFormat={(row, _, index) => (
                <span className="naxatw-text-base">
                  {(currentPage - 1) * dataPerPage + (index + 1)}
                </span>
              )}
            />
            <TableHeader
              dataField="Name"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowspan_2"
              dataHeader={<SortingContainer name="Name" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.name}</span>
              )}
            />
            <TableHeader
              dataField="Email"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowspan_2"
              // dataHeader={<SortingContainer name="S.N" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.email}</span>
              )}
            />
            <TableHeader
              dataField="Projects"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowspan_2"
              dataHeader={<SortingContainer name="Projects" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.projects}</span>
              )}
            />
            <TableHeader
              dataField=""
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 naxatw-text-right"
              rowcolSpan="rowspan_3"
              dataFormat={row => (
                <DropdownOptions options={dropdownOptions} data={row} />
              )}
            />
          </Table>

          <Pagination
            nextPage={next}
            previousPage={prev}
            currentPage={currentPage}
            rowPerPage={rowPerPage}
            jumpTo={jump}
            setRowPerPage={setRowPerPage}
            paginatedCounts={getSelectedItemRange(
              begin,
              end,
              organizationData?.results || 10,
            )}
            paginatedCountsTotal={organizationData?.results?.length || 0}
          />
        </div>
      </div>
    </div>
  );
}
