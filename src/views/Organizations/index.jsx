import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Creators from '@Actions/organizations';
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
    handleSorting,
    currentList,
    currentPage,
    begin,
    end,
  } = usePagination(organizationData?.results, 10);
  const [rowPerPage, setRowPerPage] = useState(userRowsOption);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganizationsRequest());
  }, []);

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

      <div className="naxatw-mt-28 naxatw-px-16 naxatw-py-10">
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <h3 className="naxatw-font-bold naxatw-text-4xl naxatw-tracking-wide">
            Organizations
          </h3>
          <Button
            className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-font-bold"
            onClick={() => dispatch(toggleModal(true))}
          >
            Create New
          </Button>
        </div>

        <div className="naxatw-flex naxatw-items-center naxatw-w-96 naxatw-mt-8">
          <label htmlFor="simple-search" className="naxatw-sr-only">
            Search
          </label>
          <div className="naxatw-relative naxatw-w-full">
            <div className="naxatw-absolute naxatw-inset-y-0 naxatw-left-0 naxatw-flex naxatw-items-center naxatw-pl-3 naxatw-pointer-events-none">
              <svg
                aria-hidden="true"
                className="naxatw-w-5 naxatw-h-5 naxatw-text-grey-500 naxatw-dark:text-grey-400"
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
              className="naxatw-h-16 naxatw-bg-grey-100 naxatw-border naxatw-border-grey-300 naxatw-text-grey-900 naxatw-text-lg naxatw-rounded-full naxatw-focus:ring-blue-500 naxatw-focus:border-blue-500 naxatw-block naxatw-w-full naxatw-pl-10 naxatw-p-2.5  naxatw-dark:bg-grey-700 naxatw-dark:border-grey-600 naxatw-dark:placeholder-grey-400 naxatw-dark:text-white naxatw-dark:focus:ring-blue-500 naxatw-dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
        </div>

        <div className="naxatw-overflow-x-auto naxatw-relative naxatw-mt-8">
          <Table
            data={organizationData?.results}
            className="naxatw-w-full naxatw-text-lg naxatw-text-left naxatw-text-grey-500 naxatw-dark:text-grey-400"
            headerClassName="naxatw-py-4 naxatw-px-6"
            headerWidths={['50px', '200px', '150px', '150px']}
            onRowClick={row => {
              // history.push(`/`);
            }}
          >
            <TableHeader
              dataField="SN"
              headerClassName="naxatw-py-4 naxatw-px-6"
              rowcolSpan="rowspan_2"
              dataHeader={<SortingContainer name="S.N" />}
              dataFormat={(row, _, index) => {
                // return <span>{(currentPage - 1) * dataPerPage + (index + 1)}</span>;
                return (
                  <span>{(currentPage - 1) * dataPerPage + (index + 1)}</span>
                );
              }}
            />
            <TableHeader
              dataField="Name"
              headerClassName="naxatw-py-4 naxatw-px-6"
              rowcolSpan="rowspan_2"
              dataHeader={<SortingContainer name="Name" />}
              dataFormat={row => {
                return <span>{row.name}</span>;
              }}
            />
            <TableHeader
              dataField="Email"
              headerClassName="naxatw-py-4 naxatw-px-6"
              rowcolSpan="rowspan_2"
              // dataHeader={<SortingContainer name="S.N" />}
              dataFormat={row => {
                return <span>{row.email}</span>;
              }}
            />
            <TableHeader
              dataField="Projects"
              headerClassName="naxatw-py-4 naxatw-px-6"
              rowcolSpan="rowspan_2"
              dataHeader={<SortingContainer name="Projects" />}
              dataFormat={row => {
                return <span>{row.projects}</span>;
              }}
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
