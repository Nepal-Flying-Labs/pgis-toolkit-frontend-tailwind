/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-named-as-default */
import { Types, Creators } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';

import Searchbar from '@Components/common/Searchbar/index';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@Components/common/Button/index';
import TableSkeleton from '@Components/common/TableSkeleton/index';
import SortingContainer from '@Components/common/SortingContainer/index';
import Table, { TableHeader } from '@Components/common/Table/Table';
import { checkIfLoading } from '@Utils/loaderSelector';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import { format } from 'date-fns';
import CustomCheckbox from '@Components/common/CustomCheckbox/index';
import { isEmpty } from '@Utils/commonUtils';
import { useParams } from 'react-router';
import sortByKey from '@Utils/sortFn';
// import { baseURL } from '@Services';
// import { saveAs } from 'file-saver';

const {
  setDocumentState,
  downloadDocumentRequest,
  getDocumentItemRequest,
  getDocumentByIdRequest,
  setPreviewDocument,
} = Creators;
const { toggleModal, togglePromptDialog, setRightSidebarState } =
  CommonCreators;

function DocumentList() {
  const { projectId } = useParams();

  const dispatch = useDispatch();

  const searchText = useSelector(
    state => state.projectDashboard.document.searchText,
  );
  const documents = useSelector(state => state.projectDashboard.document.list);
  const ordering = useSelector(
    state => state.projectDashboard.document.ordering,
  );
  const [value, handleSearch] = useDebouncedInput({
    ms: 300,
    init: searchText,
    onChange: debouncedEvent => {
      dispatch(setDocumentState({ searchText: debouncedEvent.target.value }));
    },
  });

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_DOCUMENT_ITEM_REQUEST]),
  );

  const isDownloading = useSelector(state =>
    checkIfLoading(state, [Types.DOWNLOAD_DOCUMENT_REQUEST]),
  );

  const [documentList, setDocumentList] = useState([]);

  useEffect(() => {
    if (!isEmpty(documents)) {
      setDocumentList(documents);
    }
  }, [documents]);

  useEffect(() => {
    // if (searchText) {
    dispatch(
      getDocumentItemRequest({ search_key: searchText, project: projectId }),
    );
    // }
  }, [dispatch, projectId, searchText]);

  const [downloadIdList, setDownloadIdList] = useState([]);

  const handleSelect = id => {
    if (downloadIdList?.includes(id)) {
      return setDownloadIdList(prev => prev.filter(d => d !== id));
    }
    return setDownloadIdList([...downloadIdList, id]);
  };

  const handleDownload = id => {
    dispatch(
      downloadDocumentRequest({ document: [id].join(), project: projectId }),
    );
  };

  const handleDownloadAll = () => {
    dispatch(
      downloadDocumentRequest({
        document: isEmpty(downloadIdList) ? 'all' : downloadIdList?.join(),
        project: projectId,
      }),
    );
  };

  // const handleDownload = id => {
  //   const downloadLink = `${baseURL}/api/projects/document_download/?document=${id}&project=${projectId}`;
  //   saveAs(downloadLink);
  // };

  // &output_format=${selectedOption.value}

  // const handleDownloadAll = () => {
  //   const downloadLink = `${baseURL}/api/projects/document_download/?document=${
  //     isEmpty(downloadIdList) ? 'all' : downloadIdList?.join()
  //   }&project=${projectId}`;
  //   saveAs(downloadLink);
  // };
  const [sortAssending, setSortAssending] = useState(true);

  const handleSorting = title => {
    let newList = [];
    if (sortAssending) {
      newList = sortByKey(documentList, title, 'descending');
      setDocumentList(newList);
    } else {
      newList = sortByKey(documentList, title, 'ascending');
      setDocumentList(newList);
    }
    setSortAssending(prevState => !prevState);
  };

  return (
    <div className="naxatw-relative naxatw-overflow-x-hidden">
      <div className="naxatw-py-1 naxatw-flex naxatw-items-center naxatw-justify-between">
        <div className="naxatw-flex naxatw-items-center naxatw-w-60">
          <Searchbar
            isSmall
            placeholder="Search"
            value={value}
            onChange={handleSearch}
          />
        </div>
        <div className="">
          <Button
            className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder "
            iconLeft="download"
            isLoading={isDownloading}
            onClick={handleDownloadAll}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Download
              {isEmpty(downloadIdList) ? ' All' : ` Selected`}
            </span>
          </Button>
        </div>
      </div>

      <div
        style={{
          height: `calc(100vh - 230px)`,
          transition: 'ease-in-out 300ms',
        }}
        className="naxatw-py-3 naxatw-flex naxatw-overflow-auto scrollbar"
      >
        <div className="xl:naxatw-mt-3 naxatw-w-full">
          <div
            style={{
              height: `calc(100vh - 270px)`,
              transition: 'ease-in-out 300ms',
            }}
            className="naxatw-table naxatw-overflow-x-auto  scrollbar naxatw-relative naxatw-w-full"
          >
            {!loading && documentList.length > 0 ? (
              <Table
                data={documentList || []}
                onRowClick={data => {
                  // console.log(data);
                  dispatch(getDocumentByIdRequest(data.id));
                  dispatch(
                    setRightSidebarState({ show: true, flag: 'document' }),
                  );
                }}
                className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
                headerClassName="naxatw-py-1 naxatw-px-3"
                headerWidths={[
                  '10px',
                  '220px',
                  '250px',
                  '100px',
                  '150px',
                  '150px',
                  '100px',
                ]}
              >
                <TableHeader
                  dataField="CheckBox"
                  headerClassName="naxatw-py-1 naxatw-px-3"
                  // rowcolSpan="rowSpan_0"
                  dataHeader={<SortingContainer name="" className="" />}
                  dataFormat={row => (
                    <span className="text-base">
                      <CustomCheckbox
                        status={downloadIdList?.includes(row.id)}
                        onClick={e => {
                          handleSelect(row.id);
                          e.stopPropagation();
                        }}
                      />
                    </span>
                  )}
                />
                <TableHeader
                  dataField="Name"
                  headerClassName="naxatw-py-1 naxatw-px-3"
                  // rowcolSpan="rowSpan_2"
                  dataHeader={
                    <SortingContainer
                      name="name"
                      isActive={ordering === 'name'}
                      handleSort={() => {
                        dispatch(
                          setDocumentState({
                            ordering: `${ordering === 'name' ? null : 'name'}`,
                          }),
                        );
                        handleSorting('name');
                      }}
                    />
                  }
                  dataFormat={row => (
                    <span
                      className={` ${
                        ordering === 'name'
                          ? 'naxatw-text-body-btn'
                          : 'naxatw-text-body-lg'
                      } naxatw-overflow-ellipsis naxatw-w-[200px]  naxatw-overflow-hidden naxatw-line-clamp-1`}
                      title={row.name}
                    >
                      {row.name || '-'}
                    </span>
                  )}
                />
                <TableHeader
                  dataField="DESCRIPTION"
                  headerClassName="naxatw-py-1 naxatw-px-3 "
                  // rowcolSpan="rowSpan_2"
                  // dataHeader={<SortingContainer name="description" />}
                  dataFormat={row => (
                    <span className="naxatw-text-body-lg naxatw-overflow-ellipsis naxatw-w-[200px] naxatw-line-clamp-1 naxatw-overflow-hidden">
                      {row.description || '-'}
                    </span>
                  )}
                />
                <TableHeader
                  dataField="FILE TYPES"
                  headerClassName="naxatw-py-1 naxatw-px-3"
                  // rowcolSpan="rowSpan_2"
                  // dataHeader={<SortingContainer name="file_types" />}
                  dataFormat={row => (
                    <span className="naxatw-text-body-lg">
                      {row.fileTypes || '-'}
                    </span>
                  )}
                />
                <TableHeader
                  dataField="UPLOADED ON"
                  headerClassName="naxatw-py-1 naxatw-px-3"
                  // rowcolSpan="rowSpan_2"
                  // dataHeader={<SortingContainer name="uploaded_on" />}
                  dataFormat={row => (
                    <span className="naxatw-text-body-lg">
                      {format(new Date(row?.uploaded_date), 'MMM dd, yyyy') ||
                        '-'}
                    </span>
                  )}
                />
                <TableHeader
                  dataField="CREATED ON"
                  headerClassName="naxatw-py-1 naxatw-px-3"
                  // rowcolSpan="rowSpan_2"
                  // dataHeader={<SortingContainer name="created_on" />
                  dataFormat={row => (
                    <span className="naxatw-text-body-lg">
                      {`${row.published_month}  ${row?.published_day} , ${row?.published_year}` ||
                        '-'}
                    </span>
                  )}
                />
                <TableHeader
                  dataField=""
                  headerClassName="naxatw-py-1 naxatw-px-3 naxatw-text-right"
                  // rowcolSpan="rowSpan_3"
                  dataFormat={row => (
                    <div className="naxatw-flex naxatw-gap-1">
                      <MaterialIcon
                        onIconClick={e => {
                          e.stopPropagation();
                          dispatch(dispatch(getDocumentByIdRequest(row.id)));
                          dispatch(setPreviewDocument(true));
                        }}
                        wrapperClassName="naxatw-icon-btn naxatw-icon-btn-sm"
                        className="naxatw-text-icon-sm"
                        name="visibility"
                        title="Preview"
                      />
                      <MaterialIcon
                        onIconClick={e => {
                          e.stopPropagation();
                          handleDownload(row.id);
                        }}
                        wrapperClassName="naxatw-icon-btn naxatw-icon-btn-sm"
                        className="naxatw-text-icon-sm"
                        name="file_download"
                        title="Download"
                      />
                      <MaterialIcon
                        onIconClick={e => {
                          e.stopPropagation();
                          dispatch(dispatch(getDocumentByIdRequest(row.id)));
                          dispatch(toggleModal('edit-document'));
                        }}
                        wrapperClassName="naxatw-icon-btn naxatw-icon-btn-sm"
                        className="naxatw-text-icon-sm"
                        name="edit"
                        title="Edit"
                      />
                      <MaterialIcon
                        onIconClick={e => {
                          e.stopPropagation();
                          dispatch(
                            setDocumentState({ delete: { ...row, projectId } }),
                          );
                          dispatch(togglePromptDialog('delete-document'));
                        }}
                        wrapperClassName="naxatw-icon-btn naxatw-icon-btn-sm"
                        className="naxatw-text-icon-sm naxatw-text-delete_btn"
                        name="delete_outline"
                        title="Delete"
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

DocumentList.propTypes = {};

DocumentList.defaultProps = {};
export default DocumentList;
