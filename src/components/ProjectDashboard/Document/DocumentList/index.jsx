/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-named-as-default */
import { Types, Creators } from '@Actions/projectDashboard';
import Searchbar from '@Components/common/Searchbar/index';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@Components/common/Button/index';
import TableSkeleton from '@Components/common/TableSkeleton/index';
import SortingContainer from '@Components/common/SortingContainer/index';
import Table, { TableHeader } from '@Components/common/Table/Table';
import { checkIfLoading } from '@Utils/loaderSelector';
import MaterialIcon from '@Components/common/MaterialIcon/index';

function DocumentList({ openSidebar }) {
  const dispatch = useDispatch();
  const { setSearchText } = Creators;
  const searchText = useSelector(state => state?.projectDashboard?.searchText);
  const [value, handleSearch] = useDebouncedInput({
    ms: 300,
    init: searchText,
    onChange: debouncedEvent => {
      dispatch(setSearchText(debouncedEvent.target.value));
    },
  });

  //   table data
  const users = [
    {
      id: 1,
      name: 'name 1',
      role: 'role',
      phone: '-',
      email: 'example@mail.com',
      status: 'onGoing',
    },
  ];

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.SET_SEARCH_TEXT]),
  );

  return (
    <div className="">
      <div className="naxatw-py-2 naxatw-flex naxatw-justify-between">
        <div className="naxatw-flex naxatw-items-center naxatw-w-60 naxatw-mt-4 ">
          <Searchbar
            placeholder="Search"
            value={value}
            onChange={handleSearch}
          />
        </div>
        <div className="">
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder "
            iconLeft="download"
            // onClick={onFileUpload}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Download All
            </span>
          </Button>
        </div>
      </div>

      <div
        style={{
          height: `calc(100vh - 234px)`,
          transition: 'ease-in-out 300ms',
        }}
        className="naxatw-py-3 naxatw-flex naxatw-overflow-auto scrollbar"
      >
        <div className="naxatw-mt-3 ">
          <div className="naxa-table naxatw-overflow-x-auto  scrollbar naxatw-relative naxatw-h-[600px]">
            {!loading ? (
              <Table
                data={users || []}
                onRowClick={() => openSidebar(true)}
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
              >
                <TableHeader
                  dataField="TITLE"
                  headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
                  rowcolSpan="rowSpan_2"
                  dataHeader={
                    <SortingContainer
                      name="title"
                      className="naxatw-text-black"
                    />
                  }
                  dataFormat={row => (
                    <span className="text-base">{row.title || '-'}</span>
                  )}
                />
                <TableHeader
                  dataField="DESCRIPTION"
                  headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
                  rowcolSpan="rowSpan_2"
                  dataHeader={<SortingContainer name="description" />}
                  dataFormat={row => (
                    <span className="text-base">{row.description}</span>
                  )}
                />
                <TableHeader
                  dataField="FILE TYPES"
                  headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
                  rowcolSpan="rowSpan_2"
                  dataHeader={<SortingContainer name="file_types" />}
                  dataFormat={row => (
                    <span className="naxatw-text-base">
                      {row.fileTypes || '-'}
                    </span>
                  )}
                />
                <TableHeader
                  dataField="UPLOADED ON"
                  headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
                  rowcolSpan="rowSpan_2"
                  dataHeader={<SortingContainer name="uploaded_on" />}
                  dataFormat={row => (
                    <span className="naxatw-text-base">
                      {row.uploadedOn || '-'}
                    </span>
                  )}
                />
                <TableHeader
                  dataField="CREATED ON"
                  headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
                  rowcolSpan="rowSpan_2"
                  dataHeader={<SortingContainer name="created_on" />}
                  dataFormat={row => (
                    <span className="naxatw-text-base">
                      {row.createdOn || '-'}
                    </span>
                  )}
                />
                <TableHeader
                  dataField=""
                  headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 naxatw-text-right"
                  rowcolSpan="rowSpan_3"
                  dataFormat={row => (
                    <div className="naxatw-flex naxatw-gap-3 naxatw-py-2">
                      <MaterialIcon
                        onIconClick={() => console.log('icon clicked', row.id)}
                        wrapperClassName="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
                        className="naxatw-text-[22px]"
                        name="edit"
                      />
                      <MaterialIcon
                        onIconClick={() => console.log('icon clicked')}
                        wrapperClassName="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
                        className="naxatw-text-[22px] naxatw-text-delete_btn"
                        name="delete_outline"
                      />
                      <MaterialIcon
                        onIconClick={() => console.log('icon clicked')}
                        wrapperClassName="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center"
                        className="naxatw-text-[22px]"
                        name="file_download"
                      />
                    </div>
                  )}
                />
              </Table>
            ) : (
              <TableSkeleton itemNumber={5} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

DocumentList.propTypes = {
  openSidebar: PropTypes.func,
};

DocumentList.defaultProps = {
  openSidebar: () => {},
};
export default DocumentList;
